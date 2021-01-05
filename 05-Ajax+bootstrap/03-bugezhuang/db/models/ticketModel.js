// 在云数据库中缓存access_token 与 jsapi_ticket
var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({  // 表结构对象
    access_token: String,
    token_time: String, // 存取token时间
    ticket: String,
    ticket_time: String
});

var ticketModel = mongoose.model('ticketModel', ticketSchema); // 操作表结构对象的数据模型

module.exports = ticketModel;