const masterModel = require("./masterModel");
const { db } = require('../config/database')
const _ = require("lodash")

const table = "ReturnStock"

function ReturnStockModel() {   
    this.table = table
}


ReturnStockModel.prototype.getRecords = masterModel.getData.bind({table: table})
ReturnStockModel.prototype.insertRecords = masterModel.insert.bind({table: table})
ReturnStockModel.prototype.updateRecords = masterModel.update.bind({table: table})
ReturnStockModel.prototype.deleteRecords = masterModel.delete.bind({table: table})

module.exports = new ReturnStockModel()