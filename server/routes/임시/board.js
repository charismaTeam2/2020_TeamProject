// 커뮤니티 관련 사항 라우터

var express = require('express');
var router = express.Router();
var multer = require('multer');
var mariaDB = require('../db/db_conn')();
var fs = require('fs');
var conn = mariaDB.init();
var path = require('path');

var upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, 'upload/community')
        },
        filename: function(req, file, cb){
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        }
    })
});

// 2020.03.25 => 기본적 단계의 테이블 형성완료.
// 이번주까지 일반 커뮤니티 게시판(인스타 같은 이미지 게시판), 코디 문의 게시판(일반 글 게시판 + 저장된 옷 종류를 불러오기 + 상대의 옷 추천 + 추천 받은 코디 저장)
// 을 전부 수행완료 할 것.


// 다중으로 이미지를 업로드하기 위해선 array를 사용. 뒤의 10은 최대 10개까지 받는 다는 의미.
// 다중으로 이미지를 업로드 하면, files란 객체가 모든 정보를 가지고 있다.
// 사용하기 위해선, req.files를 호출하면 전 정보를 출력할 수 있고, req.files[i]를 호출하면 i번째의 정보를 호출할 수 있다.
router.post('/commu_register', upload.array("file",10), function(req, res, next){
    //let number
    let title = req.body.title
    let text = req.body.text
    let id = req.body.id
    //let file = req.body.file

    //let datas = [title, text, id];
    
    var sql1 = "INSERT INTO BOARD(board_name, board_text, board_stat, board_create, board_thum, user_id)"
    + "VALUES(?, ?, 1, now(), ?, ?)";
    var sql2 = "SELECT MAX(board_number) FROM BOARD";
    var sql3 = "INSERT INTO BOARD_IMAGE(board_image_path, board_number)"
    + "VALUES(?, ?)";

    // 재정의.
    conn.query(sql2, function(err, rows){
        if(err){
            console.error("err : " + err);
        }else{
            var number = rows[0][Object.keys(rows[0])[0]]; // *** 중요!! json 객체의 값 만을 추출.
            for(let i=0; i<req.files.length; i++){
                var test = [req.files[i].filename, number+1];
                conn.query(sql3, test, function(err, result2){
                    if(err){
                        console.error("err : " + err);
                    }
                });
            }
            let datas = [title, text, req.files[0].filename, id]
            conn.query(sql1, datas, function(err, rows){
                if(err){
                    console.error("err : "+ err);
                }else{
                    req.session.save(function(){
                        res.redirect('/board/community/1');
                    });
                }
            });
        }
    })


    /*

    // 콜백함수를 계속 써서 여러 개의 쿼리문을 사용할 수는 있지만, 양이 많아지면 성능에 문제를 야기할 수 있기 때문에
    // 최대한 sql1+sql2 같은 형식의 다중 쿼리문으로 처리한다. 
    // 밑에 구현한 코드는 저장->다른 값 추출->추출한 값을 기반으로 다시 저장의 패턴을 사용했기 때문에 어쩔 수 없이 사용했다.
    conn.query(sql1, datas, function(err, result){
        if(err){
            console.error("err : "+ err);
        }else{
            conn.query(sql2, function(err, rows){
                if(err){
                    console.error("err : " + err);
                }else{
                    var number = rows[0][Object.keys(rows[0])[0]]; // *** 중요!! json 객체의 값 만을 추출.
                    for(let i=0; i<req.files.length; i++){
                        var test = [req.files[i].filename, number];
                        conn.query(sql3, test, function(err, result2){
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
*/
  
    // 성공.
  /*  
    conn.query(sql2, function(err, rows){
        //res.json(rows[0].number);
        //res.send(rows);
        //res.send(Object.keys(rows)[0]);
        //res.send(Object.keys(rows[0])[0]);
        //res.send(rows[0][Object.keys(rows[0])[0]]);
        if(8 == rows[0][Object.keys(rows[0])[0]] ){
            res.send("<script> alert('성공'); </script>");
        }else{
            res.send("<script> alert('실패'); </script>");
        }
    });
    */



    // 실패예제. 참고만 할것.
    
/*
    conn.query(sql1, datas, function(err, rows){
        conn.query(sql2, function(err, rows){
            var temp = rows[0];
            for(var i=0; i<req.files.length; i++){
                var ra = [req.files[i].filename, rows];
                conn.query(sql3, ra, function(err, rows){
                    if(err){
                        console.error("err : " + err);
                    }else{
                        res.send("<script> alert('성공); </script>");
                    }
                });
            }
        });
    });
*/

/*
    conn.query(sql1 + sql2, datas, function(err, results){
        var result2 = results[1];
        for(let i=0; i<req.files.length; i++){
            var tt = "INSERT INTO BOARD_IMAGE(board_image_path, board_number)"
            + "VALUES ("+req.files[i].filename +", "+result2 +")";
        }
        conn.query(tt, function(err, result){
            if(err){
                console.error("err : " + err);
            }else{
                res.send("<script>"
            + "alert(' 저장 완료');"
            + "location.replace('/main')</script>");
            }

        })
    });
*/
    /*
    conn.query(sql, datas, function(err, rows){
        if(err){
            console.error("err : "+ err);
        }else{
            var board_num = conn.query(test, function(err, rows){
                if(err){
                    console.error("err : " + err);
                }else{

                    var tt = "INSERT INTO BOARD_IMAGE(board_image_path, board_number)"
                    + "VALUES (?, "+board_num +")";
                
                    for(let i=0; i<req.files.length; i++){
                        let img_datas = [req.files[i].filename];
                    }
                    for(let i=0; i<img_datas.length; i++){
                        conn.query(tt, tt, function(err, rows){
                            if(err){
                                console.error("err : " + err);
                            }
                        });
                    }
                
                }
            });    
        }
    });
    */

/*
    var board_num = conn.query(test, function(err, rows){
        if(err){
            console.error("err : " + err);
        }
    });

    var tt = "INSERT INTO BOARD_IMAGE(board_image_path, board_number)"
    + "VALUES (?, "+board_num +")";

    for(let i=0; i<req.files.length; i++){
        let img_datas = [req.files[i].filename];
    }
    for(let i=0; i<img_datas.length; i++){
        conn.query(tt, tt, function(err, rows){
            if(err){
                console.error("err : " + err);
            }
        });
    }

*/
    
    // 호출.
    //res.send(req.files)
    //res.send(req.files[0].filename);
});

