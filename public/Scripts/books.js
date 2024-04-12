function get(url, callback){
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200){            
            console.log("Response received");
            callback(req.responseText);
            console.log(req.responseText);
        }
    }
    req.send();
}

// Display books i through i + 10
function getBooks(i){
    console.log("Getting books...");
    get('/books.js?page=' + i, displayBooks);
}

function displayBooks(books){
    booksObj = JSON.parse(books);

    console.log("Displaying...");
    var div = document.querySelector("#books");
    div.innerHTML = ''; // Remove children
    for(var book of booksObj){
        var article = document.createElement("article");
        article.setAttribute("class", "book");

        var coverImg = document.createElement("a");
        coverImg.setAttribute("src", book.cover_image);
        article.appendChild(coverImg);

        var text = document.createElement("p");
        text.innerHTML = book.title;
        article.appendChild(text);

        div.appendChild(article);
    }
}

getBooks(1);