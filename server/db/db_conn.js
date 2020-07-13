var mariasql = require('mysql');
var config = require('./db_info').local;

module.exports = function(){
    return{
        init : function(){
            return mariasql.createConnection({
                host : config.host,
                port : config.port,
                user : config.user,
                password : config.password,
                database : config.database,
                multipleStatements: config.multipleStatements
            })
        }
    }
};