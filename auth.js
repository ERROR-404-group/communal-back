'use strict';

// import JSON web token packages
const jwt = require ('jsonwebtoken');
const jwksClient = require ('jwks-rsa');

// jwks URI, must add to deployed server env
const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key){
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function verifyUser(req, errorFirstOrUserCallbackFunction){
  try {
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    jwt.verify(token, getKey, {}, errorFirstOrUserCallbackFunction)
  } catch (error) {
    errorFirstOrUserCallbackFunction('not authorized');
  }
}

module.exports = verifyUser;