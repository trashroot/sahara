const masterModel = require("./masterModel");
const { db } = require('../config/database')
const _ = require("lodash")

const table = "StockTopUpDetails"

function StockTopUpModel() {   
    this.table = table
}


StockTopUpModel.prototype.getRecords = masterModel.getData.bind({table: table})
StockTopUpModel.prototype.insertRecords = masterModel.insert.bind({table: table})
StockTopUpModel.prototype.updateRecords = masterModel.update.bind({table: table})
StockTopUpModel.prototype.deleteRecords = masterModel.delete.bind({table: table})

module.exports = new StockTopUpModel()