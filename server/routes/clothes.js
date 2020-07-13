var express = require('express');
var router = express.Router();
var mariaDB = require('../db/db_conn')();
var fs = require('fs');
var multer = require('multer');
var conn = mariaDB.init();
var path = require('path');
var cors = require('cors');
//var pythonShell = require('python-shell');
const { PythonShell } = require('python-shell');

var upload = multer({
  storage: multer.diskStorage({
      destination: function(req, file, cb){
          //cb(null, '/var/www/web/views/src/component/Main_home/src') // 하드 코딩.
          cb(null, 'C:/project/views/public/clothes/')
      },
      filename: function(req, file, cb){
          cb(null, new Date().valueOf() + (Math.floor(Math.random() * (10000 - 1)) + 1) + path.extname(file.originalname) );
      }
  })
});


/* GET home page. */
router.get('/main', function(req, res, next) {
  let session = req.session
  let id = session.user

  let sql = "SELECT * FROM CLOTHES_TABLE WHERE user_id=? AND c_stat = 1"

  //console.log(id);
  conn.query(sql, [id], function(err, rows){
    if(err){
        console.error(err);
    }else{
        //res.send(rows);
        //console.log(rows[0]);
        res.send({
          session : session,
          rows : rows
        });
    }
  });

});



//test/////////////////////////////////////////////////////////
router.get('/test', function(req, res, next) {
  let id = "test"

  let sql = "SELECT * FROM CLOTHES_TABLE WHERE user_id=?"

  //console.log(id);
  conn.query(sql,[id], function(err, rows){
    if(err){
        console.error(err);
    }else{
        //res.send(rows);
        //console.log(rows[0]);
        res.send({
          rows : rows
        });
    }
  });

});

router.post('/savee', upload.single('file'), function(req, res, next){
  let user = "test"
  let file = req.file.filename
  //console.log(file);
  //console.log(user);

  //let file = req.body.file
  //console.log("adf");
  //console.log(user);


  //json_data = JSON.stringify(query_data); 



  var options = {

    mode: 'text',
    // pythonPath: "C:\\Python34\\python.exe", //window path
    pythonPath: 'C:/Users/junsu/AppData/Local/Programs/Python/Python36/python.exe',
    //pythonPath:"",
    pythonOptions: ['-u'],
    scriptPath: 'C:/project/server/routes/python/',    // 실행할 py 파일 path. 현재 nodejs파일과 같은 경로에 있어 생략
    //scriptPath: '/var/www/web2/server/routes/python/',
    args: [user, file]

};


  PythonShell.run('retrain_run_inferernce.py', options ,function(err, result){
    if(err) console.log('err msg : ', err);


  });

  res.send({
    message : true
  });

});

///////////////////////////////////////////////////////////////////



router.post('/show', function(req, res, next) {
  //let session = req.session
  let number = req.body.number
  let show = req.body.show

  if(show == true){
    console.log("t");
    let sql = "UPDATE CLOTHES_TABLE SET c_button=2 WHERE c_number=?"
    conn.query(sql, [number], function(err, rows){
      if(err){
          console.error(err);
          res.send({
            message : false
          });
      }else{
          //res.send(rows);
          //console.log(rows[0]);
          res.send({
            message : true
          });
      }
    });
  }else if(show == false){
    console.log("a");
    let sql = "UPDATE CLOTHES_TABLE SET c_button=1 WHERE c_number=?"
    conn.query(sql, [number], function(err, rows){
      if(err){
          console.error(err);
          res.send({
            message : false
          });
      }else{
          //res.send(rows);
          //console.log(rows[0]);
          res.send({
            message : true
          });
      }
    });
  }


});


router.post('/a_show',cors(), function(req, res, next) {
  //let session = req.session
  let number = req.body.number
  let show = req.body.show

  if(show == 'true'){
    console.log("t");
    let sql = "UPDATE CLOTHES_TABLE SET c_button=2 WHERE c_number=?"
    conn.query(sql, [number], function(err, rows){
      if(err){
          console.error(err);
          res.send({
            message : false
          });
      }else{
          //res.send(rows);
          //console.log(rows[0]);
          res.send({
            message : true
          });
      }
    });
  }else if(show == 'false'){
    console.log("a");
    let sql = "UPDATE CLOTHES_TABLE SET c_button=1 WHERE c_number=?"
    conn.query(sql, [number], function(err, rows){
      if(err){
          console.error(err);
          res.send({
            message : false
          });
      }else{
          //res.send(rows);
          //console.log(rows[0]);
          res.send({
            message : true
          });
      }
    });
  }


});


/*
router.post('/save', upload.single('file'), (req,res)=>{
  //console.log(req.file);
  
  //console.log(req.body.user);

  res.json({
    url : `/clothes/${req.file.fieldname}`
  });

})
*/

// 파이썬으로 데이터 송신

router.post('/save', upload.single('file'), function(req, res, next){
  let session = req.session
  let user = session.user
  let file = req.file.filename
  //console.log(file);
  //console.log(user);

  //let file = req.body.file
  //console.log("adf");
  //console.log(user);


  //json_data = JSON.stringify(query_data); 



  var options = {

    mode: 'text',
    // pythonPath: "C:\\Python34\\python.exe", //window path
    pythonPath: 'C:/Users/junsu/AppData/Local/Programs/Python/Python36/python.exe',
    //pythonPath:"",
    pythonOptions: ['-u'],
    scriptPath: 'C:/project/server/routes/python/',    // 실행할 py 파일 path. 현재 nodejs파일과 같은 경로에 있어 생략
    //scriptPath: '/var/www/web2/server/routes/python/',
    args: [user, file]

};


  PythonShell.run('retrain_run_inferernce.py', options ,function(err, result){
    if(err) console.log('err msg : ', err);


  });

  res.send({
    message : true
  });

});

router.post('/aa_save', upload.single('photo'), (req, res) => {
  console.log('file', req.file)
  console.log('body', req.body)
  res.status(200).json({
    message: 'success!',
  })
});



router.post('/a_save', upload.single('photo'), cors(), function(req, res, next){
  //let user = '김아름' // test용

  let user = req.body.user
  let file = req.file.filename
  //console.log(file);
  //console.log(user);
  //console.log("adf");

  //let file = req.body.file
  //console.log("adf");
  //console.log(user);


  //json_data = JSON.stringify(query_data); 



  var options = {

    mode: 'text',
    // pythonPath: "C:\\Python34\\python.exe", //window path
    pythonPath: 'C:/Users/junsu/AppData/Local/Programs/Python/Python36/python.exe',
    pythonOptions: ['-u'],
    scriptPath: 'C:/project/server/routes/python/',    // 실행할 py 파일 path. 현재 nodejs파일과 같은 경로에 있어 생략
    //scriptPath: '/var/www/web/server/routes/python/',
    args: [user, file]

};


  PythonShell.run('retrain_run_inferernce.py', options ,function(err, result){
    if(err) console.log('err msg : ', err);


  });

  res.status(200).json({
    message: 'success!',
  })

});




/* GET home page. */
router.get('/a_main', cors(), function(req, res, next) {
  //let id = '김아름' // test용
  //console.log("앱 테스트");

  let id = req.body.id
  let sql = "SELECT * FROM CLOTHES_TABLE WHERE user_id=?"

  //console.log(id);
  conn.query(sql, [id], function(err, rows){
    if(err){
        console.error(err);
    }else{
        //res.send(rows);
        //console.log(rows[0]);
        //console.log(rows.length)
        res.send({
          message: true,
          rows : rows
        });
    }
  });

});



module.exports = router;