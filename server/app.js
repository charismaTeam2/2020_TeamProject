var createError = require('http-errors');
var express = require('express'); 
var path = require('path'); 
var cookieParser = require('cookie-parser'); // 쿠키
var session = require('express-session'); // 세션 사용 모듈, 세션 사용 모듈은 오로지 app.js에서만 사용할 것. 다른 곳에서 사용시 이중번복으로 오류.
var FileStore = require('session-file-store')(session); // 세션 파일 스토어
var bodyParser = require('body-parser'); // POST 전송을 위한 모듈.
var fs = require('fs');
var logger = require('morgan');

var app = express();

// 라우터 객체생성
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var mainRouter = require('./routes/main');
var userRouter = require('./routes/user');
var dbRouter = require('./routes/db_test');
//var sellRouter = require('./routes/sell');
var fileUploadRouter = require('./routes/upload');
var boardRouter = require('./routes/board');
var questionRouter = require('./routes/question');
var myRouter = require('./routes/mypage');
var recommendRouter = require('./routes/recommend');
var clothesRouter = require('./routes/clothes');


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


// 이미지 호출하는 부분.
// 간략하게 하기 위해서 다른 방안 구상필요.
////////////////////////////////////////////////////
/*
//1
app.get('/imgs', function(req, res){
  fs.readFile('./upload/4dd1d484164a8f22e173c1132c0690e9', function(error, data){
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.end(data);
  });
});


//2
// user라고 하는 디렉토리를 통해서 사용자들이 파일을 가져가게 하고싶으면
app.use('/user', express.static('uploads'));
// uploads 폴더에서 내가 업로드한 파일에 접근할 수 있다. (웹에서 이미지를 볼 수가 있다.)
*/
//////////////////////////////////////////////////



// view engine setup
app.set('views', path.join(__dirname, 'views'));

// app.set('view engine', 'jade');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));//미들웨어 등록부분
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});


// 라우터 객체 실행.
// user.js에서 실행되는 항목은 반드시, localhost:3030/user/ 로 시작한다.
app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/main', mainRouter);
app.use('/user', userRouter);
app.use('/db', dbRouter);
//app.use('/sell', sellRouter);
app.use('/upload', fileUploadRouter);
app.use('/upload', express.static('upload'));
app.use('/board', boardRouter);
app.use('/question', questionRouter);
app.use('/mypage', myRouter);
app.use('/recommend', recommendRouter);
app.use('/clothes', clothesRouter);

// upload/community를 정적폴더로 사용함으로서 이미지를 불러올 수 있게 함.
// 경로는 http://localhost:3030/board/community/img/(파일명+확장자) 이다.
app.use('/board/community/img', express.static('upload/community'));
app.use('/question/clothes', express.static('upload/clothes'));
app.use('/mypage/upload', express.static('upload'));
app.use('/recommend', express.static('upload/clothes'));
app.use('/clothes', express.static('upload/clothes'));

// 정적경로 추가.
app.use('/board/community/commu_boarding/img', express.static('upload/community'));
app.use('/board/community/commu_boarding/slick', express.static('slick/slick'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
