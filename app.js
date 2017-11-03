var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();
var server = http.Server(app);

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.sendfile(path.join(__dirname, 'public', 'error.html'));
});

var port = process.env.PORT || 3111;
server.listen(port);
server.on('listening', function() {
    console.log('listening on port ' + port + '...');
});

app.get('/', function (req, res) {
    res.sendfile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
