//javascript

fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => console.log(data))


/*<div class="card">
<div class="card-img-container">
<img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
</div>
<div class="card-info-container">
<h3 id="name" class="card-name cap">first last</h3>
<p class="card-text">email</p>
<p class="card-text cap">city, state</p>
</div>
</div>
*/
function createDiv(name) {
    const div = document.createElement('div');
    div.className = 'name';
}   


function createDisplayCard() {
    const cardDiv = createDiv('card');
    document.getElementById('gallery').appendChild(cardDiv);

    const cardImgDiv = createDiv('card-imag-container');
    cardImgDiv.innerHTML = `<img class="card-img" src="${data.picture.thumbnail}" alt="profile picture">`;
    cardDiv.appendChild(cardImgDiv);

    const cardInfoDiv = createDiv('card-info-container');
    cardInfoDiv.innerHTML = `<h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                            <p class="card-text">${data.email}</p>
                            <p class="card-text cap">${data.location.city}, ${data.location.state}</p>`;
    cardDiv.appendChild(cardInfoDiv);
}
