const masterModel = require("./masterModel");
const { db } = require('../config/database')
const _ = require("lodash")

const table = "Configuration"

function ConfigurationModel() {   
    this.table = table
}




ConfigurationModel.prototype.getRecords = masterModel.getData.bind({table: table})
ConfigurationModel.prototype.insertRecords = masterModel.insert.bind({table: table})
ConfigurationModel.prototype.updateRecords = masterModel.update.bind({table: table})
ConfigurationModel.prototype.deleteRecords = masterModel.delete.bind({table: table})

module.exports = new ConfigurationModel()