var express = require('express');
var router = express.Router();
var multer = require('multer');
var mariaDB = require('../db/db_conn')();
var fs = require('fs');
var conn = mariaDB.init();
var path = require('path');
var cors = require('cors');

/* GET home page. */
router.get('/', function(req, res, next) {
  let session = req.session
  let id = session.user
  let sql = "SELECT c_number,c_color_num FROM CLOTHES_TABLE WHERE user_id=? AND c_division=1 AND c_button=1"
  let sql2 = "SELECT c_number,c_color_num FROM CLOTHES_TABLE WHERE user_id=? AND c_division=2 AND c_button=1"
  let sql3 = "SELECT * FROM CLOTHES_TABLE WHERE c_number=?"
  //console.log(test_ap[0][1]);

  
  conn.query(sql, [id], function(err, t1){
    if(err){
      console.error(err);
    }else{
      conn.query(sql2, [id], function(err, t2){
        if(err){
          console.error(err);
        }else{
          let test_ap = [
            [0,8,5,8,0,0,0,10,5,9,6,0,0],
            [0,0,0,0,0,0,0,10,9,0,7,8,0],
            [8,6,8,7,7,7,6,8,10,6,9,7,7],
            [8,6,0,5,8,7,0,0,10,6,9,0,7],
            [7,9,7,8,8,6,0,7,0,7,0,0,10],
            [8,6,8,8,7,0,7,8,9,7,10,0,7],
            [10,8,6,0,0,9,0,8,5,7,7,0,7],
            [10,9,8,7,0,0,0,8,6,7,0,0,0],
            [10,9,0,0,0,0,0,8,0,0,6,7,0],
            [10,9,0,0,7,8,0,0,0,0,6,0,0],
            [10,9,0,8,0,0,5,0,0,6,5,0,0],
            [10,9,7,8,0,0,0,6,5,7,6,0,0],
            [10,9,0,8,7,0,0,0,5,6,0,5,0]
          ]
          let a_ap = [] // 상의 번호
          let aa_ap = [] // 상의 색상
          let b_ap = [] // 하의 번호
          let bb_ap = [] // 하의 색상
          let f_ap = [[],[]]   // !!!!!!!!!!!! 다차원 배열 사용시 선언.
          let final_a = 0
          let final_b = 0
          let final_aa = 0
          let final_bb = 0
          let temp = 0
          let temp2 = 0
        
          for(let i=0; i<t1.length; i++){
            a_ap[i] = t1[i].c_number
            aa_ap[i] = t1[i].c_color_num
          }
          //console.log(a_ap);
          for(let i=0; i<t2.length; i++){
            b_ap[i] = t2[i].c_number
            bb_ap[i] = t2[i].c_color_num
          }

          for(let i=0; i<t1.length; i++){
            for(let j=0; j<t2.length; j++){
              f_ap[[i][j]] = test_ap[aa_ap[i]][bb_ap[j]]  // !!!!!!!!!!!! 다차원 배열 사용시 참조
              
              if(temp < f_ap[[i][j]]){
                temp2 = temp
                final_aa = final_a
                final_bb = final_b
                temp = f_ap[[i][j]]
                final_a = a_ap[i]
                final_b = b_ap[j]
                
              }
            }
          }
          console.log(f_ap);
          //console.log(temp);
          //console.log(final_aa); 
          //console.log(final_bb);
          //console.log(id);
          conn.query(sql3, [final_a], function(err, rows1){ // 콜백 지옥 코드 더 간결하게.
            if(err){
              console.error(err);
            }else{
              conn.query(sql3, [final_b], function(err, rows2){
                if(err){
                  console.error(err);
                }else{
                  conn.query(sql3, [final_aa], function(err, rows3){
                    if(err){
                      console.error(err);
                    }else{
                      conn.query(sql3, [final_bb], function(err, rows4){
                        if(err){
                          console.error(err);
                        }else{
                          res.send({
                            session : session,
                            message : true,
                            rows1 : rows1,
                            rows2 : rows2,
                            rows3 : rows3,
                            rows4 : rows4,
                            temp : temp,
                            temp2 : temp2
                          })

                          /*
                          res.render('recommend', { 
                            title: '옷 추천',
                            session : session,
                            rows1 : rows1,
                            rows2 : rows2,
                            rows3 : rows3,
                            rows4 : rows4,
                            temp : temp,
                            temp2 : temp2
                          });
                          */

                        }
                      })
                    }

                  })
                }
              });
            }

          });



          //res.send(final_b);
          //console.log(test_ap[0][1])
          //console.log(test_ap[0][1]);
          //res.send(test_ap[0][1]);

        }
      });
      
    }
    
  });
});


