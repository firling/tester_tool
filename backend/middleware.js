const jwt = require('jsonwebtoken');
const secret = 'protestertoolsecretconnectiontokenAAAABBCDQS';

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
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
        console.log("invalid token");
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
}

module.exports = withAuth;
