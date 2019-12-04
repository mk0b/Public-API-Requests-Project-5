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
//TODO: Add css styling for "No Results" div. class="no-results"

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

//function for grabbing a node list and converting it to an array.
const grabNodeConvertToArray = (node) => {
    const nodeList = document.querySelectorAll(node);
    const array = Array.from(nodeList);
    return array;
};

/*
    Regular Functions
*/

//Create Searchbox
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

//Create gallery
const createGallery = (data) => {
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
};

//Create modals
const createModals = (data) => {
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
                <p class="modal-text">Birthday: ${person.dob.date.slice(5, 10)}</p>
                </div>
            </div>
            <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`;
            grabNappend('body', 'div', modalHTML).className = 'modal-container';
    });
};

//Hiding Modals
const hidingModals = () => {
    grabNodeConvertToArray('div.modal-container').forEach(modal => modal.style.display = 'none');;
};

//Event Listeners to open, close, and click next on modals.
const eventListeners = () => {
    //creating arrays
    const cardsArray = grabNodeConvertToArray('div.card');
    const modalsArray = grabNodeConvertToArray('div.modal-container');
    const modalCloseBtnArray = grabNodeConvertToArray('#modal-close-btn');
    const nameArray = grabNodeConvertToArray('#name');
    const searchInput = document.querySelector('#search-input');
    const noResultsDiv = grabNappend('#gallery', 'div', '<span class="no-results"><strong>No results found.</strong></span>').style.display = 'none';
    const modalBtnSection = grabNodeConvertToArray('div.modal-btn-container');

    //dynamically adding event listeners to each card. When a card is clicked show matching event listener.
    for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i].addEventListener('click', () => {
            modalsArray[i].style.display = 'block';
        });
    }

    //dynamically adding event listeners to each modal close button to close modal.
    for (let k = 0; k < modalCloseBtnArray.length; k++) {
        modalCloseBtnArray[k].addEventListener('click', () => {
            modalsArray[k].style.display = 'none';
        });
    }

    //keyup event for search bar filtering
    searchInput.addEventListener('keyup', (event) => {
        const searchTerm = event.target.value.toLowerCase();

        //looping through and checking what is typed into the search input against the card names. 
        //if the letters are contained in a name element show the card if not hide the card.
        for (let j = 0; j < cardsArray.length; j++) {
            const nameText = nameArray[j].textContent.toLowerCase();
            if (nameText.indexOf(searchTerm) != -1) {
                cardsArray[j].style.display = 'block';
            } else {
                cardsArray[j].style.display = 'none';
            }
        }

        //adding a no results message if search field is not blank and if no cards are showing.
        if (cardsArray.every(card => card.getAttribute("style") === 'display: none;')) {
            noResultsDiv.style.display = 'block';
        } else if (searchTerm === '') {
            noResultsDiv.style.display = 'none';
        } else {
            noResultsDiv.style.display = 'none';
        }
    });

    //TODO: Add event listener for next and back buttons user foreach and use the special next and back for each methods?
    //Adding Event Listeners for each modal button section on each card.
    //TODO: hide prev when you get to the front of the cards hide next when you get to the end of the cards. or just disable and make it look different.

    for (let q = 0; q < modalBtnSection.length; q++) {
        modalBtnSection[q].addEventListener('click', (event) => {
            const clicked = event.target.textContent.toLowerCase();
            const clickedModal = event.target.parentNode.parentNode;
            let modalIndexNum = modalsArray.indexOf(clickedModal);
            console.log('Modal index num: ' + modalIndexNum);
            console.log('Index num of current modal: ' + modalsArray.indexOf(clickedModal));
            if (clicked === 'next') {
                //create a variable that equals the index number of currentmodal that ++ if it's clicked
                modalIndexNum++;
                console.log(modalIndexNum);
                //put that variable in as the index value
                modalsArray[modalIndexNum].style.display = 'block';
                clickedModal.style.display = 'none';
            } else if (clicked === 'prev') {
                //do reverse of above
            }
        });
    }
    /*     modalBtnSection.forEach(buttons => {
        buttons.addEventListener('click', (event) => {
            const clicked = event.target.textContent.toLowerCase();
            if (clicked === 'next' ) {  
                console.log('Next was clicked.');
                return;
           } else if (clicked === 'prev') {
            console.log('Prev was clicked.');
           }
        });
    }); */
};



//master calling function. Passing through the response and calling each part of my app so they can be called all at once.
const createPage = (data) => {
    createSearch();
    createGallery(data);
    createModals(data);
    hidingModals();
    eventListeners();
};

//TODO: Exceeds - add a way to move to the next employee in the modal. There is markup and comments.


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
    Call functions.
*/

//Fetching the data from the RandomUser API
requestData(RandomUsersCall)
    .then(data => createPage(data.results));
