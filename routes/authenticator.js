const authenticator = require('express').Router();
const CognitoExpress = require('cognito-express');
const cognitoExpress = new CognitoExpress({
  region: 'eu-west-2',
  cognitoUserPoolId: 'eu-west-2_tVLUSahbs',
  tokenUse: 'access',
  tokenExpiration: 3600000
});
authenticator.use((req, res, next) => {
  let accessTokenFromClient = req.headers.accesstoken;
  if (!accessTokenFromClient)
    return res.status(401).send('Access token missing from header.');
  cognitoExpress.validate(accessTokenFromClient, (err, response) => {
    if (err) return res.status(401).send(err);
    res.locals.user = response;
    next();
  });
});

module.exports = authenticator;
