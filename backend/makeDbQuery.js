const database = require('./database.js');

const makeDbQuery = function(query) {
  return new Promise(function(resolve, reject) {
    database.db.query(query, function (err, rows, fields){
      if (err) {
        console.log("error while executing the query : " + err);
        return reject(err);
      }
      resolve(rows);
    })
  })
};

module.exports = makeDbQuery;
