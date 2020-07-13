var express = require('express');
var router = express.Router();


router.post('/sell_register', function(req, res, next){
  
  
});


/* GET home page. */
router.get('/', function(req, res, next) {
  let session = req.session;
  res.render('sell_board', { 
    title: '판매 페이지',
    session : session
  });
});


router.get('/sell_register', function(req, res, next){
  let session = req.session;
  res.render('sell_register', { 
    title: '판매 등록',
    session : session
  });
});



module.exports = router;