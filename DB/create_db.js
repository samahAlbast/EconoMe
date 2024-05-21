var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "samah"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  /*Create a database named "mydb":*/
  con.query("CREATE DATABASE IF NOT EXISTS econome", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});
