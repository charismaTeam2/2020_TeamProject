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
  let sql = "SELECT c_number,c_color_num FROM CLOTHES_TABLE WHERE user_id=? AND c_division=1"
  let sql2 = "SELECT c_number,c_color_num FROM CLOTHES_TABLE WHERE user_id=? AND c_division=2"
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
          let a_ap = []
          let aa_ap = []
          let b_ap = []
          let bb_ap = []
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
  
 // res.render('recommend', { 
 //   title: '옷 추천',
 //   session : session
 // });
});


module.exports = router;