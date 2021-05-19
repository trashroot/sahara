const gstRateModel = require('../model/gstRateModel')
// const { db } = require('../config/database')

function GstRateController(){
    
}

GstRateController.prototype.getGstRate = function (req,res,next) {
    gstRateModel.getRecords({columns:['SNo as id', 'Code', 'Rate', 'IsActive']}).then((result)=>{        
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
}

GstRateController.prototype.getGstRateByID = function (req,res,next) {
    gstRateModel.getRecords({columns:['SNo as id', 'Code', 'Rate', 'IsActive'], where:{'SNo': req.params.id}}).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
}

GstRateController.prototype.addGstRate = function (req, res, next) {
    gstRateModel.insertRecords(req.body).then(result => res.send(result)).catch(err => res.send(err))
}

GstRateController.prototype.updateGstRate = function (req, res, next) {
    let row = {
        columns: {
            Code: req.body.Code,
            Rate: req.body.Rate,
            IsActive: req.body.status,
        },
        where: {
            SNo: req.body.SNo
        }
    }
    gstRateModel.updateRecords(row).then(result => res.send(result)).catch(err => res.send(err))
}

GstRateController.prototype.deleteGstRate = function (req, res, next) {
    let row = {}
        row.SNo = req.params.id
    gstRateModel.deleteRecords(row).then(result => res.send(result)).catch(err => res.send(err))
}

GstRateController.prototype.deleteMultipleGstRate = function (req, res, next) {
    let rows = {}
        rows['SNo IN'] = req.body
    gstRateModel.deleteRecords(rows).then(result => res.send(result)).catch(err => res.send(err))
}

module.exports = new GstRateController()