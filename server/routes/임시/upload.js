var express = require('express');
var router = express.Router();
var mariaDB = require('../db/db_conn')();
var conn = mariaDB.init();


router.get('/', function(req,res,next){
    var session = req.session;

    res.render('board', {
        title : '테스트 보드',
        session : session
    });
});

router.post('/create', function(req, res, next){
    // 같은 name으로 여러개의 정보가 날라오면 '배열'로서 저장된다.
    let tt = req.body.test
    res.send(tt);

    // tt에서 받아온 첫번째 수 출력.
    //res.send(tt[1]);

});

/*
참고용.
// 2. 파일 업로드 처리
router.post('/create', upload.single("imgFile"), function(req, res, next) {
    // 3. 파일 객체
    let file = req.file
    let id = req.body.id


    // 4. 파일 정보
    // 저장되는 폴더가 개발자는 어디 있는지 알 수 있기 때문에, 저장되는 파일의 물리명만 필요하다.
    // 때문에, file.filename 부분이 가장 중요하고, 저장되는 폴더는 개발자의 임의대로 수정한다.
    let result = {
        originalName : file.originalname,
        fileName : file.filename,
    }

    let datas = [id, file.filename]

    let sql = "INSERT INTO TEST(file_name, file_user)"
    + "VALUES(? , ?)"
    
    conn.query(sql, datas, function(err, rows){
        if(err){
            console.error("err : " + err);
        }else{

           res.json(result);
        }
    });
    

});
*/

module.exports = router;