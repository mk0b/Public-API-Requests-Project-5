/*
Treehouse Project 5 - Public API Requests - by TAP Student Megan Katherine O'Brien.
*/


//TODO: Write out my plan in comments.
//TODO: Start Coding.
//TODO: Figure out how to code modals.
//TODO: Remember that the html for what I need is in comments in the index.html file.

//TODO: Test, test test!
//TODO: Refactor & clean up comments & tests.
//TODO: Fill out read.me
//TODO: Go for exceeds.

/*
    Global Variables
*/

//get 12 random users in one request from the randomUser API
/*
    Info I need to capture:
        1. Image
        2. First and Last Name
        3. Email
        4. City/Location
        5. User nationality of English
        6. Cell number
        7. Detailed address including street name and number, state or country, and post code.
        8. Birthday
*/
const RandomUsersCall = 'https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,picture&nat=us';



/*
    Helper Functions
*/

//Funtion for requesting data with the Fetch API, logging the response, converting to json, and catching errors.
const requestData = (url) => {
    return fetch(url)
        .then(response => response.json())
        //.then(response => console.log(response))
        .catch(error => console.log('There was a problem.', error));
};

//Function to grab a single element, append it, and apply inner html.
const grabNappend = (grabElement, appendElement, html) => {
    const selectedElement = document.querySelector(grabElement);
    const newElement = document.createElement(appendElement);
    selectedElement.append(newElement);
    newElement.innerHTML = html;
    return newElement;
};

//TODO: create helper function for grabbing a node list and converting it to an array.

/*
    Regular Functions
*/

//Master create page function. Creates search, creates gallery, creates modals. Could break up into individual parts after. Smaller functions then call them here and pass data.
const createPage = (data) => {
    //creating search bar
    createSearch();
    //console.log(data);
    
    //creating gallery
    data.forEach(person => {
        const galleryHTML = `
        <div class="card-img-container">
            <img class="card-img" src="${person.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>
        </div>`;
        grabNappend('#gallery', 'div', galleryHTML).className = 'card';
    });

    //creating modals
    data.forEach(person => {
        const modalHTML = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${person.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="modal-text">${person.email}</p>
                <p class="modal-text cap">${person.location.city}</p>
                <hr>
                <p class="modal-text">${person.cell}</p>
                <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                <p class="modal-text">Birthday: ${person.dob.date}</p>
                </div>
            </div>
            <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`;
            grabNappend('body', 'div', modalHTML).className = 'modal-container';
            //TODO: Clean up how the birthday appears.
    });

    //hiding modals
    const modals = document.querySelectorAll('div.modal-container');
    const modalsArray = Array.from(modals);
    console.log(modalsArray);
    modalsArray.forEach(modal => modal.style.display = 'none');
    
    //TODO: put the event listners all in one function because I need access to the three arrays among most of the event listerns.
    //creating a cards array
    const cards = document.querySelectorAll('div.card');
    console.log(cards);
    const cardsArray = Array.from(cards);
    console.log(cardsArray);

    //Dynamically adding event listeners to each card. When a card is clicked show matching event listener
    for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i].addEventListener('click', () => {
            modalsArray[i].style.display = 'block';
        });
    }

    //close button listener
    const modalCloseBtn = document.querySelectorAll('#modal-close-btn');
    const modalCloseBtnArray = Array.from(modalCloseBtn);

    for (let k = 0; k < modalCloseBtnArray.length; k++) {
        modalCloseBtnArray[k].addEventListener('click', () => {
            modalsArray[k].style.display = 'none';
        });
    }

};


//TODO: Exceeds - Add a way to filter the directory by name. 
//TODO: Exceeds - Your search feature should filters results that are already on the page. So don't request new info from the API for your search.

//Exceeds - add the search box.
const createSearch = () => {
    const searchHTML = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    grabNappend('.search-container', 'form', searchHTML);
    const searchForm = document.querySelector('.search-container form');
    searchForm.action = "#";
    searchForm.method = "get";
};


//Create a modal window
/*
    Modal window needs to show the following info:
        1. Image
        2. Name
        3. Email
        4. City or location
        5. Cell number
        6. Detailed address including street name and number, state or country, and post code.
        7. Birthday
*/
//Make sure there is a way to close the window.
//Exceeds - add a way to move to the next employee in the modal. There is markup and comments.


/*
    Exceeds for Structure style and css
        1. Add or change at least one of the following:
            - color
            - background color
            - font
            - box or text shadows
        2. Document your style changes in your readme and projec sub notes.
        3. Do not alter the layout or position of the important elements on the page.
*/

/*
    Event Listeners
*/





/*
    Call functions.
*/

//Fetching the data from the RandomUser API
requestData(RandomUsersCall)
    .then(data => createPage(data.results));
    //place the functions here to test but then at the end only call the master createPage function.