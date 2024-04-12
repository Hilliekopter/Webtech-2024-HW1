function httpGet(url, callback){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        console.log("Response received");
        if (req.readyState == 4 && req.status == 200)
            callback(req.responseText);
    }
    req.open("GET", url, true);
    req.send(null);
}

// Display books i through i + 10
function getBooks(i){
    console.log("Getting books...");
    httpGet('/books', displayBooks(books));
}

function displayBooks(books){
    var div = document.querySelector(".books");
    for(var book of books){
        var article = document.createElement("article");
        article.setAttribute("class", "book");

        var coverImg = document.createElement("a");
        coverImg.setAttribute("src", book.cover_image);
        article.appendChild(coverImg);

        div.appendChild(article);
    }
}

getBooks(0);