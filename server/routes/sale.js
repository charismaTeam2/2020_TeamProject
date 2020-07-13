var express = require('express');
var router = express.Router();
var multer = require('multer');
var mariaDB = require('../db/db_conn')();
var fs = require('fs');
var conn = mariaDB.init();
var path = require('path');
var cors = require('cors');
const { resolveSoa } = require('dns');




// 임시. 테스트.
router.get('/boarding/:board_number', function(req, res, next){
    let number = req.params.board_number
    let session = req.session
    //console.log('test');

    // 보안 이슈2
    let sql = "SELECT * FROM SALE_BOARD WHERE s_board_number=?"
    let sql2 = "SELECT * FROM SALE_BOARD_IMAGE WHERE s_board_number=?"
    let sql3 = "SELECT * FROM PRODUCT_TABLE WHERE s_board_number=?"

    conn.query(sql, [number], function(err, board){
        if(err){
            console.log(err);
        }else{
            conn.query(sql2, [number], function(err, image){
                if(err){
                    console.log(err);
                }else{
                    conn.query(sql3, [number], function(err, product){
                        if(err){
                            console.log(err);
                        }else{
                            //console.log(image);
                            //console.log(product);
                            //console.log(board);
                            res.send({
                                session : session,
                                image : image,
                                product : product,
                                board: board
                            });
                        

                        }

                    })

                }
            });
        }
    });
    
});

router.post('/deal_add', function(req, res, next){
    let user = req.body.user
    let product_number = req.body.p_number
    product_number *= 1
    let price = req.body.p_price
    let seller = req.body.seller
    let count = 1;
    let deal_all_price = price * count

    let sql ="INSERT INTO deal_table(deal_count, deal_all_price, deal_request, deal_accept, user_id, seller, product_number) VALUES(?, ?, now(), now(), ?, ?, ?)";
    let datas = [count, deal_all_price, user, seller, product_number]
    //console.log(datas);

    conn.query(sql, datas, function(err, rows){
        if(err){
            console.log(err);
        }else{
            res.send({
                message : true
            });
        }
    })


});


router.post('/restat', function(req, res, next){
    let number = req.body.number
    let stat = req.body.temp_stat
    stat += 1

    let sql = "UPDATE deal_table SET deal_stat =? WHERE deal_number=?"
    //let sql2 = "DELETE TABLE deal_table WHERE deal_number=?"
    let datas = [stat, number]


    conn.query(sql, datas, function(err,rows){
        if(err){
            console.log(err);
        }else{
            res.send({
                message : true
            });

        }
    });

});

router.post('/con', function(req, res, next){
    let session = req.session
    let user = session.user
    let p_number = req.body.number

    //console.log(p_number);
    //console.log(user);

    let sql = "SELECT product_name, product_thum, product_cate, product_color, product_color_name, product_number, product_stock  FROM PRODUCT_TABLE WHERE product_number=?"
    let sql2 = "INSERT INTO clothes_table(c_division, c_name, c_image, c_color_num, c_color, c_stat, user_id)" +
    "VALUES(? ,?, ?, ?, ? ,1 ,?)"
    let sql3 = "UPDATE product_table SET product_stock=? WHERE product_number=?"

    conn.query(sql, [p_number], function(err, product){
        if(err){
            console.log(err);
        }else{
            //console.log(product);
            //let name = product[0][Object.keys(product[0])[0]]
            //console.log(product[0][Object.keys(product[0])[0]]);
            //console.log(product[0][Object.keys(product[0])[1]]);

            let name = product[0][Object.keys(product[0])[0]]
            let image = product[0][Object.keys(product[0])[1]]
            let cate = product[0][Object.keys(product[0])[2]]
            cate *= 1
            let color = product[0][Object.keys(product[0])[3]]
            color *= 1
            let color_name = product[0][Object.keys(product[0])[4]]

            let number = product[0][Object.keys(product[0])[5]]
            let stock = product[0][Object.keys(product[0])[6]]
            stock *= 1
            stock -= 1
            number *= 1
            let datas = [cate, name, image, color, color_name, user]
            //console.log(datas);

            conn.query(sql2, datas, function(err, ta){
                if(err){
                    console.log(err);
                }else{
                    let datas2 = [stock, number]
                    console.log(datas2);

                    conn.query(sql3, datas2, function(err, rs){
                        if(err){
                            console.log(err);
                        }else{
                            res.send({
                                message : true
                            });
                        }
                    });
                }
            })

        }
    });

});



module.exports = router;