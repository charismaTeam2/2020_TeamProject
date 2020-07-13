var express = require('express');
var router = express.Router();
var mariaDB = require('../db/db_conn')();
var conn = mariaDB.init();
var cors = require('cors');

router.post('/submit', function(req, res , next){
    let session = req.session
    let reco_user = session.user // 추천한 유저.
    let user = req.body.id // 추천 받은 유저.
    let select = req.body.select

    let top = req.body.top
    let bottom = req.body.bottom
    /*
    console.log(top);
    console.log(bottom);
    console.log(reco_user);
    console.log(user);
    */
    let sql1 = "SELECT * FROM CLOTHES_TABLE WHERE c_number=?"
    let sql2 = "INSERT INTO RECOMMEND_CODY(user_id, reco_user_id, top_number, top_name, top_image, bottom_number, bottom_name, bottom_image, comment_number)" 
    + " VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"
    
    conn.query(sql1, [top], function(err, c_top){
        if(err){
            console.log(err);
            res.send({
                message : false
            });
        }else{
            conn.query(sql1, [bottom], function(err, c_bottom){
                if(err){
                    console.log(err);
                    res.send({
                        message : false
                    });
                }else{
                    let top_name = c_top[0].c_name
                    let top_image = c_top[0].c_image
                    let bottom_name = c_bottom[0].c_name
                    let bottom_image = c_bottom[0].c_image

                    let datas = [user, reco_user, top, top_name, top_image, bottom, bottom_name, bottom_image, select]
                    console.log(datas);
                    //console.log(c_top);

                    conn.query(sql2, datas, function(err, clothes){
                        if(err){
                            console.log(err);
                            res.send({
                                message : false
                            });
                        }else{
                            res.send({
                                message : true,
                                clothes : clothes
                            })
                        }
                    })
                }

            })

        }
    });
});



router.get('/recommend', function(req, res, next){
    let session = req.session
    let id = session.user

    let sql = "SELECT * FROM RECOMMEND_CODY WHERE user_id=?"

    conn.query(sql, [id], function(err, recommend){
        if(err){
            console.log(err);
        }else{
            res.send({
                session : session,
                recommend : recommend
            });
        }
    });
});




router.get('/', function(req, res, next){
    let session = req.session
    
    res.send({
        session : session
    });
});




module.exports = router;