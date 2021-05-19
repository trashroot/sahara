const masterModel = require("./masterModel");
const { db } = require('../config/database')
const _ = require("lodash")

const table = "ProductCategory"

function ProductCategoryModel() {   
    this.table = table
}




ProductCategoryModel.prototype.getRecords = masterModel.getData.bind({table: table})
ProductCategoryModel.prototype.insertRecords = masterModel.insert.bind({table: table})
ProductCategoryModel.prototype.updateRecords = masterModel.update.bind({table: table})
ProductCategoryModel.prototype.deleteRecords = masterModel.delete.bind({table: table})

module.exports = new ProductCategoryModel()