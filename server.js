var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');
var fs = require('fs');
var app = express();

app.configure(function () {
    //app.set('port', process.env.PORT || 3000);
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(favicon());
    app.use(logger('dev'));
    //app.use(bodyParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());
    app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', users.list);
//app.get('/users/:userId', users.detail);
app.get(/\/users\/(\d*)\/?(edit)?/, function(req, res){
   var message = 'user #' + req.params[0] + ' profile';
    if(req.params[1] === 'edit'){
        message = 'Editing ' + message;
    }else{
        message = 'Viewing ' + message;
    }
    res.send(message);
});
app.post('/users', users.create);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//http.createServer(app).listen(app.get('port'), function () {
    //console.log("Express server listening on port " + app.get('port'));
//});

module.exports = app;