/* GET home page. */
router.get('/a_reco', cors(), function(req, res, next) {
  //let id = '김아름' // test용

  let id = req.body.id
  let sql = "SELECT c_number,c_color_num FROM CLOTHES_TABLE WHERE user_id=? AND c_division=1 AND c_button=1"
  let sql2 = "SELECT c_number,c_color_num FROM CLOTHES_TABLE WHERE user_id=? AND c_division=2 AND c_button=1"
  let sql3 = "SELECT * FROM CLOTHES_TABLE WHERE c_number=?"
  //console.log(test_ap[0][1]);

  
  conn.query(sql, [id], function(err, t1){
    if(err){
      console.error(err);
    }else{
      conn.query(sql2, [id], function(err, t2){
        if(err){
          console.error(err);
        }else{
          let test_ap = [
            [0,8,5,8,0,0,0,10,5,9,6,0,0],
            [0,0,0,0,0,0,0,10,9,0,7,8,0],
            [8,6,8,7,7,7,6,8,10,6,9,7,7],
            [8,6,0,5,8,7,0,0,10,6,9,0,7],
            [7,9,7,8,8,6,0,7,0,7,0,0,10],
            [8,6,8,8,7,0,7,8,9,7,10,0,7],
            [10,8,6,0,0,9,0,8,5,7,7,0,7],
            [10,9,8,7,0,0,0,8,6,7,0,0,0],
            [10,9,0,0,0,0,0,8,0,0,6,7,0],
            [10,9,0,0,7,8,0,0,0,0,6,0,0],
            [10,9,0,8,0,0,5,0,0,6,5,0,0],
            [10,9,7,8,0,0,0,6,5,7,6,0,0],
            [10,9,0,8,7,0,0,0,5,6,0,5,0]
          ]
          let a_ap = [] // 상의 번호
          let aa_ap = [] // 상의 색상
          let b_ap = [] // 하의 번호
          let bb_ap = [] // 하의 색상
          let f_ap = [[],[]]   // !!!!!!!!!!!! 다차원 배열 사용시 선언.
          let final_a = 0
          let final_b = 0
          let final_aa = 0
          let final_bb = 0
          let temp = 0
          let temp2 = 0
        
          for(let i=0; i<t1.length; i++){
            a_ap[i] = t1[i].c_number
            aa_ap[i] = t1[i].c_color_num
          }
          //console.log(a_ap);
          for(let i=0; i<t2.length; i++){
            b_ap[i] = t2[i].c_number
            bb_ap[i] = t2[i].c_color_num
          }

          for(let i=0; i<t1.length; i++){
            for(let j=0; j<t2.length; j++){
              f_ap[[i][j]] = test_ap[aa_ap[i]][bb_ap[j]]  // !!!!!!!!!!!! 다차원 배열 사용시 참조
              
              if(temp < f_ap[[i][j]]){
                temp2 = temp
                final_aa = final_a
                final_bb = final_b
                temp = f_ap[[i][j]]
                final_a = a_ap[i]
                final_b = b_ap[j]
                
              }
            }
          }
          console.log(f_ap);
          //console.log(temp);
          //console.log(final_aa); 
          //console.log(final_bb);
          //console.log(id);
          conn.query(sql3, [final_a], function(err, rows1){ // 콜백 지옥 코드 더 간결하게.
            if(err){
              console.error(err);
            }else{
              conn.query(sql3, [final_b], function(err, rows2){
                if(err){
                  console.error(err);
                }else{
                  conn.query(sql3, [final_aa], function(err, rows3){
                    if(err){
                      console.error(err);
                    }else{
                      conn.query(sql3, [final_bb], function(err, rows4){
                        if(err){
                          console.error(err);
                        }else{
                          res.send({
                            //session : session,
                            message : true,
                            rows1 : rows1,
                            rows2 : rows2,
                            rows3 : rows3,
                            rows4 : rows4,
                            temp : temp,
                            temp2 : temp2
                          })

                          /*
                          res.render('recommend', { 
                            title: '옷 추천',
                            session : session,
                            rows1 : rows1,
                            rows2 : rows2,
                            rows3 : rows3,
                            rows4 : rows4,
                            temp : temp,
                            temp2 : temp2
                          });
                          */

                        }
                      })
                    }

                  })
                }
              });
            }

          });



          //res.send(final_b);
          //console.log(test_ap[0][1])
          //console.log(test_ap[0][1]);
          //res.send(test_ap[0][1]);

        }
      });
      
    }
    
  });
});




