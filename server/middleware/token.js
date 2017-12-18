var jsonwebtoken = require('jsonwebtoken');
var CONFIG = require('../config.json');
var TOKEN_SECRET = CONFIG.token.secret;

function verifyToken(request, response, next) {
  var token = request.body.token || request.query.token || request.headers['x-access-token'];
  if (token) {
    jsonwebtoken.verify(token, TOKEN_SECRET, function (error, decoded) {
      if (error) {
        response.status(403).json({
          success: false,
          message: 'Invalid Token.'
        });
        return;
      }
      request.decoded = decoded;
      next();
    });

  } else {
    response.status(403).json({
      success: false,
      message: 'No Token Provided.'
    });
  }
}

function getTokenPayload(request) {
  var payload = null;
  var token = request.body.token || request.query.token || request.headers['x-access-token'];
  if (token) {
    payload = jsonwebtoken.decode(token, { complete: true }).payload;
  }
  return payload;
}

function getUsernameFromToken(request) {
  var payload = getTokenPayload(request);
  if (payload) {
    return payload.username;
  }
  return null;
}

module.exports = {
  verifyToken: verifyToken,
  getUsernameFromToken: getUsernameFromToken
};
