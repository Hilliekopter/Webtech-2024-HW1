// This script is included in every HTML-script itself.

// Within this HTML script, we want to find each of its elements that is included in this list:
// [body, header, footer, aside, articles, sections]
// TODO --

var body = document.querySelector("body");        // should be one      encapsualtes the rest in here
var header = document.querySelector("header");    // should be one
var footer = document.querySelector("footer");    // should be one
var asides = document.querySelectorAll("aside");
var articles = document.querySelectorAll("article");
var sections = document.querySelectorAll("section");

// And if they exist, put them in a menu that allows to change their style.
// (this should change their state or give them a new tag/class/whatever, that changes the style as defined in the CSS)
// TODO --

var size;
function onLoad(){
    size = document.querySelector("#fontSize");
    elem = document.querySelector("#elemSelector");
    console.log("Load!");
}

function setFontSize(){
    console.log("Changing text size to " + size.value);
    console.log("Target element: " + elem.value);

    var selectedElement = document.querySelector(elem.value);
    if (selectedElement != null ){
        document.querySelector(elem.value).style.setProperty('font-size', size.value+'px');
    }
            //document.querySelector(elem.value).style.fontSize = size.value +"px";
}

// BODY
// allow to change dark-mode/light-mode
// Mandatory:  font size & color


// HEADER
// shrink banner, hide banner?
// Mandatory:  font size & color


// FOOTER
// Mandatory:  font size & color
// ..


// ASIDES
// Mandatory:  font size & color
// snap them to the other side of the screen, from right-side to left-side?


// ARTICLES
// Mandatory:  font size & color
// light-mode/dark-mode should be directed by BODY.. but i dont think thats how it'll work in CSS as it overwrites what it inherits?
// dark mode is a black block with white letters.


// SECTION
// ..