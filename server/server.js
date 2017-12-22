var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var http = require("http");
var mongoose = require('mongoose');
var cors = require('cors')
var CONFIG = require('./config.json');
var TOKEN_SECRET = CONFIG.token.secret;
var TOKEN_EXPIRES = parseInt(CONFIG.token.expiresInSeconds, 10);

var jsonwebtoken = require('jsonwebtoken');

const UportConnect = require('uport-connect');
const Connect = UportConnect.ConnectCore;
const SimpleSigner = UportConnect.SimpleSigner;
const QRUtil = UportConnect.QRUtil;

mongoose.Promise = global.Promise;
mongoose.connect(CONFIG.database.address, { useMongoClient: true, promiseLibrary: global.Promise });

var signingkey = "0x048e41da6ef02c0ab8647e6cd96d0a4cd91cd9bb07acc2577a4f439cbe05ebeab7d85abce81524429aab6349384c66116414b90fb70fce8cc05a81a61c2595da20";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization,Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use('/api/user', require('./routes/users'));
app.use('/api/refugee', require('./routes/refugees'));
app.use('/api/image', require('./routes/images'));

var server = http.createServer(app);

var io = require('socket.io').listen(server);

app.set('io', io);

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
      //onsole.log(credentials['phone']);
      var token = jsonwebtoken.sign({ username: credentials['phone'] }, TOKEN_SECRET, {
        expiresIn: TOKEN_EXPIRES
      });
      credentials['token'] = token;
      socket.emit('credentials_' + tempkey, credentials);
    })
  });
  socket.on('disconnect', function () {

  });
});

io.on('disconnected', function(socket) {
    console.log('Disconnected: ' + socket.id);
});

server.listen(process.env.PORT || CONFIG.server.port, function() {
    console.log('Harbor Server: ', CONFIG.server.port);
});
