var express = require('express');
var router = express.Router();
var multer = require('multer');
var mariaDB = require('../db/db_conn')();
var fs = require('fs');
var conn = mariaDB.init();
var path = require('path');
var cors = require('cors');

var upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            //cb(null, '/var/www/web2/views/public/images/') // 하드 코딩.
            cb(null, 'C:/project/views/public/images/')
        },
        filename: function(req, file, cb){
            cb(null, new Date().valueOf() + (Math.floor(Math.random() * (10000 - 1)) + 1) + path.extname(file.originalname) );
        }
    })
});


router.post('/write', upload.single('file'), (req,res)=>{
    let title = req.body.title
    let text = req.body.text
    let user = req.body.user
    let check = req.body.check
    let check_switch = 1 // 1전체공개. 2비공개
    console.log("adfs");
    console.log(req.body);
    console.log(req.files[0].filename);

    if(check === true){
        check_switch = 2
    }

    let datas = [title, text, req.files[0].filename, check_switch, user]
    console.log(datas);
    console.log(req.files[0].filename)

    let sql1 = "INSERT INTO BOARD(board_name, board_text, board_stat, board_create, board_thum, board_show, user_id)"
    + "VALUES(?, ?, 1, now(), ?, ?, ?)"

    conn.query(sql1, datas, function(err, rows){
        if(err){
            console.log(err);
            res.send({
                message: false
            });
        }else{
            res.send({
                message: true
            })
        }

    })


});

/*
router.post('/write', upload.array("file",10), (req,res)=>{
    //console.log(req.files);
    //console.log(req.body.text);
    let title = req.body.title
    let text = req.body.text
    let user = req.body.user
    let check = req.body.check
    let check_switch = 1 // 1전체공개. 2비공개
    console.log("도착");

    if(check === true){
        check_switch = 2
    }

    console.log(check);
    console.log(check_switch);
    

    let sql1 = "INSERT INTO BOARD(board_name, board_text, board_stat, board_create, board_thum, board_show, user_id)"
    + "VALUES(?, ?, 1, now(), ?, ?, ?)"
    let sql2 = "SELECT MAX(board_number) FROM BOARD"
    let sql3 = "INSERT INTO BOARD_IMAGE(board_image_path, board_number)"
    + "VALUES(?, ?)"
    
    // 재정의.
    conn.query(sql2, function(err, rows){
        if(err){
            console.error("err : " + err);
            res.send({
                message : false
            });
        }else{
            var number = rows[0][Object.keys(rows[0])[0]]; // *** 중요!! json 객체의 값 만을 추출.
            for(let i=0; i<req.files.length; i++){
                var test = [req.files[i].filename, number+1];
                conn.query(sql3, test, function(err, result2){
                    if(err){
                        //console.log("a");
                        console.error("err : " + err);
                        res.send({
                            message : false
                        });
                    }
                });
            }
            console.log("testing1");
            let datas = [title, text, req.files[0].filename, check_switch, user]
            conn.query(sql1, datas, function(err, rows){
                if(err){
                    console.error("err : "+ err);
                    res.send({
                        message : false
                    });
                }else{
                    console.log("testing2");
                    //res.redirect('/');

                    req.session.save(function(){
                        res.redirect('/');
                    });
                }
            });
        }
    })
});
*/

    
// 커뮤니티 게시글
router.get('/boarding/:board_number', function(req, res, next){
    let number = req.params.board_number
    let session = req.session
    //console.log(number);
    let sql = "SELECT * FROM BOARD WHERE board_number=?"
    let sql2 = "SELECT board_image_number, board_image_path FROM BOARD_IMAGE WHERE BOARD_NUMBER=?"
    let sql3 = "SELECT comment_number, comment_text, user_id, comment_date FROM COMMENT_TABLE WHERE board_number=?"
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

                            res.send({
                                session : session,
                                row : row[0],
                                result : result,
                                comment: comment
                            });

                           // res.render('commu_boarding',{
                           //     title:'커뮤니티 게시글',
                           //     session: session,
                           //     row: row[0],
                           //     result: result,
                           //     comment: comment
                           // });

                        }
                    })
                }
            });
        }
    });
});




// 댓글 작성
router.post('/comment', function(req, res, next){
    let comment = req.body.comment
    let board_num = req.body.number
    let user_id = req.body.user
    //console.log(user_id);

    let datas = [comment, user_id, board_num]
    let sql = "INSERT INTO comment_table(comment_text, comment_date, user_id, board_number)"
    + "VALUES(?, now(), ?, ?)";

    conn.query(sql, datas, function(err, rows){
        if(err){
            console.error("err : " + err);
        }else{
            res.send({
                message:true
            });
        }
    });
});





router.get('/', cors(), function(req, res, next){
    let session = req.session
    let sql = "SELECT * FROM BOARD WHERE board_stat=1 AND board_show=1 ORDER BY board_create DESC"

    conn.query(sql, function(err, board){
        if(err){
            console.log(err);
        }else{
            res.send({
                session : session,
                board : board
            })
        }
    });
});

router.get('/write', cors(), function(req, res, next){
    let session = req.session
 
    if(session == ""){
        res.send({
            err : true
        });
    }else{
        res.send({
            message:"test",
            session : session
        });
    }
});

router.get('/a_board', cors(), function(req, res, next){
    let session = req.session
    let user = session.user
    let sql = "SELECT * FROM BOARD WHERE board_stat=1 AND board_show=1 ORDER BY board_create DESC"

    conn.query(sql, function(err, board){
        if(err){
            console.log(err);
        }else{
            res.send({
                session : user,
                board : board
            })
        }
    });
});


module.exports = router;