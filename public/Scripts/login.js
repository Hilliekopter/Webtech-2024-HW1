function login(e) {

    var uname = document.getElementById("uname").value;
    var password = document.getElementById("password").value;
    
    var url = "login.js?uname="+uname+"&password="+password;

    getLogin(url);   //function to process ajax

    e.preventDefault();
}
document.getElementById("login").addEventListener("submit", login);

// Credit: slides 10 from lectures
function getLogin(url) {
    var req = new XMLHttpRequest();

    req.open("GET", url, true);
    req.onreadystatechange = function() {
        // if 'Done' and 'OK'
        if(req.readyState === 4 && req.status === 200 ) {
            alert("Login success. Welcome, " + req.responseText);
        }
    }
    req.send();
}