router.post('/delete', function(req, res, next){
  let number = req.body.number

  let sql = "DELETE FROM RECOMMEND_CODY WHERE reco_cody_number=?"

  conn.query(sql, [number], function(err, result){
    if(err){
      console.log(err);
      res.send({
        message : false
      });
    }else{
      res.send({
        message : true
      });
    }
  });


});


router.post('/save', function(req, res, next){
  let session = req.session
  let user = session.user

  let top_number = req.body.top_number
  let top_name = req.body.top_name
  let top_image = req.body.top_image
  let bottom_number = req.body.bottom_number
  let bottom_name = req.body.bottom_name
  let bottom_image = req.body.bottom_image
  let number = req.body.number
  let select = req.body.select
  let reco_user = req.body.reco_user

  let sql = "INSERT INTO MY_CODY(user_id, top_number, top_name, top_image, bottom_number, bottom_name, bottom_image, comment_number)"
  + "VALUES(?, ?, ?, ?, ?, ?, ?, ?)"
  let sql2 = "DELETE FROM RECOMMEND_CODY WHERE reco_cody_number=?"
  let sql3 = "UPDATE USER_TABLE SET user_score = user_score + 10 WHERE user_id=?"

  

  let datas = [user, top_number, top_name, top_image, bottom_number, bottom_name, bottom_image, select]

  conn.query(sql, datas, function(err, result){
    if(err){
      console.log(err);
      res.send({
        message : false
      });
    }else{
      conn.query(sql2, [number], function(err, result1){
        if(err){
          console.log(err);
          res.send({
            message : false
          });
        }else{
          conn.query(sql3, [reco_user], function(err, result2){
            if(err){
              console.log(err);
              res.send({
                message : false
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
});


router.post('/situ', (req,res)=>{
  let user = req.body.user
  let select = req.body.select
  let datas = [user, select]

  let sql = "SELECT * FROM MY_CODY WHERE user_id=? AND comment_number=?"

  conn.query(sql, datas, function(err, rows){
    if(err){
      console.log(err);
      res.send({
        message : false
      });
    }else{
      res.send({
        message : true,
        rows : rows
      });
    }
  });
});

router.get('/a_situ', cors(), (req,res)=>{
  //let user = '김아름' // test용
  //let datas = [user]

  let user = req.body.id
  let sql = "SELECT * FROM MY_CODY WHERE user_id=?"

  conn.query(sql, [user], function(err, rows){
    if(err){
      console.log(err);
      res.send({
        message : false
      });
    }else{
      res.send({
        message : true,
        rows : rows
      });
    }
  });
});


router.get('/mycody', function(req, res, next){
  let session = req.session
  let user = session.user

  let sql = "SELECT * FROM MY_CODY WHERE user_id=?"

  conn.query(sql, [user], function(err, rows){
    if(err){
      console.log(err);
      res.send({
        message: false
      });
    }else{
      //console.log(rows);
      //console.log(user);
      res.send({
        rows : rows,
        session : session
      });
    }

  });

});

router.get('/', function(req, res, next){
  let session = req.session

  res.send({
    session : session
  });

});

module.exports = router;