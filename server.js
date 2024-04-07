const express = require('express');
const path = require('path');

// initialize file and check existence
var fs = require("fs");
var dbFile = "./database.db";
var exists = fs.existsSync(dbFile);

var sqlite3 = require("sqlite3").verbose();
let sql;

// connect to DB
const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err)=>{
  if (err) return console.error(err.message);
});

const app = express();
const port = 8022;
app.use(express.static("public"));

// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// account creation handler?
app.get('/login.html', function(req,res) {
  console.log(req.url);
  res.status(200).send("OK");
  
  res.send( login(username,password) );
 
});

app.get('/filming.html', function(req, res) {
  res.sendFile(path.join(__dirname, 'filming.html'));
});

app.use(function(request, response) {
  response.status(404).send("Page not found!");
});


// app.use() // Router gebruiken om tussen pagina's te navigeren

app.listen(port);
console.log('Server started at http://localhost:' + port);

function login()
{
  var success = false;
  sql = `SELECT * FROM users WHERE username = '${uname}' and password = '${password}`
  db.all(sql, (err, rows) => {
    if(err){
      throw err;
    }
    // if there is some row for which these are true.
    if(rows.length>0){
      success = true;
    }
  });

  // so if there are no errors and the username/password are correct
  //..then there is success.
  return success;
}


function queryUser()
{
  sql = 'SELECT * FROM users';
  db.all(sql,[],(err,rows) => {
    if (err) return console.error(err.message);
      rows.forEach(row => {
        console.log(row);
      })
  })
}

// todo: login pagina -> sessions
function signup (id, mail, firstName, lastName, address, username, password)
{
  sql = 'INSERT INTO users(userID,email,first_name,last_name,address,username,password) VALUES (?,?,?,?,?,?,?)'
  db.run(
    sql, 
    [id, mail, firstName, lastName, address, username, password], 
    (err) => {
    if (err) return console.error(err.message);
  })
}