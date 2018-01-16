#!/usr/bin/env node

var WebSocketServer = require("websocket").server;
var http = require("http");

var httpServer = http.createServer();
httpServer.listen(8080);

var webSocketServer = new WebSocketServer({httpServer: httpServer});

webSocketServer.on("request", function (request) {
    var connection = request.accept("echo-protocol", request.origin);
    console.log(`${new Date()} Connection accepted.`);

    connection.on("message", function (message) {
        console.log(`${new Date()} Received Message: ${message.utf8Data}`);
        connection.sendUTF(message.utf8Data);
    });

    connection.on("close", function (reasonCode, description) {
        console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
    });
});
