/*
Treehouse Project 5 - Public API Requests - by TAP Student Megan Katherine O'Brien.
*/

/*
    Global Variables
*/

//my api call - specific data - 12 results - us for search
const RandomUsersCall = 'https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,picture&nat=us';

/* ---------------------------
    Helper Functions
--------------------------- */

//Funtion for requesting data with the Fetch API, logging the response, converting to json, and catching errors.

//TODO: conver to async function?
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

/* ---------------------------
    Regular Functions
--------------------------- */

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
    //creating arrays needed with helper function
    const cardsArray = grabNodeConvertToArray('div.card');
    const modalsArray = grabNodeConvertToArray('div.modal-container');
    const modalCloseBtnArray = grabNodeConvertToArray('#modal-close-btn');
    const nameArray = grabNodeConvertToArray('#name');
    const modalBtnSection = grabNodeConvertToArray('div.modal-btn-container');
    const modalPrevBtnArray = grabNodeConvertToArray('#modal-prev'); 
    const modalNextBtnArray = grabNodeConvertToArray('#modal-next');
    //grabbing the search input
    const searchInput = document.querySelector('#search-input');
    //creating and appending no results message with helper function
    const noResultsDiv = grabNappend('#gallery', 'div', '<span class="no-results">No results found.</span>');
    const spanNoResults = document.querySelector('span.no-results');
    //hiding no results message initially
    noResultsDiv.style.display = 'none';
    spanNoResults.style.display = 'none';
    //using this as the index to get the button to disable on the correct modal
    const modalArrayLengthMinusOne = modalsArray.length - 1;
    //setting the prev and next button disabled and class on first card modal load.
    modalPrevBtnArray[0].disabled = 'true';
    modalPrevBtnArray[0].className = 'disabled-btn';
    modalNextBtnArray[modalArrayLengthMinusOne].disabled = 'true';
    modalNextBtnArray[modalArrayLengthMinusOne].className = 'disabled-btn';
    
    
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
        const cardsDisplayTrueOrFalse = cardsArray.every(card => card.getAttribute("style") === 'display: none;');

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
        if (cardsDisplayTrueOrFalse) {
            noResultsDiv.style.display = 'block';
            spanNoResults.style.display = 'block';
        } else if (!cardsDisplayTrueOrFalse) {
            noResultsDiv.style.display = 'none';
            spanNoResults.style.display = 'none';
        }
    });

    //for loop that adds event listeners to the nex and prev buttons in the modals.
    for (let q = 0; q < modalBtnSection.length; q++) {
        modalBtnSection[q].addEventListener('click', (event) => {
            const clicked = event.target.textContent.toLowerCase();
            const clickedModal = event.target.parentNode.parentNode;
            let modalIndexNum = modalsArray.indexOf(clickedModal);
            
            if (clicked === 'next') {
                //create a variable that equals the index number of currentmodal that ++ if it's clicked
                modalIndexNum++;
                //put that variable in as the index value
                modalsArray[modalIndexNum].style.display = 'block';
                clickedModal.style.display = 'none';
            } else if (clicked === 'prev') {
                //do reverse of above
                modalIndexNum--;
                modalsArray[modalIndexNum].style.display = 'block';
                clickedModal.style.display = 'none';
            }
        });
    }

    //Event Listener for clicking "oustside" of the modal will also close it
    modalsArray.forEach(modal => {
        modal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });

};



//master calling function. Passing through the response and calling each part of my app so they can be called all at once.
const createPage = (data) => {
    createSearch();
    createGallery(data);
    createModals(data);
    hidingModals();
    eventListeners();
};

/* ---------------------------
    Call functions.
--------------------------- */

//calls my helper requestData to fetch from the api then calls my master createPage function to kick off everything else.
requestData(RandomUsersCall)
    .then(data => createPage(data.results));
