const configurationModel = require('../model/configurationModel')
// const { db } = require('../config/database')

function ConfigurationController(){
    
}

ConfigurationController.prototype.getConfiguration = function (req,res,next) {
    configurationModel.getRecords({columns:['SNo as id', 'Name', 'Address','GSTNo','PhoneNo','DLNo','ExpAlertDays' ,'IsActive']}).then((result)=>{        
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
}

ConfigurationController.prototype.getConfigurationById = function (req,res,next) {
    configurationModel.getRecords({columns:['SNo as id', 'Name', 'Address','GSTNo','PhoneNo','DLNo','ExpAlertDays' ,'IsActive'], where:{'SNo': req.params.id}}).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
}

ConfigurationController.prototype.addConfiguration= function (req, res, next) {
    configurationModel.insertRecords(req.body).then(result => res.send(result)).catch(err => res.send(err))
}

ConfigurationController.prototype.updateConfiguration = function (req, res, next) {
    let row = {
        columns: {
            Name: req.body.Name,
            Address: req.body.Address,
            GSTNo: req.body.GSTNo,
            PhoneNo: req.body.PhoneNo,
            DLNo: req.body.DLNo,
            ExpAlertDays: req.body.ExpAlertDays,
            // IsActive: req.body.status,
        },
        where: {
            SNo: req.body.SNo
        }
    }
    configurationModel.updateRecords(row).then(result => res.send(result)).catch(err => res.send(err))
}

ConfigurationController.prototype.deleteConfiguration = function (req, res, next) {
    let row = {}
        row.SNo = req.params.id
    configurationModel.deleteRecords(row).then(result => res.send(result)).catch(err => res.send(err))
}

ConfigurationController.prototype.deleteMultipleConfiguration = function (req, res, next) {
    let rows = {}
        rows['SNo IN'] = req.body
    configurationModel.deleteRecords(rows).then(result => res.send(result)).catch(err => res.send(err))
}

module.exports = new ConfigurationController()