const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const sha1 = require('sha1')
const withAuth = require('./middleware');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const database = require('./database.js');

const PORT = 3001

function makeDbQuery(query) {
  return new Promise(function(resolve, reject) {
    database.db.query(query, function (err, rows, fields){
      if (err) {
        console.log("error while executing the query : " + err)
        return reject(err);
      }
      resolve(rows);
    })
  })
}

async function createServer () {
  await database.connect().connect();

  // See https://github.com/exegesis-js/exegesis/blob/master/docs/Options.md
  const options = {
    controllers: path.resolve(__dirname, './controllers'),
    allowMissingControllers: false
  };

  const app = express();

  const secret = "protestertoolsecretconnectiontokenAAAABBCDQS"

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use(cors());

  // Handle any unexpected errors
  app.use((err, req, res, next) => {
    res.status(500).json({ message: `Internal error: ${err.message}` });
    console.log('500 Internal error: ' + err.message);
  });

  app.post('/register', async function(req, res) {
    const { username, password } = req.body;
    const query = `insert into login (username, password) values('${username}', '${sha1(password)}')`
    var result = await makeDbQuery(query);
  });

  app.post('/authenticate', async function(req, res) {
    const { username, password } = req.body;

    var result = await makeDbQuery(`select * from login where username=\'${username}\'`)

    if (!result[0]) {
      console.log("Incorrect username or password")
      res.status(401)
        .json({
        error: 'Incorrect username or password'
      });
    } else if (result[0].password != sha1(password)) {
      console.log("Incorrect password")
      res.status(401)
        .json({
        error: 'Incorrect password'
      });
    } else {
      const payload = { username };
      const token = jwt.sign(payload, secret, {
        expiresIn: '30d'
      });
      res.json({
        success: true,
        message: "Authentication successful",
        token
      })
      //res.cookie('token', token, { httpOnly: true }).sendStatus(200);
    }

  })

  app.post('/checkToken', withAuth, function(req, res) {
    console.log("test")
    res.sendStatus(200);
  });

  // Return a 404
  app.use((req, res) => {
    console.log('404 not found');
    res.status(404).json({ message: `Not found` });
  });

  const server = http.createServer(app);

  return server;
}

createServer()
  .then(server => {
    server.listen(PORT);
    console.log(`Listening on port ${PORT}`);
  })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  });
