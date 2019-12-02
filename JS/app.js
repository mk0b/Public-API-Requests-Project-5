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

//TODO: Use interpolation to add info from api call.
const searchHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;



const modalHTML = `<div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
    </div>
</div>`;

const modalButtonsHTML = `<div class="modal-btn-container">
<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
<button type="button" id="modal-next" class="modal-next btn">Next</button>
</div>
</div>`;



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
};


//Refer to mockups and comments to dynamically show the info I grabbed from the API.
/*
    Info that needs to show on the inital page for each employee:
        1. Image
        2. First and Last Name
        3. Email
        4. City/Location
*/

//Loops through the results, sets up the needed html, and uses my grabNappend helper function to show on the page.
const createGallery = (data) => {
    console.log(data);
    data.forEach(person => {
        const galleryHTML = `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${person.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
            </div>
        </div>`;
        grabNappend('#gallery', 'div', galleryHTML);
    });
};

//Exceeds - add the search box.
//Exceeds - Add a way to filter the directory by name. 
//Exceeds - Your search feature should filters results that are already on the page. So don't request new info from the API for your search.

const createSearch = () => {


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

const createModal = () => {


};

//make master function that creates the whole page by calling other functions?

const createPage = () => {

};

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
    .then(data => createGallery(data.results));

    //place the functions here to test but then at the end only call the master createPage function.