const stockModel = require('../model/stockModel')
// const { db } = require('../config/database')

function StockController(){
    
}

StockController.prototype.getStock = function (req,res,next) {
    stockModel.getRecords({columns:[
        'SNo as id',
        'Name', 
        'StockCategorySNo', 
        'Weight', 
        'Quantity', 
        'BatchNo', 
        'PurchaseRate', 
        'MrpRate', 
        'SellingRate', 
        'SellingMargin', 
        'Discount', 
        'CGSTSNo', 
        'SGSTSNo', 
        'ManufactureDate', 
        'ExpiryDate', 
        'LowStockQty', 
        'HighStockQty', 
        'IsActive'
    ]}).then((result)=>{        
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
}

StockController.prototype.getStockByID = function (req,res,next) {
    stockModel.getRecords({columns:[
        'SNo as id', 
        'Name', 
        'StockCategorySNo', 
        'Weight', 
        'Quantity', 
        'BatchNo', 
        'PurchaseRate', 
        'MrpRate', 
        'SellingRate', 
        'SellingMargin', 
        'Discount', 
        'CGSTSNo', 
        'SGSTSNo', 
        'ManufactureDate', 
        'ExpiryDate', 
        'LowStockQty', 
        'HighStockQty', 
        'IsActive'
    ], where:{'SNo': req.params.id}}).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
}

StockController.prototype.addStock = function (req, res, next) {
    stockModel.insertRecords(req.body).then(result => res.send(result)).catch(err => res.send(err))
}

StockController.prototype.updateStock = function (req, res, next) {
    let row = {
        columns: {
            Name: req.body.Name,
            StockCategorySNo: req.body.StockCategorySNo,
            Weight: req.body.Weight,
            Quantity: req.body.Quantity,
            BatchNo: req.body.BatchNo,
            PurchaseRate: req.body.PurchaseRate,
            MrpRate: req.body.MrpRate,
            SellingRate: req.body.SellingRate,
            SellingMargin: req.body.SellingMargin,
            Discount: req.body.Discount,
            CGSTSNo: req.body.CGSTSNo,
            ManufactureDate: req.body.ManufactureDate,
            ExpiryDate: req.body.ExpiryDate,
            LowStockQty: req.body.LowStockQty,
            HighStockQty: req.body.HighStockQty,
            IsActive: req.body.status,
        },
        where: {
            SNo: req.body.SNo
        }
    }
    stockModel.updateRecords(row).then(result => res.send(result)).catch(err => res.send(err))
}

StockController.prototype.deleteStock = function (req, res, next) {
    let row = {}
        row.SNo = req.params.id
    stockModel.deleteRecords(row).then(result => res.send(result)).catch(err => res.send(err))
}

StockController.prototype.deleteMultipleStock = function (req, res, next) {
    let rows = {}
        rows['SNo IN'] = req.body
    stockModel.deleteRecords(rows).then(result => res.send(result)).catch(err => res.send(err))
}

module.exports = new StockController()