var express = require('express');
var router = express.Router();
var fs = require('fs');
var mariaDB = require('../db/db_conn')();
var conn = mariaDB.init();



/* GET home page. */
router.get('/', function(req, res, next) {
  let session = req.session
  let id = session.user

  res.render('mypage', { 
    title: '사용자 페이지',
    session : session
  });

});


router.get('/board_info', function(req, res, next){
  let session = req.session
  let id = session.user
  let sql = "SELECT board_number, board_name, board_text, board_reco, board_view,"
  + "date_format(board_create, '%Y-%m-%d'), board_thum FROM BOARD WHERE user_id=?"
  
  conn.query(sql, [id], function(err, board_rows){
    if(err){
      console.error(err);
    }else{
      //for(let i=0; i<board_rows.length; i++){
      //  console.log(board_rows[i].board_number);
      //}
      //console.log(board_rows[0].board_number);
     // console.log("------------------");
     //console.log(board_rows);


     /// 코드를 더 효율성있게 할 수 있는 방안이 없는 이상 밑의 형식에 따라 데이터를 입력할 것.
     let board_name = board_rows[0].board_name

      res.json({
        result:true,
        board_name: board_name

      });
    


    }
  });
});



router.get('/user_info', function(req, res, next) {
  let session = req.session
  let id = session.user
  let sql = "SELECT COUNT(*) FROM BOARD WHERE user_id=?"
  let sql2 = "SELECT date_format(user_join_date, '%Y-%m-%d') FROM USER_TABLE WHERE user_id=?"

  conn.query(sql, [id], function(err, count){
    if(err){
      console.error(err);
    }else{
      let c_count = count[0][Object.keys(count[0])[0]];
      
      conn.query(sql2, [id], function(err, date){
        if(err){
          console.error(err);
        }else{
          let d_date = date[0][Object.keys(date[0])[0]];
          //console.log(date[0][Object.keys(date[0])[0]]);
          res.json({
            result:true,
            c_count : c_count,
            date : d_date
          });
        }

      });
    }

  })


});


module.exports = router;