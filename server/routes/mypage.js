var express = require('express');
var router = express.Router();
var fs = require('fs');
var mariaDB = require('../db/db_conn')();
var conn = mariaDB.init();



/* GET home page. */
router.get('/', function(req, res, next) {
  let session = req.session
  //let id = session.user

  res.send({
    session : session
  });

});

router.post('/clothes', function(req, res, next){
  //let session = req.session
  //let id = session.user // 세션 사용자. 현재 접근자.
  let user = req.body.user // 대상자.

  let sql = "SELECT * FROM CLOTHES_TABLE WHERE user_id=? AND c_button=1"

  conn.query(sql, [user], function(err, clothes){
    if(err){
      console.log(err);
      res.send({
        message : false
      });
    }else{
      res.send({
        message : true,
        clothes : clothes
      });
    }
  });

});


router.post('/following', function(req, res, next){
  let session = req.session
  let following = session.user // 팔로잉 대상.
  let user = req.body.user // 팔로워 신청자
  let number = req.body.number
  let text = "팔로워 신청이 수락되었습니다."
  let manage = "시스템"
  

  console.log("follow : " + following);
  console.log(user);
  
  let datas1 = [user, following]
  let datas2 = [following, user]
  let datas3 = [text, user, manage]

  let sql = "INSERT INTO user_following(user_id, following_id)"
  + "VALUES(? ,?)";
  let sql2 = "INSERT INTO user_follower(user_id, follower_id)"
  + "VALUES(? ,?)";
  let sql3 = "INSERT INTO message(m_text, m_create, m_division, rece_user, send_user)"
  + "VALUES(?, now(), 3, ? ,?)";
  let sql4 = "DELETE FROM message WHERE m_number=?"

  conn.query(sql, datas1, function(err, data1){
    if(err){
      console.log(err);
      res.send({
        message : false
      });
    }else{
      conn.query(sql2, datas2, function(err, data2){
        if(err){
          console.log(err);
          res.send({
            message : false
          });
        }else{
          conn.query(sql3, datas3, function(err, data3){
            if(err){
              console.log(err);
              res.send({
                message : false
              });
            }else{
              conn.query(sql4, [number], function(err, data4){
                if(err){
                  res.send({
                    message:false
                  });
                }else{
                  res.send({
                    message : true
                  });
                }
              });     
            }
          });
        }
      });
    }
  });

});


router.post('/userpage', function(req, res, next){
  let id = req.body.user // 타 사용자
  let session = req.session
  let user = session.user // 현재 사용자. 세션.

  let sql = "SELECT COUNT(*) FROM BOARD WHERE user_id=?"
  let sql2 = "SELECT date_format(user_join_date, '%Y-%m-%d') FROM USER_TABLE WHERE user_id=?"
  let sql3 = "SELECT user_score FROM USER_TABLE WHERE user_id=?"
  let sql4 = "SELECT follower_id FROM USER_FOLLOWER WHERE user_id=?"
  let sql5 = "SELECT following_id FROM USER_FOLLOWING WHERE user_id=? "

  conn.query(sql, [id], function(err, count){
    if(err){
      console.error(err);
      res.send({
        message : false
      });
    }else{
      let c_count = count[0][Object.keys(count[0])[0]];
      
      conn.query(sql2, [id], function(err, date){
        if(err){
          console.error(err);
          res.send({
            message : false
          });
        }else{
          let d_date = date[0][Object.keys(date[0])[0]];
          //console.log(date[0][Object.keys(date[0])[0]]);

          conn.query(sql3, [id], function(err, score){
            if(err){
              console.log(err);
              res.send({
                message : false
              });
            }else{
              let d_score = score[0][Object.keys(score[0])[0]];

              conn.query(sql4, [id], function(err, temp){
                if(err){
                  console.log(err);
                  res.send({
                    message : false
                  });
                }else{
                  let f_user = false;
                  for(let i=0; i<temp.length; i++){
                    if(temp[i].follower_id == user){
                      f_user = true;
                    }
                  }
                  //console.log(f_user);
                  conn.query(sql5, [id], function(err, rowss){
                    if(err){
                      console.log(err);
                      res.send({
                        message : false
                      });
                    }else{
                      let fl_user = false;
                      for(let i=0; i<rowss.length; i++){
                        if(rowss[i].following_id == user){
                          fl_user = true;
                        }
                      }
                      //console.log(rowss);
                      res.send({
                        message : true,
                        count : c_count,
                        date : d_date,
                        score: d_score,
                        f_user : f_user,
                        fl_user : fl_user
                      });

                    }
                  });
                }
              });
            }
          });
        }

      });
    }

  });
  

});

