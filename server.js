var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

let chats = [];
let clients ;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


io.on('connection', function (client) {
  clients = client;
  console.log('Client connected...');
  // console.log(client);
  client.emit('allmsg', chats);

  client.on('join', function (data) {
    console.log(chats);
  });

  client.on('send', function (data) {
    chats.push(JSON.parse(data))
    io.emit('allmsg', chats);
    // console.log(data);
  });



});

app.get('/', (req, res) => {
  io.emit('allmsg',chats);
  res.send('hi');
})

server.listen(3000);
