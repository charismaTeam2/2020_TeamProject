const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
//var path = require('path'); 
var cookieParser = require('cookie-parser'); // 쿠키
var session = require('express-session'); // 세션 사용 모듈, 세션 사용 모듈은 오로지 app.js에서만 사용할 것. 다른 곳에서 사용시 이중번복으로 오류.
var fs = require('fs');
var headers = { withCredentials: true };
var proxy = require('http-proxy-middleware');
var cors = require('cors'); // 앱 cors 문제를 해결하기 위해서 모듈 설치 필요.
var PythonShell = require('python-shell');

var mariaDB = require('./db/db_conn')();
var conn = mariaDB.init();

// 라우터 객체생성
var userRouter = require('./routes/user');
var mainRouter = require('./routes/board');
var myRouter = require('./routes/mypage');
var clothesRouter = require('./routes/clothes');
var codyRouter = require('./routes/cody');
var recommendRouter = require('./routes/recommend');
var saleRouter = require('./routes/sale');


//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));//미들웨어 등록부분



// 세션 설정
// 세션 설정 부분이 객체 실행 보다 아래에 있을 경우. 세션을 인지하지 못하여 에러가 뜸.
app.use(session({
  key: 'sid',
  secret: 'test123', // 세션의 비밀 키
  resave: false, // 세션을 항상 저장할 지 여부
  saveUninitialized: true, // 세션이 저장되기 전에 uninitialize상태로 저장.
  cookie:{
    maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간.
  }
}));


// 라우터 객체 실행.
// user.js에서 실행되는 항목은 반드시, localhost:3030/user/ 로 시작한다.
app.use('/user', userRouter);
app.use('/board', mainRouter);
app.use('/mypage', myRouter);
app.use('/clothes', clothesRouter);
app.use('/cody', codyRouter);
app.use('/recommend', recommendRouter);
app.use('/sale', saleRouter);


app.use(cors());


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.send('error');
  });



app.listen(port, () => console.log(`server on ${port}`));

module.exports = app;