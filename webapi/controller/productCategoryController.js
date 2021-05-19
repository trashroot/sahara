const productCatModel = require('../model/productCategoryModel')
// const { db } = require('../config/database')

function ProductCategoryController(){
    
}

ProductCategoryController.prototype.getProductCategory = function (req,res,next) {
    productCatModel.getRecords({columns:['SNo as id', 'Code', 'Name', 'IsActive']}).then((result)=>{        
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
}

ProductCategoryController.prototype.getProductCategoryByID = function (req,res,next) {
    productCatModel.getRecords({columns:['SNo as id', 'Code', 'Name', 'IsActive'], where:{'SNo': req.params.id}}).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
}

ProductCategoryController.prototype.addProductCategory = function (req, res, next) {
    productCatModel.insertRecords(req.body).then(result => res.send(result)).catch(err => res.send(err))
}

ProductCategoryController.prototype.updateProductCategory = function (req, res, next) {
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
    productCatModel.updateRecords(row).then(result => res.send(result)).catch(err => res.send(err))
}

ProductCategoryController.prototype.deleteProductCategory = function (req, res, next) {
    let row = {}
        row.SNo = req.params.id
    productCatModel.deleteRecords(row).then(result => res.send(result)).catch(err => res.send(err))
}

ProductCategoryController.prototype.deleteMultipleProductCategory = function (req, res, next) {
    let rows = {}
        rows['SNo IN'] = req.body
    productCatModel.deleteRecords(rows).then(result => res.send(result)).catch(err => res.send(err))
}

module.exports = new ProductCategoryController()