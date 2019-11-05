const authenticator = require('express').Router();
const CognitoExpress = require('cognito-express');
const cognitoExpress = new CognitoExpress({
  region: 'eu-west-2',
  cognitoUserPoolId: 'eu-west-2_tVLUSahbs',
  tokenUse: 'access',
  tokenExpiration: 3600000
});
authenticator.use((req, res, next) => {
  console.log(req.headers);
  let accessTokenFromClient = req.headers.accesstoken;
  if (!accessTokenFromClient)
    return res.status(401).send('Access token missing from header.');
  cognitoExpress.validate(accessTokenFromClient, (err, response) => {
    if (err) return res.status(401).send(err);
    res.locals.user = response;
    next();
  });
});

// const aws_exports = {
//   identityPoolId: 'eu-west-2:a79fa191-da7c-4c3b-bf78-3a22c1f5b693',
//   region: '',
//   userPoolId: '',
//   userPoolWebClientId: 'c8u6m0a8edelct1bchvrhdl0v'
// };
module.exports = authenticator;
