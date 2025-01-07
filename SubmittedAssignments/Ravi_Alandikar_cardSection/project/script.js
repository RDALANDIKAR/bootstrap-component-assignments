document.addEventListener('DOMContentLoaded', function () {
  const mergedCardContainer = document.getElementById('mergedCardContainer');

  // Example API/data source with card information
  const mergedCards = [
  //  { title: "Dynamic Card 1", description: "This is dynamically added card 1.", imgSrc: "https://via.placeholder.com/150" },
  ];

  // Function to create a card
  function createCard(title, description, imgSrc) {
    const col = document.createElement('div'); // Create a column for the card
    col.className = 'col-md-4 mb-4'; // Add Bootstrap classes for column layout and margin

    const card = document.createElement('div'); // Create the card
    card.className = 'card shadow'; // Add Bootstrap classes for card styling and shadow

    // Add the card content
    card.innerHTML = `
      <img src="${imgSrc}" class="card-img-top" alt="${title}">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <a href="#" class="btn btn-primary">Learn More</a>
      </div>
    `;

    col.appendChild(card); // Place the card inside the column
    mergedCardContainer.appendChild(col); // Add the column (with card) to the mergedCardContainer
  }

  // Loop through each card and create it dynamically
  mergedCards.forEach(card => createCard(card.title, card.description, card.imgSrc));
});
