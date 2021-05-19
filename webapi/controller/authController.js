const jwt = require('jsonwebtoken')
const db = require('../config/database')
const Auth = function(){
   
}

Auth.prototype.login = function(req, res, next){
    res.send(JSON.parse(req.body))
}


module.exports = new Auth()