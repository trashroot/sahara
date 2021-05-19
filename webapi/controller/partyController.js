const partyModel = require('../model/partyModel')
// const { db } = require('../config/database')

function PartyController(){
    
}

PartyController.prototype.getParty = function (req,res,next) {
    partyModel.getPartyWIthCategory({columns:['Party.SNo as id', 'FirstName', 'LastName', 'Address1', 'Address2','Phone','PartyCategory.Name as Category', 'Party.IsActive']}).then((result)=>{        
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
}

PartyController.prototype.getPartyByID = function (req,res,next) {
    partyModel.getRecords({columns:['SNo as id', 'FirstName', 'LastName', 'Address1', 'Address2','Phone','Category', 'IsActive'], where:{'SNo': req.params.id}}).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
}

PartyController.prototype.addParty = function (req, res, next) {
    partyModel.insertRecords(req.body).then(result => res.send(result)).catch(err => res.send(err))
}

PartyController.prototype.updateParty = function (req, res, next) {
    let row = {
        columns: {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Category: req.body.Category,
            Address1: req.body.Address1,
            Address2: req.body.Address2,
            Phone: req.body.Phone,
            IsActive: req.body.IsActive,
        },
        where: {
            SNo: req.body.SNo
        }
    }
    partyModel.updateRecords(row).then(result => res.send(result)).catch(err => res.send(err))
}

PartyController.prototype.deleteParty = function (req, res, next) {
    let row = {}
        row.SNo = req.params.id
    partyModel.deleteRecords(row).then(result => res.send(result)).catch(err => res.send(err))
}

PartyController.prototype.deleteMultipleParty = function (req, res, next) {
    let rows = {}
        rows['SNo IN'] = req.body
    partyModel.deleteRecords(rows).then(result => res.send(result)).catch(err => res.send(err))
}

module.exports = new PartyController()