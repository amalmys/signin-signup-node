// const config = require('config.json');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/book-a-court';
const connectionOptions = {  useNewUrlParser: true, useUnifiedTopology: true, };
mongoose.connect(url, connectionOptions).then(()=>console.log('mongodb is connected'));
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
};