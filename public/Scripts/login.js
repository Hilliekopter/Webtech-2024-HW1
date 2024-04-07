function login(e) {
    console.log("Login attempt detected.");
    
    var username = document.getElementById("uname").value;
    var password = document.getElementById("password").value;
    var url = "getdata.js?uname="+uname+"&password="+password;

    get(url);   //function to process ajax

    e.preventDefault();
}
document.getElementById("login").addEventListener("submit", login);