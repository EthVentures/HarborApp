const UportConnect = require('uport-connect');
const Connect = UportConnect.ConnectCore;
const SimpleSigner = UportConnect.SimpleSigner;
const QRUtil = UportConnect.QRUtil;

var signingkey = "0x048e41da6ef02c0ab8647e6cd96d0a4cd91cd9bb07acc2577a4f439cbe05ebeab7d85abce81524429aab6349384c66116414b90fb70fce8cc05a81a61c2595da20";

const uport = new Connect('John O’Sullivan\'s new app', {
     clientId: '2omA1tdB5RZdBxReNmCT2NexPq4cB7GwWRh',
     network: 'rinkeby',
     signer: SimpleSigner('32269c5d23690b5b9f910d2c6323da63e589fc98026d8adb358bc572ca7288ec')
})


const uriHandler = (uri) => {
  const qrCode = QRUtil.getQRDataURI(uri)
  console.log(qrCode);
}

uport.requestCredentials({
  requested: ['name', 'phone', 'country','email','avatar'],
  notifications: true
}, uriHandler).then((credentials) => {
  console.log(credentials);
})
