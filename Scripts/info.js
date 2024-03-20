class CreativeWork {
    #_title; // string
    #_creationYear; // int
    #_authors; // [string]

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

        this.#_publisher = value;
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
    #_titles; // [string]

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

window.addEventListener("load", setupContent());

function setupContent() {
    // Author
    const rowlingTitles = ["Harry Potter and the Philosopher's Stone",
    "Harry Potter and the Chamber of Secrets",
    "Harry Potter and the Prisoner of Azkaban",
    "Harry Potter and the Goblet of Fire",
    "Fantastic Beasts and Where to Find Them",
    "Quidditch Through the Ages",
    "Harry Potter and the Order of the Phoenix",
    "Harry Potter and the Half-Blood Prince",
    "Harry Potter and the Deathly Hallows",
    "The Tales Of Beedle The Bard",
    "Fantastic Beasts and Where to Find Them",
    "The Casual Vacancy",
    "The Cuckoo's Calling",
    "The Silkworm",
    "Career of Evil",
    "Lethal White",
    "Troubled Blood",
    "The Ink Black Heart",
    "The Running Grave"];

    const rowling = new Author(
        "J.K. Rowling", 
        1965,
        rowlingTitles,
        "https://en.wikipedia.org/wiki/J._K._Rowling"
    );

    // Publisher
    bloomsburyTitles = ["24 for 3",
    "30 Days in Sydney",
    "33⅓",
    "The 100-Year Life",
    "Aesthetics and Morality",
    "Affluence Without Abundance",
    "Afterlives",
    "Amaryllis Night and Day",
    "The Anarchy: The Relentless Rise of the East India Company",
    "And the Mountains Echoed",
    "Apartment",
    "The Ash Garden",
    "Bad Samaritans",
    "Bamboo",
    "Be Mine",
    "Behind the Enigma",
    "Blart III: The Boy Who Set Sail on a Questionable Quest",
    "Blart: The Boy Who Didn't Want to Save the World",
    "The Blind Astronomer's Daughter",
    "The Bone Season",
    "The Book of Revelation",
    "Bright Burning Things",
    "Burnt Shadows",
    "The Butt",
    "By the Sea",
    "Can't We Talk About Something More Pleasant?",
    "Chasing Me to My Grave",
    "Chasing the Scream",
    "Cinderella is Dead",
    "Cock and Bull",
    "Confessions of a Teen Sleuth",
    "A Cook's Tour",
    "Coraline",
    "The Countess's Calamity",
    "A Court of Thorns and Roses",
    "Crescent City",
    "Crossing the River",
    "A Cruel Bird Came to the Nest and Looked In",
    "Dawn Undercover",
    "Debatable Land",
    "The Declaration",
    "The Descent of Air India",
    "Desertion",
    "The Disappeared",
    "Divided Kingdom",
    "The Dream Lover",
    "East of the Mountains",
    "Eleanor Marx: A Life",
    "Eleanor Rigby",
    "Empress Orchid",
    "Engines of Privilege",
    "Even the Dogs",
    "The Exile: The Flight of Osama bin Laden",
    "Exorcising Hitler",
    "Explorers of the New Century",
    "Face",
    "The Faerie Wars Chronicles",
    "Fantastic Beasts and Where to Find Them",
    "Farmageddon",
    "The Feather Men",
    "The Field of the Cloth of Gold",
    "The Finkler Question",
    "The Fixer",
    "For King and Another Country",
    "The Forensic Records Society",
    "Forest Born",
    "Forest Dark",
    "The Frog Princess",
    "Frozen in Time: The Fate of the Franklin Expedition",
    "Gandhi and Philosophy: On Theological Anti-politics",
    "The Glitch in Sleep",
    "The God Argument",
    "The God Child",
    "Gravel Heart",
    "The Graveyard Book",
    "Great Apes",
    "The Gum Thief",
    "Hard Work: Life in Low-pay Britain",
    "Harry Potter and the Chamber of Secrets",
    "Harry Potter and the Deathly Hallows",
    "Harry Potter and the Goblet of Fire",
    "Harry Potter and the Half-Blood Prince",
    "Harry Potter and the Order of the Phoenix",
    "Harry Potter and the Philosopher's Stone",
    "Harry Potter and the Prisoner of Azkaban",
    "Heavy: An American Memoir",
    "Heidegger and the Place of Ethics",
    "The Hidden Case of Ewan Forbes",
    "High on the Hog",
    "The Hired Man",
    "Home Fire",
    "Hotel",
    "How the Dead Live",
    "How to Be a Conservative",
    "How to Make Good Decisions and Be Right All the Time",
    "Humankind: A Hopeful History",
    "I Feel Love",
    "The Icarus Girl",
    "If Nobody Speaks of Remarkable Things",
    "Illuminations",
    "The Imaginary",
    "An Impeccable Spy",
    "In Mortal Hands",
    "The Incest Diary",
    "Incredible Bodies",
    "Insomniac City",
    "The Insult",
    "An Islamic Utopian",
    "Jemima Shore at the Sunny Grave",
    "John le Carré: The Biography",
    "Jonathan Strange & Mr Norrell",
    "The Key",
    "Kindred: Neanderthal Life, Love, Death and Art",
    "Kisses on a Postcard",
    "Koh-i-Noor: The History of the World's Most Infamous Diamond",
    "The Labrador Fiasco",
    "The Ladies of Grace Adieu and Other Stories",
    "Larklight",
    "The Last Gift",
    "Leonardo and the Last Supper",
    "Lives in the Shadow with J. Krishnamurti",
    "The Longing for Less",
    "The Lost Train of Thought",
    "Love Falls On Us",
    "Love Is a Revolution",
    "MaddAddam",
    "The Madness of Crowds: Gender, Race and Identity",
    "Magic Under Glass",
    "The Magician's Wife",
    "Magyk",
    "The Maintenance of Headway",
    "Man on Fire",
    "The Man Who Knew",
    "The Man Who Wasn't Maigret",
    "Mandalay: Recipes and Tales from a Burmese Kitchen",
    "The Memory of Love",
    "Men We Reaped",
    "Michelangelo and the Pope's Ceiling",
    "The Mime Order",
    "Minaret",
    "Minerva Clark Gets a Clue",
    "The Mistmantle Chronicles",
    "The Monk Who Became Chief Minister",
    "Mornings in Jenin",
    "Mothstorm",
    "My Idea of Fun",
    "My Summer of Love",
    "No Other Life",
    "Odd and the Frost Giants",
    "Old Men In Love",
    "One",
    "Operation Bite Back: Rod Coronado's War to Save American Wilderness",
    "The Opposite House",
    "Ordinary Thunderstorms",
    "Oryx and Crake",
    "Our Young Man",
    "Outlawed",
    "Overtreated",
    "Partition Voices",
    "The Passion",
    "The Patron Saint of Butterflies",
    "Perfect Chemistry",
    "Philip Larkin: Life, Art and Love",
    "Piecing Me Together",
    "Piercing",
    "Pigeon English",
    "Piranesi",
    "Poor Things",
    "The Precipice: Existential Risk and the Future of Humanity",
    "Princess Academy: Palace of Stone",
    "Princess Academy: The Forgotten Sisters",
    "Princess of Glass",
    "The Priory of the Orange Tree",
    "The Quantity Theory of Insanity",
    "Quidditch Through the Ages",
    "R.N. Kao: Gentleman Spymaster",
    "The Resistance",
    "Restless",
    "Return of a King",
    "Revolution",
    "Richard Rorty: Contemporary American Thinkers",
    "Ripley Under Water",
    "Roxy's Baby",
    "Salvage the Bones",
    "A Savage Dreamland",
    "Schott's Almanac",
    "Screwtop Thompson",
    "Sea Prayer",
    "Septimus Heap",
    "Septimus Heap: The Magykal Papers",
    "Sexing the Cherry",
    "Shadow over Babylon",
    "The Silk Roads",
    "The Simpsons and Their Mathematical Secrets",
    "Small g: a Summer Idyll",
    "Small Steps",
    "So Many Ways to Begin",
    "Soft!",
    "The Song Rising"];

    const bloomsbury = new Publisher(
        "Bloomsbury Publishing plc",
        "https://en.wikipedia.org/wiki/Bloomsbury_Publishing",
        bloomsburyTitles
        );


    // Book
    const harryPotterBook = new Book(
        "Harry Potter and the Philosopher's Stone", 
        1997, 
        [rowling], 
        "Fantasy", 
        bloomsbury, 
        "Images/info/HP_PhiloStone_cover.jpg",
        "An 11-year-old orphan living with his unwelcoming aunt, uncle, and cousin, who learns of his own fame as a wizard known to have survived his parents' murder at the hands of the dark wizard Lord Voldemort as an infant when he is accepted to Hogwarts School of Witchcraft and Wizardry."
        );
    
    // Defining HTML content
    const mainContent = document.getElementById("main-content");
    
    const titleElement = document.createElement("h2");
    titleElement.textContent = harryPotterBook.title;
    
    const coverElement = document.createElement("img");
    coverElement.src = harryPotterBook.cover;
    coverElement.alt = "Harry Potter and the PhilosBook Cover";
    coverElement.className = "inline-image__right";

    const genreElement = document.createElement("p");
    genreElement.textContent = "Genre: " + harryPotterBook.genre;

    const yearElement = document.createElement("p");
    yearElement.textContent = "Year: " + harryPotterBook.creationYear;

    const authorsElement = document.createElement("p");
    authorsElement.textContent = "Authors: "; 
    
    harryPotterBook.authors.forEach(author => {
        const authorSpan = document.createElement("span");
        authorSpan.textContent = author.name;
        authorSpan.title = author.name + " was born in " + author.birthYear + ". For more info visit " + author.wikiLink;
        authorsElement.appendChild(authorSpan);
        if(harryPotterBook.authors > 1)
            authorsElement.appendChild(document.createTextNode(", "));
    });

    const publisherElement = document.createElement("p");
    publisherElement.textContent = "Publisher: " + harryPotterBook.publisher.name;
    publisherElement.title = bloomsbury.name + " is the publisher of the Harry Potter books. For more info visit " + bloomsbury.wikiLink;

    const plotElement = document.createElement("p");
    plotElement.textContent = "Plot: " + harryPotterBook.plot;

    // Appending HTML elements to content 
    mainContent.appendChild(titleElement);
    mainContent.appendChild(coverElement);
    mainContent.appendChild(genreElement);
    mainContent.appendChild(yearElement);
    mainContent.appendChild(authorsElement);
    mainContent.appendChild(publisherElement);
    mainContent.appendChild(plotElement);
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