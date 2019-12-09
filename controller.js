const http = require('http');

const service = require("./service");

module.exports = http.createServer((req, res) => {
    if(req.url === "/") {
        service.homeRoute(res);
    } else if (req.url === "/logs") {
        service.logsRoute(res);
    } else {
        service.logsRouteWithFilters(req,res);
    }
});