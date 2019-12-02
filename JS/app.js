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

const RandomUsersCall = 'https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,picture&nat=us'

/*
    Helper Functions
*/

const requestData = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(error => console.log('There was a problem.', error));
};

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

requestData(RandomUsersCall);


//Refer to mockups and comments to dynamically show the info I grabbed from the API.
/*
    Info that needs to show on the inital page for each employee:
        1. Image
        2. First and Last Name
        3. Email
        4. City/Location
*/




//Exceeds - add the search box.
//Exceeds - Add a way to filter the directory by name. 
//Exceeds - Your search feature should filters results that are already on the page. So don't request new info from the API for your search.




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