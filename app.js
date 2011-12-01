/*jslint vars: false, node: true, nomen: true, sub: true */
/*global */

/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    app = module.exports = express.createServer();

// Configuration

app.configure(function () {
    "use strict";
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    // static is not in dot notation because of JSLint
    app.use(express['static'](__dirname + '/public'));
});

app.configure('development', function () {
    "use strict";
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function () {
    "use strict";
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
