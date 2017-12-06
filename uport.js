const UportConnect = require('uport-connect');
const Connect = UportConnect.ConnectCore;
const SimpleSigner = UportConnect.SimpleSigner;
const QRUtil = UportConnect.QRUtil;
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var signingkey = "0x048e41da6ef02c0ab8647e6cd96d0a4cd91cd9bb07acc2577a4f439cbe05ebeab7d85abce81524429aab6349384c66116414b90fb70fce8cc05a81a61c2595da20";

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
  socket.on('uport_auth', function (data) {
    const uport = new Connect('SafeHarbor', {
      clientId: '2omA1tdB5RZdBxReNmCT2NexPq4cB7GwWRh',
      network: 'rinkeby',
      signer: SimpleSigner('32269c5d23690b5b9f910d2c6323da63e589fc98026d8adb358bc572ca7288ec')
    });
    var tempkey = data['key'];
    const uriHandler = (uri) => {
      const qrCode = QRUtil.getQRDataURI(uri)
      socket.emit('qr_' + tempkey, { qr: qrCode });
    }
    uport.requestCredentials({
      requested: ['name', 'phone', 'country','email','avatar']
    }, uriHandler).then((credentials) => {
      socket.emit('credentials_' + tempkey, credentials);
    })
  });
  socket.on('disconnect', function () {

  });
});
