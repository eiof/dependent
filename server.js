/*global socket*/
/*jslint node: true*/
'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.use(express.static('./public'));

var SocketStream = require('./lib/socket_stream');

io.on('connection', function (socket) {
  return new SocketStream(socket);
});
