const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// api routes
app.use('/users', require('./users/user.controller'));


// start server
const port = 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});