const _ = require("lodash")
const { db } = require('../config/database')

function Master() {

}

Master.prototype.getData = function (options = {columns: [],where: {}, limit: [], order: "ASC"}) {
    return new Promise((resolve, reject) => {
        if (this.table == 'undefined') {
            throw 'No table selected'
        }
        
        if(_.has(options, "columns") && _.isArray(options.columns) && !_.isEmpty(options.columns)){
            qry = "SELECT " + options.columns.join() + " FROM "+ this.table + " WHERE 1=1 "
        }else{
            qry = "SELECT * FROM " + this.table + " WHERE 1=1 ";            
        }

        if(_.has(options, "where") && _.isObject(options.where) && !_.isEmpty(options.where)){
            if (Object.keys(options.where).length != 0) {
                for (let key in options.where) {
                    qry = qry + " AND " + key + "='" + options.where[key] + "'"
                }
            }
        }

        if(_.has(options, "limit") && _.isArray(options.limit) && !_.isEmpty(options.limit)){
            qry = qry + " LIMIT " + options.limit.join()
        }

        if(_.has(options, "order") && _.isObject(options.order) && !_.isEmpty(options.order)){
            qry = qry + " ORDER BY "
            for (let column in options.order) {
                columnOrder = (options.order[column])? options.order[column] : 'ASC'
                qry = qry + column + " '" + columnOrder  + "',"
            }
            qry = qry.slice(0, -1)
        }
        // resolve(qry)
        db.query(qry, (err, result, fields) => {           
            if (err) {
                console.log(err);
                reject(err)
            }
            resolve(result)
        })
    })
}

Master.prototype.insert = function (data) {
    return new Promise((resolve, reject) => {
        if (!_.isArray(data) || _.isEmpty(data) || _.isEmpty(data[0])) {
            throw "Expected array of object object in arguments."
        }
        const columns = Object.keys(data[0])
        
        qry = "INSERT INTO " + this.table + "("
        // set up columns
        for (const col of columns) {
            qry = qry + "`"+col+"`,"
        }
        qry = qry.slice(0, -1)
        qry = qry + ") VALUES "
        
        // set up rows
        for (const row of data) {
            qry = qry + "("
            for (let key in row) {
                if(_.isString(row[key])){
                    qry = qry+"'" + row[key] + "',"
                }else{
                    qry = qry + row[key] + ","
                }
            }
            qry = qry.slice(0, -1)
            qry = qry + "),"
        }
        qry = qry.slice(0, -1)
        qry = qry + ";"
        
        db.query(qry, (err, result, fields) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
}

Master.prototype.update = function (options = {columns: {}, where: {}}) {
    return new Promise((resolve, reject) => {

        if(!_.has(options, 'columns') || !_.isObject(options.columns) || _.isEmpty(options.columns) || (!_.isUndefined(options.where) && !_.isObject(options.where))){
            throw "Expected object in arguments with colums and where keys. Invalid arguments format"
        }

        qry = "UPDATE " + this.table + " SET "
        for (let key in options.columns) {
            if(_.isString(options.columns[key])){
                qry = qry + key + "='" + options.columns[key] + "'," 
            }else{
                qry = qry + key + "=" + options.columns[key] + ","                
            }
        }
        qry = qry.slice(0, -1)

        if(!_.isEmpty(options.where)){
            qry = qry + " WHERE 1=1 "
            for (let key in options.where) {
                if(_.isString(options.where[key])){
                    qry = qry + " AND " + key + "='" + options.where[key] + "'"
                }else{
                    qry = qry + " AND " + key + "=" + options.where[key]            
                }                
            }
        }
        db.query(qry, (err, result, fields) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
}

Master.prototype.delete = function (where) {
    return new Promise((resolve, reject) => {
        if (this.table == 'undefined') {
            throw 'No table selected'
        }

        if (typeof where != 'object') {
            throw "Expected object in arguments. Invalid arguments format"
        }

        qry = "Delete FROM " + this.table + " WHERE 1=1 ";
        if (_.isObject(where) || !_.isEmpty(where)) {
            for (let key in where) {
                if(_.isString(where[key])){
                    qry = qry + " AND " + key + "='" + where[key] + "'"
                }else if(_.isArray(where[key]) && !_.isEmpty(where[key])){
                    qry = qry + " AND " + key + " (" + where[key].join() +") "
                }else{
                    qry = qry + " AND " + key + "=" + where[key]         
                }                
            }
        }

        db.query(qry, (err, result, fields) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    })
}

// const n = new Master()
// n.delete().then(x => console.log(x)).catch(e => console.log(e))
module.exports = new Master()