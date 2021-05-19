const partyCatModel = require('../model/partCategoryModel')
// const { db } = require('../config/database')

function PartyCategoryController(){
    
}

PartyCategoryController.prototype.getCategory = function (req,res,next) {
    partyCatModel.getRecords({columns:['SNo as id', 'Code', 'Name', 'IsActive']}).then((result)=>{        
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
}

PartyCategoryController.prototype.getCategoryByID = function (req,res,next) {
    partyCatModel.getRecords({columns:['SNo as id', 'Code', 'Name', 'IsActive'], where:{'SNo': req.params.id}}).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
}

PartyCategoryController.prototype.addPartyCategory = function (req, res, next) {
    partyCatModel.insertRecords(req.body).then(result => res.send(result)).catch(err => res.send(err))
}

PartyCategoryController.prototype.updatePartyCategory = function (req, res, next) {
    let row = {
        columns: {
            Code: req.body.code,
            Name: req.body.name,
            IsActive: req.body.status,
        },
        where: {
            SNo: req.body.SNo
        }
    }
    partyCatModel.updateRecords(row).then(result => res.send(result)).catch(err => res.send(err))
}

PartyCategoryController.prototype.deletePartyCategory = function (req, res, next) {
    let row = {}
        row.SNo = req.params.id
    partyCatModel.deleteRecords(row).then(result => res.send(result)).catch(err => res.send(err))
}

PartyCategoryController.prototype.deleteMultiplePartyCategory = function (req, res, next) {
    let rows = {}
        rows['SNo IN'] = req.body
    partyCatModel.deleteRecords(rows).then(result => res.send(result)).catch(err => res.send(err))
}

module.exports = new PartyCategoryController()