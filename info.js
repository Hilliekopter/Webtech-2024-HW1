const { auth } = require("node-red");

window.addEventListener("load", setupInfo());

// Possible issues:
// 1. Setters in classes might nog be necessary, since they are just 
// data containers.
// 2. Constructors get very large, so maybe not everything should 
// already have to be defined in the constructor.
function setupInfo() {
    
}




class CreativeWork {
    #title;
    #creationYear;
    #authors;

    get title() {
        return this.#title;
    }
    
    set title(value) {
        if(typeof value !== 'string') {
            throw new Error('Title must be a string!');
        }
        this.#title = value;
    }

    get creationYear() {
        return this.#creationYear;
    }

    set creationYear(value) {
        if(Number.isInteger(value)) {
            throw new Error('Creation year must be an integer!');
        }
        
        // This might be a bad idea to not allow, 
        // since someone might want to list a book that will release next year.
        if(value > new Date().getFullYear()) {
            throw new Error('Creation year can not be in the future!');
        }
        
        this.#creationYear = value;
    }

    get authors() {
        return this.#authors;
    }

    set authors(value) {
        if(!Array.isArray(value)) {
            throw new Error('Authors must be an array!');
        } 
        
        Array.every(item => {
            if(!item instanceof Author) {
                throw new Error('Not all elements in array are of type Author');
            }
        });

        this.#authors = value;
    }

    constructor(title, creationYear, authors) {
        this.title = title;
        this.creationYear = creationYear;
        this.authors = authors;
    }
}

class Book extends CreativeWork {
    #genre; // String
    #publisher; // Publisher class
    #cover; // link to an image
    #plot; // String

    get genre() {
        return this.#genre;
    }

    set genre(value) {
        if(value !== 'string'){
            throw new Error('Genre must be a String!');
        }

        this.#genre = value;
    }

    get publisher() {
        return this.#publisher;
    }

    set publisher(value) {
        if(!(value instanceof Publisher)) {
            throw new Error('Publisher must be of type Publisher!');
        }
    }

    get cover() {
        return this.#cover;
    }

    set cover(value) {
        if(!this.#isUriImage(value)) {
            throw new Error('Cover must link to an actual image! (jpg, jpeg, tiff, png, gif, bmp) ');
        }
        this.#cover = value;
    }

    #isUriImage(uri) {
        //make sure we remove any nasty GET params 
        uri = uri.split('?')[0];
        //moving on, split the uri into parts that had dots before them
        var parts = uri.split('.');
        //get the last part ( should be the extension )
        var extension = parts[parts.length-1];
        //define some image types to test against
        var imageTypes = ['jpg','jpeg','tiff','png','gif','bmp'];
        //check if the extension matches anything in the list.
        if(imageTypes.indexOf(extension) !== -1) {
            return true;   
        }
    }

    get plot() {
        return this.#plot;
    }

    set plot(value) {
        if(value !== 'string') {
            throw new Error('Plot must be of type String');
        }

        this.#plot = value;
    }

    constructor(title, creationYear, authors, genre, publisher, cover, plot) {
        super(title, creationYear, authors);
        this.genre = genre;
        this.publisher = publisher;
        this.cover = cover;
        this.plot = plot;
    }
}

class Person {
    
}

class Author extends Person {
    // Class Author describes an author of the book. 
    // It extends class Person. 
    // Author should inherit name and year of birth from Person 
    // and add an array of titles (strings) of the books this 
    // author has written and a link to the Wikipedia page about 
    // this author.
}

class Company {

}

class Publisher extends Company {
    //Publisher describes the publishing house that published a book. 
    // It extends class Company. 
    // Company has a name and a Wikipedia page. 
    // Publisher has an array of titles (strings) of books it has published.
}









