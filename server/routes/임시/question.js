var express = require('express');
var router = express.Router();
var mariaDB = require('../db/db_conn')();
var fs = require('fs');
var conn = mariaDB.init();
var path = require('path');


router.post('/add/q_register', function(req, res, next){
  let name = req.body.title // 제목
  let situ = req.body.situ // 상황
  let text = req.body.text // 내용
  let test = req.body.test // 사용한 옷 일련번호
  let user = req.body.id // 글쓴이

  let datas = [name, situ, text, user]
  let sql = "INSERT INTO question_board(q_board_name, q_board_situ, q_board_text, q_board_stat, q_board_create, user_id)"
  + "VALUES(?, ?, ?, 1, now(), ?)"
  let sql2 = "SELECT MAX(q_board_number) FROM question_board"
  let sql3 = "INSERT INTO question_board_image(q_board_number, c_number)"
  + "VALUES(? ,?)"
  
  conn.query(sql, datas, function(err, result1){
    if(err){
      console.error("err : " + err);
    }else{
      conn.query(sql2, function(err, result2){
        if(err){
          console.error("err : " + err);
        }else{
          let q_number = result2[0][Object.keys(result2[0])[0]]
          
          // 사진이 1장만 들어올 때에는 length값이 정의되지 않기 때문에, 페이지 단에서 1장만 넘어올 수 없게 막을 것.
          for(let i=0; i<test.length; i++){
            let q_datas = [q_number, test[i]]
            conn.query(sql3, q_datas, function(err, result3){
              if(err){
                console.error("err : " + err);
              }
            });
          }
          req.session.save(function(){
            res.redirect('/main');
        });
          
        }
      });
    }

  });


});

router.get('/question_boarding/:number', function(req, res, next){
  let number = req.params.number
  let session = req.session
  let sql = "SELECT c_number FROM question_board_image WHERE q_board_number=?"
  let sql3 = "SELECT * FROM question_board WHERE q_board_number=?"

  
  conn.query(sql, [number], function(err, result1){
    if(err){
      console.error("err : " + err);
    }else{
      let sql2 = "SELECT c_number,c_division,c_image FROM clothes_table WHERE c_number="+[result1[0][Object.keys(result1[0])[0]]]+";"

      for(let i=1; i<result1.length; i++){
        sql2 += "SELECT c_number,c_division,c_image FROM clothes_table WHERE c_number="+[result1[i][Object.keys(result1[0])[0]]]+";"
      }
      conn.query(sql2, function(err, rows){
        if(err){
          console.error("err : " + err);
        }else{
          conn.query(sql3, [number], function(err, q_rows){
            if(err){
              console.error("err : " + err);
            }else{
              res.render('question_boarding',{
                title:'코디문의 게시글',
                session: session,
                rows:rows,
                q_rows:q_rows
              });

            }
          });        
      }
      });

      /*
      //let sql2 = "SELECT c_number,c_division,c_image FROM clothes_table WHERE c_number="+ [result1[0][Object.keys(result1[0])[0]]];
      for(let i=0; i<result1.length; i++){
        let a = [result1[i][Object.keys(result1[0])[0]]]
        conn.query(sql2, a, function(err, rows){
          if(err){
            console.error("err : " + err);
          }else{
            temp = rows;
          }
        });
      }
      res.send(temp);
      */

      /*
      for(let i=0; i<result1.length; i++){
        temp[i] = [result1[i][Object.keys(result1[0])[0]]]
      }
      conn.query(sql2, temp, function(err, rows){
        if(err){
          console.error("err : " + err);
        }else{
          var rows = rows
        }
      });
      res.render('question_boarding',{
        title:'코디문의 게시글',
        session: session,
        rows:rows
      });
*/
      /*
      let sql2 = "SELECT c_number,c_division,c_image FROM clothes_table WHERE c_number="+[result1[0][Object.keys(result1[0])[0]]]+";"
      for(let i=1; i<result1.length; i++){
        sql2 += "SELECT c_number,c_division,c_image FROM clothes_table WHERE c_number="+[result1[i][Object.keys(result1[0])[0]]]+";"
      }
      conn.query(sql2, function(err, rows){
        if(err){
          console.error("err : " + err);
        }else{
          res.send(sql2)
        }

      });
      */

      /*
      for(let i=0; i<result1.length; i++){
        let temp_co = [result1[i][Object.keys(result1[0])[0]]]
        conn.query(sql2, temp_co, function(err, rows){
          if(err){
            console.error("err : " + err);
          }else{
            temp_rows = rows

          }
        });
      }
      res.render('question_boarding',{
        title:'코디문의 게시글',
        session: session,
        temp_rows:temp_rows
      });
      */
      /*
      for(let i=0; i<temp_number.length; i++){
        conn.query(sql2, [temp_number][i], function(err, rows){
          if(err){ 
            console.error("err : " + err); 
          }else{
            temp_rows = rows
          }
        });
      }
      res.render('question_boarding',{
        title:'코디문의 게시글',
        session: session,
        temp_rows: temp_rows
      });

      */
    }
  });
});

router.post('/add/reco_cody', function(req, res, next){
  let test = req.body.test
  let session = req.session
  let user = req.body.id
  let num = req.body.q_number
  let q_user = req.body.q_user_id

  let datas = [num, q_user, user]
  let sql = "INSERT INTO recommend_cody(q_board_number, user_id, reco_user_id)"
  + "VALUES(?, ?, ?)"
  let sql2 = "SELECT MAX(reco_cody_number) FROM recommend_cody"
  let sql3 = "INSERT INTO recommend_cody_clothes(reco_cody_number, c_number)"
  + "VALUES(?, ?)"

  conn.query(sql, datas, function(err,result){
    if(err){
      console.error("err : " + err);
    }else{
      conn.query(sql2, function(err, result2){
        let r_temp = result2[0][Object.keys(result2[0])[0]]
        let datas2 = [r_temp, test]
        for(let i=0; i<test.length; i++){
          let datas2 = [r_temp, test[i]]
          conn.query(sql3, datas2, function(err, result3){
            if(err){
              console.error("err : " + err);
            }
          });
        }
        req.session.save(function(){
          res.redirect('/main');
      });

      });
    }

  });

});


/* GET home page. */
router.get('/:page', function(req, res, next) {
  let session = req.session
  let page = req.param.page
  let sql = "SELECT q_board_number,q_board_name,q_board_view,date_format(q_board_create, '%Y-%m-%d') q_board_create,user_id FROM QUESTION_BOARD WHERE q_board_stat=1 ORDER BY q_board_number DESC"

  conn.query(sql, function(err, rows){
    if(err){
      console.error("err : " + err);
    }else{
      res.render('question_board', { 
        title: '코디 문의',
        session : session,
        rows: rows
      });

    }
  })
});


router.get('/add/q_register', function(req, res, next) {
    let session = req.session
    let user = session.user
    let sql = "SELECT * FROM clothes_table WHERE user_id=?"

    conn.query(sql, [user], function(err, rows){
      if(err){
        console.error("err : " + err);
      }else{

        res.render('q_register', { 
          title: '코디 문의 작성',
          session : session,
          rows: rows
        });
      }
    });
  });


module.exports = router;