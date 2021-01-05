const mongoose = require('mongoose');
// var {mongoip} = require('../config'); 将127.0.0.1替换
mongoose.connect('mongodb://127.0.0.1:27017/wenxin',(err)=>{
    if(err){
        console.log('数据库连接失败~');
    }else{
        console.log('数据库连接成功~');
    }
})