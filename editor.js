function onLoad() {
    console.log("Load!");
    createTagSelector();
    createValueSelector();
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

function createTagSelector() {
    console.log("Creating tag selector");
    var newNode = document.createElement("select");
    newNode.setAttribute("name", "element");
    newNode.setAttribute("id", "elem-selector");

    var tags = ["body", "main", "article", "section", "header", "nav", "footer"];
    for (var tag of tags) {
        if (document.querySelectorAll(tag).length > 0)
            newNode.appendChild(getOptionNode(tag));
    }

    var selector = document.querySelector("#elem-selector-menu");
    selector.replaceChild(newNode, selector.children[1]);
}

function getOptionNode(tag) {
    var option = document.createElement("option");
    option.setAttribute("value", tag);
    option.innerHTML = tag;
    return option;
}

function createValueSelector() {
    console.log("Creating value selector");
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
        case "font-family":
            newNode.setAttribute("type", "text");
            newNode.setAttribute("list", "fonts");
            label = "font family";
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

    newNode.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            console.log("[Enter] was pressed");
            document.querySelector("#submit-value-button").click();
        }
    });
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