router.post('/boardpage', function(req, res, next){
  let id = req.body.user
  //let session = req.session

  let sql = "SELECT board_number, board_name, board_text, board_reco, board_view, board_create,"
  + "board_thum FROM BOARD WHERE user_id=?"

  conn.query(sql, [id], function(err, board_rows){
    if(err){
      console.error(err);
      res.send({
        message : false
      });
    }else{

     res.send({
       message: true,
       board : board_rows
     });

    }
  });
});


router.get('/message_info', function(req, res, next){
  //let select = req.body.select
  let session = req.session
  let user = session.user
  //console.log(user);
  //let datas = [user, select]
  let datas = [user]
  //let sql = "SELECT * FROM MESSAGE WHERE rece_user=? AND m_division=?"
  let sql = "SELECT * FROM MESSAGE WHERE rece_user=?"

  conn.query(sql, datas, function(err, rows){
    if(err){
      console.log(err);
      res.send({
        message: false
      });
    }else{
      res.send({
        message : true,
        rows : rows
      });
    }
  });

});

router.get('/deal_info', function(req, res, next){
  let session = req.session
  let user = session.user

  let sql = "SELECT * FROM deal_table WHERE user_id=?"

  conn.query(sql, [user], function(err, rows){
    if(err){
      console.log(err);
    }else{
      res.send({
        session : session,
        deal : rows
      });
    }
  });


});

router.get('/s_deal_info', function(req, res, next){
  let session = req.session
  let user = session.user

  let sql = "SELECT * FROM deal_table WHERE seller=?"

  conn.query(sql, [user], function(err, rows){
    if(err){
      console.log(err);
    }else{
      if(rows);
      res.send({
        session : session,
        deal : rows
      });
    }
  });


});


router.post('/message', function(req, res, next){
  let rece_user = req.body.rece
  let send_user = req.body.send
  let text = req.body.text
  let division = req.body.division // 0- 일반, 1-팔로워 신청, 2-거래, 3-공지
  let datas = [text, division, rece_user, send_user]

  let sql="INSERT INTO MESSAGE(m_text, m_create, m_division, rece_user, send_user)"
  + "VALUES(?, now(), ?, ?, ?);"

  conn.query(sql, datas, function(err, rows){
    if(err){
      console.log(err);
      res.send({
        message : false
      });
    }else{
      res.send({
        message: true
      });
    }

  });



});


router.get('/board_info', function(req, res, next){
  let session = req.session
  let id = session.user
  let sql = "SELECT board_number, board_name, board_text, board_reco, board_view, board_create,"
  + "board_thum FROM BOARD WHERE user_id=?"
  
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
     //let board_name = board_rows[0].board_name

     res.send({
       board : board_rows
     });

    }
  });
});



router.get('/user_info', function(req, res, next) {
  let session = req.session
  let id = session.user
  let sql = "SELECT COUNT(*) FROM BOARD WHERE user_id=?"
  let sql2 = "SELECT date_format(user_join_date, '%Y-%m-%d') FROM USER_TABLE WHERE user_id=?"
  let sql3 = "SELECT user_score FROM USER_TABLE WHERE user_id=?"
  

  conn.query(sql, [id], function(err, count){
    if(err){
      console.error(err);
      res.send({
        message:false
      });
    }else{
      let c_count = count[0][Object.keys(count[0])[0]];
      
      conn.query(sql2, [id], function(err, date){
        if(err){
          console.error(err);
          res.send({
            message:false
          });
        }else{
          let d_date = date[0][Object.keys(date[0])[0]];
          //console.log(date[0][Object.keys(date[0])[0]]);

          conn.query(sql3, [id], function(err, score){
            if(err){ 
              console.log(err);
              res.send({
                message: false
              });
            }else{
              let d_score = score[0][Object.keys(score[0])[0]];
              res.send({
                message : true,
                c_count : c_count,
                date : d_date,
                score : d_score
              });
            }
          });
        }

      });
    }

  })


});


module.exports = router;