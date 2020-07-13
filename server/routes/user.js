var express = require('express');
var router = express.Router();
var mariaDB = require('../db/db_conn')();
var conn = mariaDB.init();
//const userController = require('../controllers/userController');
var crypto = require('crypto');
var cors = require('cors');


router.post('/login', cors(), function(req,res){
    var id = req.body.id;
    var password = req.body.password;

    //console.log(id);
    //console.log(password);
    //console.log(req.body);
    //console.log(req.header);
    //console.log(req.headers);

    let sql = "SELECT * FROM USER_TABLE WHERE user_id=?"
    let sql2 = "SELECT user_division FROM USER_TABLE WHERE user_id=?"


    conn.query(sql,[id], function(err, rows){
        if(err){
            console.error("err : " + err);
            res.send({ message : false });
        }else{
            //for(var i=0; i<rows.length; i++){
            //    res.send(rows[i].user_password); // 데이터 값.
            //}
            //res.send(rows[0].user_password); // 데이터 값.

            var salt = rows[0].user_salt;
            var temp_password = password + salt;
            var hashPassword = crypto.createHash('sha512').update(temp_password).digest('base64');

            if(rows[0].user_password == hashPassword){
                conn.query(sql2, [id], function(err, rows2){
                    if(err){
                        console.log(err);
                    }else{
                        let division_check = rows2[0][Object.keys(rows2[0])[0]];

                        req.session.user = req.body.id;
                        req.session.save(function(){
                            res.send({ 
                                message : true,
                                division : division_check
                             })
                            //console.log(res);
                        });


                    }
                })
                // 로그인 성공
               // res.render('main', { 
               //     title: '메인',
               //     session : session
               // });

               //req.session.[세션의 변수명] = [넣을 값];
               
                //req.session.a = id;
                //req.session.isLogined = true;

                
              //  res.cookie("user", id , { // user=> 쿠키명, id=> 값.
              //      expires: new Date(Date.now() + 900000), // 기한.
             //       httpOnly: true //웹 서버에서만 동작.
             //     });
                //req.session.user = id;

                //sess = id;
                //res.redirect('/main');

               // res.redirect('/main');
            }else{
                // 로그인 실패
                res.send({ 
                    message : false
                 });
                 //console.log(res);
            }
        }
    });
});


router.post('/sign', function(req, res){
    var id = req.body.id;
    var password = req.body.password;
    var phone = req.body.phone;
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;

    //console.log(req.body);
    //비밀번호 암호화
    var salt = Math.floor(Math.random() * 1000) + 1;
    var temp_password = password + salt.toString();
    var hashPassword = crypto.createHash('sha512').update(temp_password).digest('base64');

    var datas = [id, hashPassword, phone, name, email, address, salt];

    // model 빼두기.
    var sql = "INSERT INTO USER_TABLE(user_id, user_password, user_phone, user_name, user_email, user_address, user_join_date, user_salt)"
    + " VALUES(?, ?, ?, ?, ?, ?, now(), ?)";

    conn.query(sql, datas, function(err, rows){
        if(err){
            console.error("err : " + err);
            res.send({
                message : false
            })
        }else{
            res.send({
                message : true
            });
        }
        

    });
});

// 로그아웃 부분
router.get('/logout', function(req, res, next){

    req.session.destroy(function(){ 
        req.session;
        res.clearCookie('sid'); // 세션 쿠키 삭제
    });
});




router.post('/a_login', cors(), function(req,res){
    var id = req.body.id;
    var password = req.body.password;

    //console.log(id);
    //console.log(password);
    //console.log(req.body);
    //console.log(req.header);
    //console.log(req.headers);

    var sql = "SELECT * FROM USER_TABLE WHERE user_id=?";


    conn.query(sql,[id], function(err, rows){
        if(err){
            console.error("err : " + err);
            res.send({ message : false });
        }else{
            //for(var i=0; i<rows.length; i++){
            //    res.send(rows[i].user_password); // 데이터 값.
            //}
            //res.send(rows[0].user_password); // 데이터 값.

            var salt = rows[0].user_salt;
            var temp_password = password + salt;
            var hashPassword = crypto.createHash('sha512').update(temp_password).digest('base64');

            if(rows[0].user_password == hashPassword){
                // 로그인 성공
               // res.render('main', { 
               //     title: '메인',
               //     session : session
               // });

               //req.session.[세션의 변수명] = [넣을 값];
               
                //req.session.a = id;
                //req.session.isLogined = true;

                
              //  res.cookie("user", id , { // user=> 쿠키명, id=> 값.
              //      expires: new Date(Date.now() + 900000), // 기한.
             //       httpOnly: true //웹 서버에서만 동작.
             //     });
                //req.session.user = id;

                //sess = id;
                //res.redirect('/main');
                req.session.user = req.body.id;
                req.session.save(function(){
                    res.send({ 
                        message : true,
                        user : id })
                    //console.log(res);
                });
               // res.redirect('/main');
            }else{
                // 로그인 실패
                res.send({ 
                    message : false
                 });
                 //console.log(res);
            }
        }
    });
});

router.get('aa_user', cors(), function(req,res,next){

    //let id= 'test' // test용
    //console.log('adf');
    
    let id = req.body.id
    let sql = 'SELECT following_id FROM user_following WHERE user_id=?'

    conn.query(sql, [id], function(err, rows){
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
    })

});

module.exports = router;