//////////((%&%#%##((####%###%##(#%#%#(#####%%%%%%%%%%%#%#########(((##(#######%%%%(##%###%#%#((####%###%#%####(((##%##%#%%#%#%%%%#%#%&&%###
//////////((%%%##%#(########((%#(######%%&&&&&&&%%%%%%%%#############,##%%((#####%########%#(##(((###(###%%%#####%&%%####%###%##%#%%%%%&%###
////////////%%&###%(########(#####(#&&&&&&&&&#///#%%%%%###########(#(. .*#(#((#%#################%###%##########%########%#%%%%%%%%%%%%%%%(#
////////////#%&##%(#%(((((#####(#&&&&&&%(((((//*/**,,,,##/((####(#(((/   .(##(######(((##(########################%%##%##%%#%%%&%%%%%%%%&%##
////////////#%&###(##(##((####&&&&&&&%####(#(((///**,,....(#(#######((     .####(((((##(##(#####(#(#######%%%%#####%%#####%&%%%%%%%###%%%%%(
////////////#%&((((##(##(/(#&&&@&@@@&%%%%####((////**,,,....(/#########*    .#####(############%((#########%#%#####%%#%##%(#%%%%%%####%%%&%#
/////////////%%%(###(###%%&&@@@@&@@@@&%%%%%%##((//*****,*,,,...,(####(*.      ,%&@@@@@@@@@@@@@@@#(#########(#######%##%##%###((#######%##%%%
/////////*///&#%((###%#(&&@@&@@@@@@@&&&%%%%%%%##(///****,,,,,,,,..,,.,. .  .((##%&&&&&&@@@@@@@@@&#####%##########%##%&%#(%###%%####%##%#%%&%
////////***//%#%%#%%###%&&@&@@@@@@&@&%%%%%%%%%%%%#((////,,,...  .,*(/(, .*%*,/##%&&&&&&&@@@@@@@@&###%##((###########(#########%%%%%##%###%%%
///////****//#(%######%&&&&@@@@@@&@&%%#%%%%%%%%%%%#((//**%%#//   *(#%%%  .%#&&&&%&@&&&&&&@@@@@@@@#(((((#########%%#%#####(#%%###%%%#%%%%%%%&
/////******///%#%#%%%##&&&&@@@@@@@@@%##%%%%%%%%%%%%#((&&&&&%%%%###%&##%#(*. #&&&&&@@&&&&&&@@@@@@@%(((########((#%%%###%%####%%##(#(#######%%
//*//******///%#%(/####&&&&&@@@@@@@&&%%%%%%%%%%%%%%%&@&&&&&&&&&&&&&%&&%&&&%(*. &&&&@&&&&&&@@@@@@@&//(#####((##%###(%%############%%####%%%%#
//**********//##&(##((/#&&&&@@@@@@@@@&%%%%%%&&%%%&&&@@@@@@@@@@&&&&&@&&&&&&&%#/,. ,&&&&&&,@@@@@@@@@(//((###(################%###(#########%#%
//**********//##&%##%((#%&&&@@&@@@&&&&&%%%&&&&&&&&&&@@@@@@@@@@@@&@@@@@&&&&&&%%(/,  .&&&&@@@@@@@@@@%**/((((((#######(%######(###%######%%#%%%
//**********//##&%%#(((##%&&&&&&&&&@@@@&&/,.     (%%%&@@@@@@@@&@@@@@&&&&&&&&%%%(/,   .%@@@@@@@@@@@&,***/*/(((((((#((######(##%######%###%###
//**********//####((#####(#(*,/@&&&&&&&&&&%&(..,..,/(%%%&@@@@@&&@@@&%(&&%%%%%%%%%#/*,.,&@@@@@@@@@@@(,*,**//((############(###((######%%##%%%
//***********//##%#####((##(/*,*@@&&&&&&%%%&&&&%%%%%%%%&&&( #&&&&%,*/(&&&&&&&&&%#(...,./@@@@@@@@@@@&,*,,,*/(##(##((#(%#(%#(%#(#(#######%%%%%
//***********//##&###(#((###///*&@@&&&&&&@@@&&&&&&&&&&&&%%###/%#****/(&&&&&&&&&(......,,&@@@@@@@@@@&***/##/(####((#####(#(#%#%%#####(#####%#
///**********//##&######(#%&@@@@@@@@&&@@@@@&&&&&%%&&&&&%%&%&%%%%%.*/(#&&&&&&%#//,....,,*&@@@@@@@@@@@#**//(####(######(##%%((######%%##%%(###
///**********//####(#####(%@@@@@@@@&@@@@@@@&&&&&&@@&&&&%%%#&&&%&&,  .%&&%%%##((((##&%#*,%@@@@@@@@@@@&**/(#(((#(####((###################%##%
///***********//##%%((#(((&@@@@@@@@@@@@@@@&@&&@@@&&&&&&%%%%&@@@@&#(/,,%%%#((%%%@@@&%/**,#@@@@@@@@@@@&///##((##############%#######(#%#%%%###
///***********/*##&%%%(((#&&@@@@@@@@@@@@&&&&&&&&&&&&&&&&&&&@&@@@@&%&%##%%###%(/*(%%#**,,(@@@@@@@@@@@@%//########################%##(##(###%%
////**********//##&#%(#####&&@@@@@@@@@@@@@&&&&&@&&&&&&&%%%@@@@@@&&@@@%&@(///(#%%%#(****,#@@@@@@@@@@@@&((####################%%(%%######%#%#(
////**********//##%#%#####((#&@@@@@@@@@@@@@@@@&&&&&&&&%%%%@@@@@@@@@@&#@@@&((((//%%%%#,,,*&@@@@@@@@@@&%%%####%##########%####%#######%%####%#
////*/********//(##%########(#@@@@@@@@@@@@@@@&@&&&&&&&%%%%@@@@@@@@@@@@@@&((((((/**,,..,,,%&&&&&&&&%//////(%##(##########(%%#%##%(###%%###%#%
///////*******///##%#%###(#(###@@@@@@@@@@@@@@&&&&&&&&&%%%%@@@@@@@@@@@@@@%(//((///**,..,,,,###((((((((///((#%((#(###(#%#%#((%%#%%#%#####%##%#
//////////*****//##&(###(##(####@@@@@@@@@@@@@&&&&&&&&&%%%%%@@@@@@@@@&@@&#(((/////***,*****##########((#((%%((#####(######%#%#(##%###%%%%%%%%
///////////****//#%%#(#%####(##(&@@@@@@@@@@@@@&&&&&&&&%%%%%%@@@@@@@@@@@#######((//(((((((%##%#(#%#%%####(((###(##%##%%#%###%#%#%%#%%%%%%%&&%
/////////////*///(%%%((##########@@@@@@@@@@@@@&&&&&&&&&%%%%%%@@@@@&@@@##############((,,,,##,,   #%#%%#%###############%#####%####(#%%%&&&%%
//////////////////%%&##&/%##%##(#&@@@@@@@@@@@@@&&&&&&&&%%%%%%&@@@@@&@%#############(  .,,,*,..    ,(((%%%####%#%%%#%%###%###%%%#%##%#%%%&%%%
//////////////////%%&###%#/####(((@@@@@@@@@@@@@&&&&&&&&%%%%&%%@@@@&@&##########(((#,  .**/*. ......,&@@@@@@@@&%###%%#%%%#####%#####%%#%##%%#
//(///////////////%%%%####&@&((((#%@@@@@@@@@@@@&&&&&&&&%%%&&%%%@@@@&#########(*,*(/* .,***,//*,...*(%%%%%%%%&@@@@########%##%&%&%%#%#%%%%%%%