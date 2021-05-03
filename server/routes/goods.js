var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../modules/goods');
mongoose.connect('mongodb://127.0.0.1:27017/mon')
mongoose.connection.on('connected', function () {
    console.log("succesion")
})
router.get("/list", function (req, res, next) {
    //  var goo=   new Goods({
    //         title: 'abs',
    //         name:'sfgg',
    //        type:'book'
    //     })
    //     goo.save((err, result) => {

    //     })
    let page = parseInt(req.param("page"))//param获取到的参数都是字符串。skip，limit需要的是数字需要转换
    let pageSize = parseInt(req.param("pageSize"))
    let skip = (page - 1) * pageSize
    let priceLevel = req.param("priceLevel")
    let params = {}
    let sort = req.param("sort")
    if (priceLevel != "all") {
        switch (priceLevel) {
            case "0": priceGt = -1; priceLte = 100; break;
            case "1": priceGt = 100; priceLte = 500; break;
            case "2": priceGt = 500; priceLte = 1000; break;
            case "3": priceGt = 1000; priceLte = 5000; break;
        }
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
    goodsModel.sort({ 'salePrice': sort })
    goodsModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: 1,
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    length: doc.length,
                    list: doc
                }
            })
        }
    })


})
//加入到购物车
router.post("/addCart", function (req, res, next) {
    var userName = req.cookies.userName
    var productName = req.body.productName
    var usr = require('../modules/users.js')
//     const u = new usr({
//         "userId" : '100000077',
//         "userName" : 'aa',
//         "userPwd" : 'xdf',
//         "orderList":[],
//         "carList" : [
//             {
//                 "productId" : '201710007',
//                 "productName" : '自拍杆',
//                 "salePrice" : '49',
//                 "productImage" :' hgjgj',
//                 "checked" : '1',
//                 "productNum" :'1'
//             }
//         ],
//         "addressList" : []
//     })
// u.save(function (err, doc) {
//     if (err) {
//         res.json({
//             status: 1,
//             msg: err.message
//         })
//     } else {
//         res.json({
//             status: 0,
//             result: 'succesion'
//         }

//         )
//     }
// })

usr.findOne({ userName: userName }, function (err, usrdoc) {
    console.log("/goods/cart:userid"+usrdoc)
     if (err) {
           res.json({
                 status: 1,
                 msg: err.message
             }) 
         } else {         
                 let goodsItem = ''
                 if ( usrdoc.cartList) {
                     usrdoc.cartList.forEach((item) => {
                         if (item.productName == productName) {
                             goodsItem = item
                             item.productNum++
                             
                         }
                     }
                     )};
                 
         
         
           
          
                 if (goodsItem) {
                     usrdoc.save(function (err, doc) {
                         if (err) {
                             res.json({
                                 status: 1,
                                 msg: err.message
                             })
                         } else {
                             res.json({
                                 status: 0,
                                 result: 'succesion'
                             }
    
                             )
                         }
                     })
                 }
    
              else {
                 Goods.findOne({ productName: productName }, function (err1, goodsdoc) {
                    
                    if (err1) {
                         res.json({
                             status: 1,
                             msg: err1.message
                         })
                     } else {
                         if (goodsdoc) {
                            goodsdoc.productNum = '1'
                            goodsdoc.checked = 1
                            usrdoc.cartList.push(goodsdoc)
                            usrdoc.save(function (err2, doc) {
                                if (err2) {
                                    res.json({
                                        status: 1,
                                        msg: err2.message
                                    })
                                } else {
                                    res.json({
                                        status: 0,
                                        result: 'succesion'
                                    }
        
                                    )
                                }
                            })
                         }
                      
                     }
                 })
             }
  
         }
     }
                  )

    })
router.get("/details",function (req, res, next) {
     var productName=req.query.productName;
     Goods.findOne({productName:productName},function (err,doc) {
         if (err) {
            res.json({
                status: 1,
                msg: err.message
            })
         } else {
            res.json({
                status: 0,
                msg: '',
                result:{
                    productImage:doc.productImage,
                    salePrice:doc.salePrice,
                    productUrl:doc.productUrl
                }
            })
         }
     })
 })   
 router.get("/school",function (req, res, next){
    var sc=req.query.item;
    console.log(sc);
    
    var list=[];
    Goods.find( function (err,doc) {
        if (err) {
           res.json({
               status: 1,
               msg: err.message
           })
        } else {

            // if(doc.purl==='true'){
            //     list.push(doc)
            // }
            list.push(doc)
          
            var kecheng=[]
            if (sc==='ke') {
                doc.forEach(item=>{
                //   console.log(item.purl);
                    if (item.purl==='true') {
                        kecheng.push(item)
                        console.log('true');
                    }
                    if (item.salePrice===0) {
                        kecheng.push(item)
                    }
                })
        
                res.json({
                    status: 1,
                    msg: '',
                    result:kecheng
                })
            }
            var shopin=[]
            if (sc==='pin') {
            doc.forEach((item)=>{
                    if (item.salePrice!=0 && item.purl==='false') {
                        shopin.push(item)
                    }
                })
        
                res.json({
                    status: 1,
                    msg: '',
                    result:shopin
                })
            }
        }
    })
   
   
})
router.get("/count",function (req, res, next){
    var productName=req.query.name;
    Goods.findOne({productName:productName},function (err,doc) {
        if (err) {
           res.json({
               status: 1,
               msg: err.message
           })
        } else {
            var count = doc.count
            console.log(doc);
           res.json({
               status: 0,
               msg: '',
               result:doc

           })
        }
    })
})
module.exports = router;