const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const sha1 = require('sha1')
const withAuth = require('./middleware');
const withAuthAdmin = require('./middlewareAdmin');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const database = require('./database.js');
const makeDbQuery = require("./makeDbQuery.js");

const PORT = 3001

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

  app.post('/changePassword', withAuth, async function(req, res) {
    const { oldPassword, newPassword } = req.body;
    const { username } = req;
    var result = await makeDbQuery(`select * from login where username=\'${username}\'`)

    if(!result[0]) {
      res.status(401)
        .json({
        error: 'An error occured, please relog.'
      });
    } else {
      if (result[0].password != sha1(oldPassword)) {
        res.status(401)
          .json({
          error: 'The old password value and your current password doesn\'t match.'
        });
      } else {
        var query = `update login set password=\'${sha1(newPassword)}\' where id=${result[0].id}`
        var result = await makeDbQuery(query)
        res.status(200)
          .json({
          success: true
        });
      }
    }

  })

  app.post('/register', async function(req, res) {
    const { username, password, rank, admin } = req.body;
    const querySelect = `select * from login where username=\'${username}\'`
    var resultSelect = await makeDbQuery(querySelect);
    if (resultSelect[0]){
      res.status(401)
        .json({
        error: 'Username already exists.'
      });
    }
    const query = `insert into login (username, password, rank_id, is_admin) values('${username}', '${sha1(password)}', ${rank}, ${admin})`
    var result = await makeDbQuery(query);
    res.status(200)
        .json({
          success: true
        });
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

  app.get('/getAllRank', async function(req, res) {
    var query = `select * from rank`;
    var result = await makeDbQuery(query);
    res.json(result);
  })

  app.post('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
  });

  app.get('/getAllUsers', async function(req, res) {
    var query = `select id, username, rank_id, is_admin, banned from login`;
    var result = await makeDbQuery(query);
    res.json(result);
  })

  app.post('/resetPassword', async function(req, res) {
    const {id} = req.body;
    var query = `update login set password=\'${sha1("changeit")}\' where id=${id}`;
    await makeDbQuery(query);
    res.json({"success": true});
  })

  app.post('/banAcc', async function(req, res) {
    const {id, value} = req.body;
    var query = `update login set banned=${value} where id=${id}`;
    await makeDbQuery(query);
    res.json({"success": true});
  })

  app.post('/saveAcc', async function(req, res) {
    const {id, username, rank_id, is_admin} = req.body;
    var query = `update login set username=\'${username}\', rank_id=${rank_id}, is_admin=${is_admin} where id=${id}`;
    await makeDbQuery(query);
    res.json({"success": true});
  })

  app.post('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
  });

  app.post('/checkTokenAdmin', withAuthAdmin, function(req, res) {
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
