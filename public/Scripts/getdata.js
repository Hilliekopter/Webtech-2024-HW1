// Credit: slides 10 from lectures
function get(url) {
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