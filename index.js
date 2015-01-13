/* global require, process, __dirname, console */
require("newrelic");
var Express = require("express"),
    newrelic = require("newrelic"),
    compression = require("compression"),
    jade = require("jade"),
    port = Number(process.env.PORT || 5000),
    server = new Express(),
    /*
        1,000 milliseconds/second *
        60 seconds/minute *
        60 minutes/hour *
        24 hours/day *
        365 days/year =
        1 year
    */
    maxAge = 1000 * 60 * 60 * 24 * 365,
    directory = __dirname + (server.settings.env === "production" ? "/build" : "/public");

server.locals.newrelic = newrelic;

server.use(compression());
server.use(Express.static(directory, { maxAge: maxAge }));

server.set("views", __dirname + "/views");
server.engine("jade", jade.__express);

server.get("/", function (request, response) {
    "use strict";
    response.render("index.jade");
});

server.listen(port);
console.log("Server listening on port " + port);
