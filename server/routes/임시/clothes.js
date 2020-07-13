var express = require('express');
var router = express.Router();
var multer = require('multer');
var mariaDB = require('../db/db_conn')();
var fs = require('fs');
var conn = mariaDB.init();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  let session = req.session
  let id = session.user
  let sql = "SELECT * FROM CLOTHES_TABLE WHERE user_id=?"

  conn.query(sql, [id], function(err, rows){
    if(err){
        console.error(err);
    }else{
        //res.send(rows);
        //console.log(rows[0]);
        
        res.render('clothes', { 
            title: '옷장',
            session : session,
            rows : rows
          });
    }
  });

});


module.exports = router;