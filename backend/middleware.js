const jwt = require('jsonwebtoken');
const secret = 'protestertoolsecretconnectiontokenAAAABBCDQS';
const database = require('./database.js');
const makeDbQuery = require("./makeDbQuery.js");

const withAuth = function(req, res, next) {
  const token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
    console.log("No token");
  } else {
    jwt.verify(token, secret, async function(err, decoded) {
      if (err) {
        console.log("invalid token");
      } else {
        req.username = decoded.username;
        var result = await makeDbQuery(`select * from login where username=\'${req.username}\'`)
        if (!result[0]){
          res.status(401).send('Unauthorized: Your Username Changed.');
        }
        next();
      }
    });
  }
}

module.exports = withAuth;
