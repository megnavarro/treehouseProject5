/* Treehouse FSJS Techdegree
 * Project 5 - Public API Requests
 * scripts.js */

//Global Variables
const galleryDiv = document.getElementById('gallery');
let globalData;

//Requests and collects data from Random User Generator API
fetch('https://randomuser.me/api/?results=12&nat=gb,us,au,nz')
    .then(response => response.json())
    .then(data => createDisplayCards(data.results))
    .catch(error => console.error('Error:', error))


/*
 * Creates new 'DIV' elements
 * @parameter {string} name - Class name of new div
 * @return {element} A new HTML Div element
 */
function createDiv(name) {
    const div = document.createElement('div');
    div.className = name;
    return div;
}   

/*
 * Creates display cards for each employee in the directory
 * @parameter {array} data - an array of JSON objects from Random User Generator API
 */
function createDisplayCards(data) {
    globalData = data;
    data.map((person, index) => {
    
        const cardDiv = createDiv('card');
        galleryDiv.appendChild(cardDiv);

        const cardImgDiv = createDiv('card-img-container');
        cardImgDiv.innerHTML = `<img class="card-img" src="${person.picture.large}" alt="profile picture">`;
        cardDiv.appendChild(cardImgDiv);

        const cardInfoDiv = createDiv('card-info-container');
        cardInfoDiv.innerHTML = `<h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                                <p class="card-text">${person.email}</p>
                                <p class="card-text cap">${person.location.city}, ${person.location.state}</p>`;
        cardDiv.appendChild(cardInfoDiv);

        //Adds event listener to create Modal when display card is clicked
        cardDiv.addEventListener('click', (event) => {
            createModal(person, index)
        });
    })   
    
}

/*
 * Creates display cards for each employee in the directory
 * @parameter {object} person - An object representing one employee with
 *                              properties with identifying information
 * @parameter {integer} index - Index number of object within the original array
 */
function createModal(person, index) {
    const modalContainerDiv = createDiv('modal-container');
    galleryDiv.appendChild(modalContainerDiv);
    
    const modalDiv = createDiv('modal');
    modalContainerDiv.appendChild(modalDiv);

    const closeButton = createButton('type', 'button', 'modal-close-btn', 'modal-close-btn', '<strong>X</strong');
    modalDiv.appendChild(closeButton);
    closeButton.addEventListener('click', () => modalContainerDiv.remove());

    const modalInfoDiv = createDiv('modal-info-container');
    const normalizedPhone = normalizePhone(person.phone);
    const normalizedBirthday = normalizeBirthday(person.dob.date);
    modalInfoDiv.innerHTML = `<img class="modal-img" src="${person.picture.large}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                            <p class="modal-text">${person.email}</p>
                            <p class="modal-text cap">${person.location.city}</p>
                            <hr>
                            <p class="modal-text">${normalizedPhone}</p>
                            <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
                            <p class="modal-text">Birthday: ${normalizedBirthday}</p>`;
    modalDiv.appendChild(modalInfoDiv);
    
    const modalBtnContainer = createDiv('modal-btn-container');
    document.querySelector('.modal').appendChild(modalBtnContainer);

    const modalPrevBtn = createButton('type', 'button', 'modal-prev', 'modal-prev btn', 'Prev');
    modalBtnContainer.appendChild(modalPrevBtn);

    //Adds event listener to previous button to update modal with information of previous employee
    modalPrevBtn.addEventListener('click', () => {
        modalContainerDiv.remove();
        if (index === 0) {
            createModal(globalData[11], 11);
        } else if (index > 0) {
            createModal(globalData[index-1], index - 1);
        }
    });

    const modalNextBtn = createButton('type', 'button', 'modal-next', 'modal-next btn', 'Next');
    modalBtnContainer.appendChild(modalNextBtn);

    //Adds event listener to previous button to update modal with information of next employee
    modalNextBtn.addEventListener('click', () => {
        modalContainerDiv.remove();
        if (index === 11) {
            createModal(globalData[0], 0);
        } else if (index < 11) {
            createModal(globalData[index + 1], index + 1);
        }
    });
}

/*
 * Creates new button elements
 * @parameter {string} attribute - Name of attribute to be set
 * @parameter {string} value - Value of attribute to be set
 * @parameter {string} id - Name of ID to be set
 * @parameter {string} className - Name of className to be set
 * @parameter {string} text - string to be set as text content
 * 
 * @return {element} button - Returns an HTML button element
 */
function createButton(attribute, value, id, className, text) {
    const button = document.createElement('button');
    button.setAttribute(attribute, value);
    button.id = id;
    button.className = className;
    button.innerHTML = text;
    return button;
}

/*
 * Standardizes phone number format
 * @parameter {string} phone - The phone number as provided by the Random User Generator API Object
 * @return {string} a string with eformatted phone number
 */
function normalizePhone(phone) {
    //normalize string and remove all unnecessary characters
    phone = phone.replace(/[^\d]/g, "");

    //check if number length equals to 10
    if (phone.length === 10) {
        //reformat and return phone number
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    } else if (phone.length === 11) {
        return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4");;
    } else {
        return phone;
    }
}

/*
 * Standardizes birthday date format
 * @parameter {string} birthday - The birth date as provided by the Random User Generator API Object
 * @return {string} A string with reformatted birth date
 */
function normalizeBirthday(birthday) {
    birthday = birthday.split('T')[0];
    birthday = birthday.replace(/[^\d]/g, "");
    birthday = birthday.replace(/^(\d{4})(\d{2})(\d{2})/, "$2-$3-$1")
    return birthday;
}

/*
 * Creates and appends elements needed for Search feature to the DOM
 */
function createSearchBar() {
    const searchContainerDiv = document.querySelector('.search-container');
    const searchBar = document.createElement('form');
    searchBar.setAttribute('action', '#');
    searchBar.setAttribute('method', 'get');
    searchBar.innerHTML = '<input type="search" id="search-input" class="search-input" placeholder="Search..."> <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">';
    searchContainerDiv.appendChild(searchBar);
    const resetButton = document.createElement('button');
    resetButton.setAttribute('type', 'reset');
    resetButton.className = 'reset-btn';
    resetButton.textContent = 'Clear Search';
    searchContainerDiv.appendChild(resetButton);
}

/*
 * Filters employees based on search input to provide only matching employee display cards
 */
function filterSearch(){
    const searchBarInput = document.querySelector('.search-input');
    const filter = searchBarInput.value.toUpperCase();
    const names = document.querySelectorAll('h3#name');
    
    let searchResults = false;

    names.forEach((name) => {
        // Searches for a substring within student names that contains the filter in any index.
       if (name.textContent.toUpperCase().indexOf(filter) > -1){ 
          name.parentNode.parentNode.className = 'card';
          searchResults = true;
       } else {
          name.parentNode.parentNode.className = 'hidden';
       }
    });
    
    if (!searchResults) {
       const noResults = createDiv('no-results');
       noResults.innerHTML = '<h3>No Results Found</h3>';
       galleryDiv.appendChild(noResults);
    } 
 }

//initiate create search bar to add to page
createSearchBar();

//Sets event listener to submit button to filter search on click
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    filterSearch();
    document.querySelector('form').reset();    
});

//Sets event listener on "clear search" (reset) button to show all employee cards on click
document.querySelector('.reset-btn').addEventListener('click', () => {
    document.querySelectorAll('.hidden').forEach(card => card.className = 'card');
    if (document.querySelector('.no-results')) {
        document.querySelector('.no-results').remove();
    }
});
