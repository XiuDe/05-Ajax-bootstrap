var express = require('express');
var router = express.Router();
var UserModel = require('../db/models/UserModel');
var sha1 = require('sha1');
var sign = require('../utils/sign');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '补个妆' });
});

router.get("/auth", function (req, res) {
  // 验证微信授权
  console.log('微信授权req.query', req.query);
  let {signature,timestamp,nonce,echostr} = req.query;
  let token = 'testweixin'; // 随机且不易被猜到
  let array = [timestamp, nonce, token];
  array.sort() // 字典排序
  let str = array.join('');
  let resultStr = sha1(str); // 对字符串进行sha1加密
  if(resultStr === signature){
    res.set('Content-Type','text/plain');// 防止输出send的echostr为html
    res.send(echostr);
    console.log('验证微信授权成功~');
  }else{
    res.send('Token Error');
  }

});

// 
router.get('/jsapi',async function(req,res){
  let url = decodeURIComponent(req.query.url);
  let conf = await sign(url);
  console.log('conf',conf);
  // res.send(conf);
})


// 用户注册信息写入数据库
router.post("/reg", function (req, res) {
  console.log(req.body) // 接收前端通过post提交的数据
  let {user, pwd} = req.body;
  // 使用mongoose提供的方案， 将user与pwd存储至数据库
  new UserModel({ // 一条具体的数据
    user: user,
    pwd: pwd
  }).save().then(()=>{
    res.send({code:1,msg:'注册成功'})
  })
});
// 

module.exports = router;
