const masterModel = require("./masterModel");
const { db } = require('../config/database')
const _ = require("lodash")

const table = "GSTRateMaster"

function GstRateModel() {   
    this.table = table
}




GstRateModel.prototype.getRecords = masterModel.getData.bind({table: table})
GstRateModel.prototype.insertRecords = masterModel.insert.bind({table: table})
GstRateModel.prototype.updateRecords = masterModel.update.bind({table: table})
GstRateModel.prototype.deleteRecords = masterModel.delete.bind({table: table})

module.exports = new GstRateModel()