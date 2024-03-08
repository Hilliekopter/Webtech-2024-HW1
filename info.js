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
    #_title;
    #_creationYear;
    #_authors;

    get title() {
        return this.#_title;
    }
    
    set title(value) {
        if(typeof typeof value !== 'string') {
            throw new Error('Title must be a string!');
        }
        this.#_title = value;
    }

    get creationYear() {
        return this.#_creationYear;
    }

    set creationYear(value) {
        if(!Number.isInteger(value)) {
            throw new Error('Creation year must be an integer!');
        }
        
        // This might be a bad idea to not allow, 
        // since someone might want to list a book that will release next year.
        if(value > new Date().getFullYear()) {
            throw new Error('Creation year can not be in the future!');
        }
        
        this.#_creationYear = value;
    }

    get authors() {
        return this.#_authors;
    }

    set authors(value) {
        if(!Array.isArray(value)) {
            throw new Error('Authors must be an array!');
        } 
        
        if (!value.every(item => item instanceof Author)) {
            throw new Error('Not all elements in array are of type Author!');
        }

        this.#_authors = value;
    }

    constructor(title = '', creationYear = 0, authors = []) {
        this.title = title;
        this.creationYear = creationYear;
        this.authors = authors;
    }
}

class Book extends CreativeWork {
    #_genre; // String
    #_publisher; // Publisher class
    #_cover; // link to an image
    #_plot; // String

    get genre() {
        return this.#_genre;
    }

    set genre(value) {
        if(typeof value !== 'string'){
            throw new Error('Genre must be a String!');
        }

        this.#_genre = value;
    }

    get publisher() {
        return this.#_publisher;
    }

    set publisher(value) {
        if(!(value instanceof Publisher)) {
            throw new Error('Publisher must be of type Publisher!');
        }
    }

    get cover() {
        return this.#_cover;
    }

    set cover(value) {
        if(!this.#_isUriImage(value)) {
            throw new Error('Cover must link to an actual image! (jpg, jpeg, tiff, png, gif, bmp)');
        }
        this.#_cover = value;
    }

    #_isUriImage(uri) {
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
        return this.#_plot;
    }

    set plot(value) {
        if(typeof value !== 'string') {
            throw new Error('Plot must be of type String!');
        }

        this.#_plot = value;
    }

    constructor(title = '', creationYear = 0, authors = [], genre = '', publisher = '', cover = '', plot = '') {
        super(title, creationYear, authors);
        this.genre = genre;
        this.publisher = publisher;
        this.cover = cover;
        this.plot = plot;
    }
}

class Person {
    #_name; // string
    #_birthYear; // int

    get name() {
        return this.#_name;
    }

    set name(value) {
        if(typeof value !== 'string') {
            throw new Error('Name must be of type String!');
        }

        this.#_name = value;
    }

    get birthYear() {
        return this.#_birthYear;
    }

    set birthYear(value) {
        if(!Number.isInteger(value)) {
            throw new Error('Birth year must be an integer!');
        }
        
        if(value > new Date().getFullYear()) {
            throw new Error('Birth year can not be in the future!');
        }
        
        this.#_birthYear = value;
    }

    constructor(name = '', birthYear = 0) {
        this.name = name;
        this.birthYear = birthYear;
    }
}

class Author extends Person {
    #_titles; // [string]
    #_wikiLink; // string (url)

    get titles() {
        return this.#_titles;
    }

    set titles(value) {
        if(!Array.isArray(value)) {
            throw new Error('Titles must be an array!');
        } 
        
        if(!value.every(item => typeof item === 'string')) {
            throw new Error('Not all elements in array are of type String!');
        };

        this.#_titles = value;
    }

    get wikiLink() {
        return this.#_wikiLink;
    }

    set wikiLink(value) {
        // Regular expression for a basic URL pattern
        var urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

        // Test the URL against the pattern
        if(!urlPattern.test(value)) {
            throw new Error('Given URL is not valid!');
        }

        this.#_wikiLink = value;
    }

    constructor(name= '', birthYear = 0, titles = [], wikiLink = '') {
        super(name, birthYear);
        this.titles = titles;
        this.wikiLink = wikiLink;
    }
}

class Company {
    #_name; // string
    #_wikiLink; // string (url)

    get name() {
        return this.#_name;
    }

    set name(value) {
        if(typeof value !== 'string') {
            throw new Error('Name must be of type String!');
        }

        this.#_name = value;
    }

    get wikiLink() {
        return this.#_wikiLink;
    }

    set wikiLink(value) {
        // Regular expression for a basic URL pattern
        var urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;

        // Test the URL against the pattern
        if(!urlPattern.test(value)) {
            throw new Error('Given URL is not valid!');
        }

        this.#_wikiLink = value;
    }

    constructor(name = '', wikiLink = '') {
        this.name = name;
        this.wikiLink = wikiLink;
    }
}

class Publisher extends Company {
    #_titles;

    get titles() {
        return this.#_titles;
    }

    set titles(value) {
        if(!Array.isArray(value)) {
            throw new Error('Titles must be an array!');
        } 
        
        if(!value.every(item => typeof item === 'string')) {
            throw new Error('Not all elements in array are of type String!');
        };

        this.#_titles = value;
    }

    constructor(name = '', wikiLink = '', titles = []) {
        super(name, wikiLink);
        this.titles = titles;
    }
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