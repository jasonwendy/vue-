var express = require('express');
var router = express.Router();
var user = require("./../modules/users");
require('./../util/util')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', function (req, res, next) {
  var username = req.body.username,
    userpwd = req.body.userpwd;
  var ran = Math.random() * 8;
  var userId = ran.toString().split('.')[1] + new Date().getMilliseconds();

  user.findOne({ 'userName': username }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '2',
          msg: '用户名已存在',
          result: ''
        })
      } else {
        var aus = user.create({
          "userId": userId,
          "userName": username,
          "userPwd": userpwd,
          "orderList": [],

        })
        console.log(aus);
        res.send({
          status: '0',
          msg: '',
          result: 'suc'
        })
        //  user.save((err,result)=>{
        //    if (err) {
        //      res.json({
        //        status:'1',
        //        msg:err.message,
        //        result:''
        //      })
        //    }else{
        //      res.json({
        //        status:'0',
        //        msg:'',
        //        result:'suc'
        //      })
        //    }
        //  })
      }
    }
  })




})

router.post("/login", function (req, res, next) {
  var param = {
    userName: req.body.username,
    userPwd: req.body.userpwd
  }
  user.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })

    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 100 * 60 * 60
        })
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 100 * 60 * 60
        })
        res.json({
          status: '0',
          msg: '',
          result: {
            username: doc.userName
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '',
          result: ''
        })
      }

    }

  })
})
router.post("/logout", function (req, res, next) {
  res.cookie("userName", "", {
    path: "/",
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: "",
    result: ''
  })
})
router.get('/checkLogin', function (req, res, next) {

  if (req.cookies.userName) {
    console.log('checklogin' + req.cookies.userName)
    res.json({
      status: 0,
      msg: '',
      result: req.cookies.userName || ''
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})
router.get('/cartList', function (req, res, next) {
  var userName = req.cookies.userName;
  user.findOne({ userName: userName }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})
router.get("/orderlist",function (req, res, next){
  var userName = req.cookies.userName;
  user.findOne({ "userName": userName }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        var olist=[];
        doc.orderList.forEach((item) => {
          item.goodList.forEach((item=>{
            olist.push(item)
          }))
         
      })
        res.json({
          status: '0',
          msg: '',
          result: olist
        })
      }
    }
  })
})
router.post('/cartDel', function (req, res, next) {
  var userName = req.cookies.userName, productId = req.body.productId;
  user.update({
    userName: userName
  }, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  })
});
router.post('/cartEdit', function (req, res, next) {
  var userName = req.cookies.userName,
    productId = req.body.productId,
    productNum = req.body.productNum,
    checked = req.body.checked;
  user.update({ "userName": userName, "cartList.productId": productId }, {                      // 修改的数据
    "cartList.$.productNum": productNum,
    "cartList.$.checked": checked
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  })

})
router.post('/check', function (req, res, next) {
  var userName = req.cookies.userName,
    checked = req.body.flag ? '1' : '0';
  user.findOne({ userName: userName }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }
    else {
      user.findOne({ userName: userName }, function (err, doc) {
        if (err) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        } else {
          if (doc) {
            doc.cartList.forEach((item) => {
              item.checked = checked;
            })
            doc.save(function (err1, doc1) {
              if (err1) {
                res.json({
                  status: '1',
                  msg: err.message,
                  result: ''
                })
              } else {
                res.json({
                  status: '0',
                  msg: '',
                  result: 'suc'
                })
              }
            })




          }
        }
      })
    }
  })
});
router.get("/addressList", function (req, res, next) {
  console.log(req.cookies.userName);

  var userName = req.cookies.userName;
  user.findOne({ userName: userName }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: 'suc',
        result: doc.addressList
      })
    }
  })
})
router.post("/addAddress", function (req, res, next) {
  var streetName = req.body.streetName,
    postCode = req.body.postCode,
    tel = req.body.tel,
    isDefault = req.body.false,
    userName = req.body.username;
  var ran = Math.random() * 8;
  var addressId = ran.toString().split('.')[1] + new Date().getMilliseconds();
  user.findOne({ userName: req.cookies.userName }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      var list = {
        addressId: addressId,
        userName: userName,
        streetName: streetName,
        postCode: postCode,
        tel: tel,
        isDefault: isDefault
      }
      doc.addressList.push(list);
      doc.save(function (err1, doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        } else {
          res.json({
            status: "0",
            msg: '',
            result: 'suc'
          })
        }
      })
    }
  })

})

router.post("/setDefult", function (req, res, next) {
  var userName = req.cookies.userName,
    addressId = req.body.addressId;
  if (!addressId) {
    res.json({
      status: '1003',
      msg: 'addressId is null',
      result: ''
    })
  } else {
    user.findOne({ userName: userName }, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        var addressList = doc.addressList;
        addressList.forEach((item) => {
          if (item.addressId == addressId) {
            item.isDefault = true;
          } else {
            item.isDefault = false;

          }
        })
        doc.save(function (err1, doc1) {
          if (err) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: ''
            })
          }
        })
      }
    })
  }
})
router.post("/delAddress", function (req, res) {
  var userName = req.cookies.userName,
    addressId = req.body.addressId;
  user.update({
    userName: userName
  }, {
    $pull: {
      'addressList': {
        'addressId': addressId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      });
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      });
    }
  })
})
router.post("/payMent", function (req, res, next) {
  var userName = req.cookies.userName,
    addressId = req.body.addressId,
    orderTotal = req.body.orderTotal;
  user.findOne({ userName: userName }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      var address = '', goodList = [];
      doc.addressList.forEach((item) => {
        if (addressId == item.addressId) {
          address = item;
        }
      })
      doc.cartList.filter((item) => {
        if (item.checked == '1') {
          goodList.push(item);
        }
      })

      var platform = '622'; // 平台系统架构码
      var r1 = Math.floor(Math.random() * 10);
      var r2 = Math.floor(Math.random() * 10);

      var sysDate = new Date().Format('yyyyMMddhhmmss');  // 系统时间：年月日时分秒
      var orderId = platform + r1 + sysDate + r2;
      var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
      var order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodList: goodList,
        orderStatus: '1',
        createDate: createDate
      }
      doc.orderList.push(order);
      doc.save(function (err1, doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        } else {
          res.json({
            status: "0",
            msg: '',
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          })
        }
      })
    }
  })
})
router.get("/orderDetail", function (req, res, next) {
  var userName = req.cookies.userName,
    orderId = req.query.orderId;
  orderTotal = 0;
  console.log(req.params);

  user.findOne({ userName: userName }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      doc.orderList.forEach((item) => {
        if (item.orderId == orderId) {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderTotal: item.orderTotal,

            }
          })
        }
      })
    }

  })
})
router.get("/getCartCount", function (req, res, next) {
  if (req.cookies && req.cookies.userName) {
    var userName = req.cookies.userName;
    user.findOne({ "userName": userName }, function (err, doc) {
      if (err) {
        res.json({
          status: "0",
          msg: err.message
        });
      } else {
        let cartList = doc.cartList;
        let count = 0;
        cartList.map(function (item) {
          count += parseFloat(item.productNum)
        })
        res.json({
          status: 0,
          msg: "",
          result: count
        })
      }
    })
  } else {
    res.json({
      status: "0",
      msg: "当前用户不存在"
    })
  }
})

module.exports = router;
