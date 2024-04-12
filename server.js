const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bcrypt = require('bcrypt');


// initialize file and check existence
var fs = require("fs");
var dbFile = "./database.db";
var exists = fs.existsSync(dbFile);

var sqlite3 = require("sqlite3").verbose();
let sql;

// connect to DB
const db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

const app = express();
const port = 8022;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// HTTP request log
const logsDir = path.join(__dirname, 'logs');
// create directory if it doesn't exist yet
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}
const logStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream}));

// sendFile will go here
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', async function (req, res) {
  const { uname, password } = req.body;

  console.log("Attemping login...");
  try {
    const user = await getUserByUsername(uname);

    //If password is wrong, return
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch){
      console.log("Login successful");
      res.redirect("/index.html");
    }
    else{
      console.log("Wrong password")
      res.redirect("/login.html");
    }
  }
  catch (err) {
    console.log("Error while logging in: " + err)
    res.redirect("/login.html");
  }
});

// Returns object containing username and password
function getUserByUsername(username) {
  sql = 'SELECT username, password FROM users WHERE username = ?';
  return new Promise((resolve, reject) => {
    db.get(sql, [username], (err, row) => {
      if (err) {
        reject(err);
      }
      if (!row) {
        reject("Username not found in database");
      }
      resolve(row);
    });
  });
}

// signup handler
app.post('/register', async function (req, res) {
  const { fname, lname, email, address, uname, password } = req.body;

  console.log('Attemping sign up');
  try {
    var encryptedPass = await bcrypt.hash(password, 10);
    console.log('Password encryption succesful');
    signup(email, fname, lname, address, uname, encryptedPass);

    console.log('Sign up succesful');
    res.redirect('/login.html');
  }
  catch {
    console.log('Error while signing up');
    res.redirect('/signup.html');
  }
});

// todo: login pagina -> sessions
function signup(mail, firstName, lastName, address, username, password) {
  sql = 'INSERT INTO users VALUES (NULL,?,?,?,?,?,?)';
  console.log("Inserting new user into database");
  db.run(
    sql,
    [mail, firstName, lastName, address, username, password],
    (err) => {
      if (err) return console.error(err.message);
    })
}

app.get('/filming.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'filming.html'));
});

app.use(function (req, res) {
  res.status(404).send("Page not found!");
});

app.get('/books', async function (req, res){
  console.log("Books request received");
  
});



// app.use() // Router gebruiken om tussen pagina's te navigeren

app.listen(port);
console.log('Server started at http://localhost:' + port);

// function login() {
//   var success = false;
//   sql = `SELECT * FROM users WHERE username = '${uname}' and password = '${password}`
//   db.all(sql, (err, rows) => {
//     if (err) {
//       throw err;
//     }
//     // if there is some row for which these are true.
//     if (rows.length > 0) {
//       success = true;
//     }
//   });

//   // so if there are no errors and the username/password are correct
//   //..then there is success.
//   return success;
// }


function queryUser() {
  sql = 'SELECT * FROM users';
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach(row => {
      console.log(row);
    })
  })
}