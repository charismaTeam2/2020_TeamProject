var express = require('express');
var router = express.Router();
var mariaDB = require('../db/db_conn')();
var conn = mariaDB.init();


router.get('/', function(req, res, next){

    conn.connect(function(err){
        if(err){
            res.render('db_test',{ connect : '연결 실패', err:err});
            console.error(err);
            throw err;
        }else{
            res.render('db_test', { connect : '연결 성공', err:'없음'});
        }
    });
    conn.end();
});


module.exports = router;