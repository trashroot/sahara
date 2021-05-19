const masterModel = require("./masterModel");
// const { db } = require('../config/database')

const table = "PartyCategory"

function PartyCategoryModel() {   

}




PartyCategoryModel.prototype.getRecords = masterModel.getData.bind({table: table})
PartyCategoryModel.prototype.insertRecords = masterModel.insert.bind({table: table})
PartyCategoryModel.prototype.updateRecords = masterModel.update.bind({table: table})
PartyCategoryModel.prototype.deleteRecords = masterModel.delete.bind({table: table})

module.exports = new PartyCategoryModel()