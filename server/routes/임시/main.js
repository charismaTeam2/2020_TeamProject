var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  let session = req.session;
  res.render('main', { 
    title: '메인',
    session : session
  });
});

router.get('/imgs', function(req, res, next) {
  fs.readFile('./upload/4dd1d484164a8f22e173c1132c0690e9', function(error, data){
      res.writeHead(200, { 'Content-Type': 'text/html'});
      res.end(data);
  });
});

module.exports = router;