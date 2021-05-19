const masterModel = require("./masterModel");
const { db } = require('../config/database')
const _ = require("lodash")

const table = "Stock"

function StockModel() {   
    this.table = table
}

StockModel.prototype.getRecords = masterModel.getData.bind({table: table})
StockModel.prototype.insertRecords = masterModel.insert.bind({table: table})
StockModel.prototype.updateRecords = masterModel.update.bind({table: table})
StockModel.prototype.deleteRecords = masterModel.delete.bind({table: table})

module.exports = new StockModel()