// 댓글 작성
router.post('/community/comment', function(req, res, next){
    let comment = req.body.comment
    let board_num = req.body.board_number
    let user_id = req.body.user_id

    let datas = [comment, user_id, board_num]
    let sql = "INSERT INTO comment_table(comment_text, comment_date, user_id, board_number)"
    + "VALUES(?, now(), ?, ?)";

    conn.query(sql, datas, function(err, rows){
        if(err){
            console.error("err : " + err);
        }else{
            req.session.save(function(){
                res.redirect('/board/community/commu_boarding/'+board_num);
            });
        }
    });
});

// 커뮤니티 게시글
router.get('/community/commu_boarding/:board_number', function(req, res, next){
    let number = req.params.board_number
    let session = req.session
    let sql = "SELECT * FROM BOARD WHERE board_number=?"
    let sql2 = "SELECT board_image_number, board_image_path FROM BOARD_IMAGE WHERE BOARD_NUMBER=?"
    let sql3 = "SELECT comment_text, user_id FROM COMMENT_TABLE WHERE board_number=?"
    let sql4 = "SELECT board_view FROM BOARD WHERE board_number=?"
    let sql5 = "UPDATE BOARD SET board_view=? WHERE board_number=?"
    conn.query(sql, [number], function(err, row){
        if(err){
            console.error("err : " + err);
        }else{
            conn.query(sql2, [number], function(err, result){
                if(err){
                    console.error("err : " + err);
                }else{
                    conn.query(sql3, [number], function(err, comment){
                        if(err){
                            console.error("err : " + err);
                        }else{
                            conn.query(sql4, [number], function(err, res_view){
                                if(err){ console.error("err : " + err);
                            }else{
                                let view_temp = res_view[0][Object.keys(res_view[0])[0]];
                                view_temp++
                                let testaa = [view_temp, number]
                                conn.query(sql5, testaa, function(err, result2){
                                    if(err){
                                        console.error("err : " + err);
                                    }
                                });
                            }
                            })
                            //res.send(title, row[0], result, comment);

                            res.render('commu_boarding',{
                                title:'커뮤니티 게시글',
                                session: session,
                                row: row[0],
                                result: result,
                                comment: comment
                            });

                        }
                    })
                }
            });
        }
    });
});

// 커뮤니티 게시판
router.get('/community/:page', function(req, res, next){
    let session = req.session
    let page = req.param.page
    let sql = "SELECT * FROM BOARD WHERE board_stat=1 ORDER BY board_create DESC"
    let sql2 = "SELECT comment_text,user_id FROM COMMENT_TABLE WHERE board_number=?"

    conn.query(sql, function(err, rows){
        if(err){
            console.error("err :" + err);
        }else{
            let data = [rows[0][Object.keys(rows[0])[0]]]
            
            conn.query(sql2, data, function(err, rows2){
                if(err){
                    console.error("err : " + err);
                }else{
                    /*
                    res.send([
                        {
                            title: '커뮤니티',
                            session: session,
                            rows:rows,
                            rows2:rows2
                        }
                    ]);
                    */
                    
                    res.render('community',{
                        title: '커뮤니티',
                        session : session,
                        rows: rows,
                        rows2: rows2
                    });
                    
                }
            });
            
           //res.send(rows[0][Object.keys(rows[0])[0]]);

        }

    });
});


router.get('/commu_register', function(req, res, next){
    let session = req.session;
    res.render('commu_register',{
        title: '커뮤니티 등록',
        session: session
    });
});



/* GET home page. */
/*
router.get('/community', function(req, res, next) {
  let session = req.session;
  res.render('community', { 
    title: '커뮤니티',
    session : session
  });
});
*/

/*
router.get('/imgs', function(req, res, next) {
  fs.readFile('./upload/4dd1d484164a8f22e173c1132c0690e9', function(error, data){
      res.writeHead(200, { 'Content-Type': 'text/html'});
      res.end(data);
  });
});
*/

module.exports = router;