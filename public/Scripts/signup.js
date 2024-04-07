function signup(e) {
    console.log("Signup attempt detected.");
    
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var uname = document.getElementById("uname").value;
    var password = document.getElementById("password").value;
    // confirm password field & functionality?
    var url = 
    "signup.js?fname="+fname
    +"&lname="+lname
    +"&email="+email
    +"&address="+address
    +"&uname="+uname
    +"&password="+password;

    postSignup(url);   //function to process ajax

    e.preventDefault();
}
document.getElementById("signup").addEventListener("submit", login);

function postSignup(url)
{
    var req = new XMLHttpRequest();

    req.open("POST", url, true);
    req.onreadystatechange = function() {
        // if 'Done' and 'OK'
        if(req.readyState === 4 && req.status === 200 ) {
            alert("Sign-up completed! Now try to log in.");
        }
    }
    req.send();
}