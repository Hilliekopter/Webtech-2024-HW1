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

function onLoad() {
    console.log("Load!");
    createValueSelector();

    document.querySelector("#value-selector").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            document.querySelector("#submit-value-button").click();
        }
    });
}

function setPropertyToElement() {
    var tag = document.querySelector("#elem-selector").value;
    var property = document.querySelector("#property-selector").value;
    var value = document.querySelector("#value-selector").value;

    var selectedElements = document.querySelectorAll(tag);
    if (selectedElements.length <= 0) {
        console.log("ERROR: element not found");
        return;
    }

    for (var selectedElement of selectedElements) {
        if (property == "font-size")
            selectedElement.style.setProperty(property, value + "px");
        else
            selectedElement.style.setProperty(property, value);

        console.log("Changed " + tag + " " + property + " to " + value);
    }
}

function createValueSelector() {
    var property = document.querySelector("#property-selector").value;

    var label;
    var newNode = document.createElement("input");
    newNode.setAttribute("id", "value-selector");
    newNode.setAttribute("name", "value-selector");
    switch (property) {
        case "font-size":
            newNode.setAttribute("type", "number");
            newNode.setAttribute("value", "16");
            label = "font size";
            break;
        case "color":
            newNode.setAttribute("type", "color");
            label = "text color";
            break;
        case "background-color":
            newNode.setAttribute("type", "color");
            label = "background color";
            break;
    }

    var selector = document.querySelector("#value-selector-menu");
    selector.children[0].innerHTML = "Select " + label + ": ";
    selector.replaceChild(newNode, selector.children[1]);

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