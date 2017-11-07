var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var http = require('http');
var socketio = require('socket.io');
var db = require('./db/dbConnection');
var passport = require('passport');

var roomsApi = require('./api/rooms');
var setSocket = require('./socketSettings');
var authApi = require('./auth/auth.js');

var app = express();
var server = http.Server(app);
var io = socketio(server);

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon1.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

require('./auth/passport')(passport);

//Cookie and session
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(session({ secret: 'AiQlvTad3d' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/rooms', roomsApi);
authApi(app, passport);
setSocket(io);

db.sequelize.authenticate()
    .then(function() {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.error('Unable to connect to the database:', err);
    });

var port = process.env.PORT || 3111;
server.listen(port);
server.on('listening', function() {
    console.log('listening on port ' + port + '...');
});

// serve index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
