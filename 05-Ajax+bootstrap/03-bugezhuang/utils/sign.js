var {appid,secret} = require('../config');
var axios = require('axios');
var sha1 = require('sha1');
var ticketModel = require('../db/models/ticketModel');

// https请求方式: GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

async function getTicket(){ // 获取ticket方法函数

    // // 方案二：存数据库缓存的方式
    // let tik_data = await ticketModel.find();
    // let access_token = '';
    // let ticket = '';
    // if(tik_data.length>0){ // 判断数据库是否存储过ticket
    //     let t = new Date().getTime() - tik_data[0].token_time;
    //     if(t>7000000){ // 是否过期
    //         console.log('过期后重新获取的token', tik_data[0].access_token);
    //         console.log('过期后重新获取的ticket', tik_data[0].ticket);
    //         // 重新获取
    //         await loadData();
    //         let {_id} = tik_data[0];
    //         let time = new Date().getTime();
    //         await ticketModel.update({_id},{ //更新数据库中已过期的access_token
    //             access_token,
    //             token_time: time,
    //             ticket,
    //             ticket_time: time
    //         })
    //     }else{
    //         console.log('从自己的数据库拿token', tik_data[0].access_token);
    //         console.log('从自己的数据库拿ticket', tik_data[0].ticket);
    //         access_token = tik_data[0].access_token;
    //         ticket = tik_data[0].ticket;
    //     }
    // }else{
    //     // 重新获取
    //     await loadData();
    //     let time = new Date().getTime();
    //     await new ticketModel({  // 如果是第一次获取access_token, 则对数据库进行新增操作
    //         access_token,
    //         token_time: time,
    //         ticket,
    //         ticket_time: time
    //     }).save()
    // }

    // async function loadData(){
    //          let tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
    //          let token_data = await axios.get(tokenUrl);
    //          console.log('token_data:', token_data);
    //          access_token = token_data.data.access_token; // 得到access_token
    //          let ticketUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
    //          let ticket_data = await axios.get(ticketUrl); // 得到jsapi_ticket
    //          console.log('ticket_data:', ticket_data);
    //          ticket = ticket_data.data.ticket;
    //          return ticket_data.data.ticket;
    //     }

    //     return {
    //         access_token,
    //         ticket
    //     }
    // }



    //方案一： 以下为数据直接请求的方式获取ticket
    let tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
    let token_data = await axios.get(tokenUrl);
    console.log('token_data:', token_data);
    let access_token = token_data.data.access_token; // 得到access_token
    let ticketUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
    let ticket_data = await axios.get(ticketUrl); // 得到jsapi_ticket
    console.log('ticket_data:', ticket_data);
    return ticket_data.data.ticket;
}

var createNonceStr = function(){ // 生成字符串
    return Math.random().toString(36).substr(2,15);
}
var createTimestamp = function(){ // 生成时间戳
    return parseInt(new Date().getTime()/1000) + '';
}

var row = function(obj){ // url参数处理方法
    var keys = Object.keys(obj);
    keys = keys.sort(); // 字典排序
    var newObj = {};
    keys.forEach((key)=>{
        newObj[key.toLowerCase()] = obj[key]
    })

    var string = '';
    for(var k in newObj){
        string += '&'+k+'='+newObj[k]
    }
    string = string.substr(1);
    return string;
}

var sign = async function(url){ // 生成签名等信息的方法 
    // 方案二
    // let {ticket} = await getTicket();
    // var obj = {
    //     jsapi_ticket: ticket,
    //     nonceStr:createNonceStr(),
    //     timestamp:createTimestamp(),
    //     url
    // }
    // 方案一
    let jsapi_ticket = await getTicket();
    var obj = {
        jsapi_ticket,
        nonceStr:createNonceStr(),
        timestamp:createTimestamp(),
        url
    }
    
    var str = row(obj);
    var  signature = sha1(str); // 生成签名
    obj.signature = signature;
    obj.appId = appid;
    return obj;

    // 1、参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分） 。
    // 2、对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，
    // 3、使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。这里需要注意的是所有参数名均为小写字符。
    // 4、对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义。
}
module.exports = sign;