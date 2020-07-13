var express = require('express');
var router = express.Router();
var mariaDB = require('../db/db_conn')();
var crypto = require('crypto');
var conn = mariaDB.init();
    
// 로그인 기능
router.post('/login',async function(req,res,next){
    var id = req.body.id;
    var password = req.body.password;

    var datas=[id];
    
    var sql = "SELECT * FROM USER_TABLE WHERE user_id=?";

    conn.query(sql,datas, function(err, rows){
        if(err){
            console.error("err : " + err);
            res.send("<script>alert('아이디가 없습니다');history.back();</script>");
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
                    res.redirect('/board/community/1');
                });
               // res.redirect('/main');
            }else{
                // 로그인 실패
                res.send("<script>alert('비밀번호가 틀립니다.');history.back();</script>");
            }
        }
    });
});


// 회원가입 데이터 저장.
// 
router.post('/sign', function(req, res, next){
    var id = req.body.id;
    var password = req.body.password;
    var phone = req.body.phone;
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;

    //비밀번호 암호화
    var salt = Math.floor(Math.random() * 1000) + 1;
    var temp_password = password + salt.toString();
    var hashPassword = crypto.createHash('sha512').update(temp_password).digest('base64');

    var datas = [id, hashPassword, phone, name, email, address, salt];

    
    var sql = "INSERT INTO USER_TABLE(user_id, user_password, user_phone, user_name, user_email, user_address, user_join_date, user_salt)"
    + " VALUES(?, ?, ?, ?, ?, ?, now(), ?)";

    conn.query(sql, datas, function(err, rows){
        if(err){
            console.error("err : " + err);
        }else{
            res.send("<script>"
            + "alert('회원가입이 완료되었습니다.');"
            + "location.replace('/board/community/1')</script>");
        }
        

    });
});


// 로그인 페이지 렌더링
// 페이지 경로는 localhost:3030/user/login
router.get('/login', function(req, res, next){
    var session = req.session;

    res.render('login', {
        title : '로그인',
        session : session
    });
});

// 로그아웃 부분
router.get('/logout', function(req, res, next){

    req.session.destroy(function(){ 
        req.session;
        res.clearCookie('sid'); // 세션 쿠키 삭제
    });
    res.send({
        message : true
    });

});


// 회원가입 페이지 렌더링
// 페이지 경로는 localhost:3030/user/sign
router.get('/sign', function(req, res, next) {
  res.render('sign', { 
    title: '회원가입' 
  });
});


 




// 세션 설정
//app.use(session({
//    secret: 'test123', // 세션의 비밀 키
 //   resave: false, // 세션을 항상 저장할 지 여부
 //   saveUninitialized: true, // 세션이 저장되기 전에 uninitialize상태로 저장.
 //   store: new FileStore()
 // }));





module.exports = router;


//module.exports = function(app){
//    var express = require('express');
//    var router = express.Router();
//    var mariaDB = require('../db/db_conn')();
//    var crypto = require('crypto');
//    var session = require('express-session');
//    var bodyParser = require('body-parser');
//    var conn = mariaDB.init();

//    return router;

//}