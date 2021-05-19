const masterModel = require("./masterModel");
const { db } = require('../config/database')
const _ = require("lodash")

const table = "Party"

function PartyModel() {   
    this.table = table
}




PartyModel.prototype.getRecords = masterModel.getData.bind({table: table})
PartyModel.prototype.insertRecords = masterModel.insert.bind({table: table})
PartyModel.prototype.updateRecords = masterModel.update.bind({table: table})
PartyModel.prototype.deleteRecords = masterModel.delete.bind({table: table})

PartyModel.prototype.getPartyWIthCategory = function (options = {columns: [],where: {}, limit: [], order: "ASC"}) {
    return new Promise((resolve, reject) => {
        if (this.table == 'undefined') {
            throw 'No table selected'
        }
        
        if(_.has(options, "columns") && _.isArray(options.columns) && !_.isEmpty(options.columns)){
            qry = "SELECT " + options.columns.join() + " FROM "+ this.table + " LEFT JOIN PartyCategory ON "+this.table+".category = PartyCategory.SNo WHERE 1=1 "
        }else{
            qry = "SELECT * FROM " + this.table +" LEFT JOIN PartyCategory ON "+this.table+".category = PartyCategory.SNo WHERE 1=1 ";            
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
        db.query(qry, (err, result, fields) => {           
            if (err) {                
                reject(err)
            }
            resolve(result)
        })
    })
}

module.exports = new PartyModel()