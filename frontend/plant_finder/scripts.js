// Example data (this should come from your backend)
const plants = [
    {
        name: 'Rose',
        scientificName: 'Rosa',
        image: 'placeholder-plant.jpg',
        type: 'Flower',
        sunExposure: 'Full Sun'
    },
    {
        name: 'Fern',
        scientificName: 'Polypodiopsida',
        image: 'placeholder-plant.jpg',
        type: 'Shade Plant',
        sunExposure: 'Partial Shade'
    }
    // Add more plant data here
]
// Function to render plant cards
function renderPlantCards(plantsToDisplay) {
    const resultsGrid = document.getElementById('resultsGrid');
    resultsGrid.innerHTML = ''; // Clear previous results
    plantsToDisplay.forEach(plant => {
        const plantCard = document.createElement('div');
        plantCard.classList.add('plant-card');
        plantCard.setAttribute('data-name', plant.name.toLowerCase());
        plantCard.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}">
            <h3>${plant.name}</h3>
            <p>${plant.scientificName}</p>
            <button>Add to Collection</button>
        `;

        resultsGrid.appendChild(plantCard);
    });
}
// Initial render with all plants
renderPlantCards(plants);

// Function to handle search
function searchPlants() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const plantType = document.getElementById('plantTypeSelect').value;
    const sunExposure = document.getElementById('sunExposureSelect').value;
    const filteredPlants = plants.filter(plant => {
        return (
            (plant.name.toLowerCase().includes(searchInput) || plant.scientificName.toLowerCase().includes(searchInput)) &&
            (plant.type === plantType || plantType === '') &&
            (plant.sunExposure === sunExposure || sunExposure === '')
        );
    });

    renderPlantCards(filteredPlants);
}

// Function to highlight and scroll to the plant
function highlightPlant() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const plantCards = document.querySelectorAll('.plant-card');

    plantCards.forEach(card => {
        card.classList.remove('highlight');
        if (card.getAttribute('data-name').includes(searchInput)) {
            card.classList.add('highlight');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

document.getElementById('search-bar').addEventListener('input', function() {
    let searchTerm = this.value.toLowerCase();
    let plantCards = document.querySelectorAll('.plant-card');

    plantCards.forEach(card => {
        let plantName = card.querySelector('.plant-info h3').textContent.toLowerCase();
        if (plantName.includes(searchTerm)) {
            card.classList.add('highlight');
        } else {
            card.classList.remove('highlight');
        }
    });
});
        
document.getElementById('show-more').addEventListener('click', function() {
    fetch('more-plants.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('more-plant-cards').innerHTML = data;
            document.getElementById('show-more').style.display = 'none';
        });
});

    function addToCollection(button) {
        // Find the plant card associated with this button
        const plantCard = button.closest('.plant-card');

        // Clone the plant card to add it to the collection
        const clonedCard = plantCard.cloneNode(true);

        // Remove the "Add to Collection" button in the cloned card
        clonedCard.querySelector('.add-to-collection').remove();

        // Append the cloned card to the collection
        document.getElementById('collection-cards').appendChild(clonedCard);

        // Optionally, give some feedback to the user
        alert('Added to your collection!');
    }

    function saveCollection() {
        const collectionHTML = document.getElementById('collection-cards').innerHTML;
        localStorage.setItem('plantCollection', collectionHTML);
    }
    
    function loadCollection() {
        const savedCollection = localStorage.getItem('plantCollection');
        if (savedCollection) {
            document.getElementById('collection-cards').innerHTML = savedCollection;
        }
    }
    
    // Call this function when the page loads
window.onload = loadCollection;
    function addToCollection(button) {
        const plantCard = button.closest('.plant-card');
        const clonedCard = plantCard.cloneNode(true);
        clonedCard.querySelector('.add-to-collection').remove();
        document.getElementById('collection-cards').appendChild(clonedCard);
        saveCollection(); // Save to localStorage
        alert('Added to your collection!');
    }
    document.getElementById('show-more').addEventListener('click', function() {
        console.log('Show More button clicked');
        fetch('more-plants.html')
            .then(response => {
                console.log('Response status:', response.status);
                return response.text();
            })
            .then(data => {
                console.log('Data received:', data);
                document.getElementById('plant-cards').innerHTML += data;
            })
            .catch(error => console.error('Error loading more plants:', error));
    });

    // Check if collection exists in local storage
let plantCollection = JSON.parse(localStorage.getItem('plantCollection')) || [];

// Function to add plant to collection
function addToCollection(plant) {
    plantCollection.push(plant);
    localStorage.setItem('plantCollection', JSON.stringify(plantCollection));
    alert(`${plant.name} has been added to your collection!`);
}

// Example binding of "Add to Collection" buttons
document.querySelectorAll('.add-to-collection').forEach(button => {
    button.addEventListener('click', function() {
        const plant = {
            name: this.getAttribute('data-plant-name'),
            image: this.getAttribute('data-plant-image')
        };
        addToCollection(plant);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const plantCollection = [];
    const collectionContainer = document.getElementById('collection-container');

    // Function to add plant to the collection
    function addPlantToCollection(plantName, plantImage, plantDescription) {
        // Create a new card for the collection
        const plantCard = document.createElement('div');
        plantCard.classList.add('plant-card');
        plantCard.innerHTML = `
            <img src="${plantImage}" alt="${plantName}">
            <div class="plant-info">
                <h3>${plantName}</h3>
                <p>${plantDescription}</p>
            </div>
        `;
        collectionContainer.appendChild(plantCard);

        // Add plant to the array
        plantCollection.push({ name: plantName, image: plantImage, description: plantDescription });
    }

    // Event listeners for all "Add to Collection" buttons
    document.querySelectorAll('.add-to-collection').forEach(button => {
        button.addEventListener('click', function() {
            const plantCard = this.closest('.plant-card');
            const plantName = plantCard.querySelector('h3').textContent;
            const plantImage = plantCard.querySelector('img').src;
            const plantDescription = plantCard.querySelector('p').textContent;

            addPlantToCollection(plantName, plantImage, plantDescription);
            alert(`${plantName} has been added to your collection!`);
        });
    });

    // Display collection on clicking "My Plant Collections"
    document.querySelector('.plant-collections a').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('my-plant-collection').style.display = 'block';
    });

    // Close collection view
    document.getElementById('close-collection').addEventListener('click', function() {
        document.getElementById('my-plant-collection').style.display = 'none';
    });
});

// showmore

// Function to load more plant cards from the more-plants.html file
function loadMore() {
    fetch('more-plants.html')
        .then(response => response.text())
        .then(data => {
            // Create a temporary div to hold the fetched HTML content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            // Extract the plant cards from the fetched HTML
            const newCards = tempDiv.querySelectorAll('.plant-card');

            // Get the container where new plant cards will be added
            const container = document.getElementById('plant-cards-container');

            // Append each new plant card to the container
            newCards.forEach(card => {
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading more plants:', error));

    return false; // Prevent the default action of the anchor tag
}

// scripts.js
async function loadPlantCollection() {
    try {
        const response = await fetch('http://localhost:5000/my-plant-collection');
        const plants = await response.json();
        const collectionContainer = document.getElementById('collection-container');
        collectionContainer.innerHTML = ''; // Clear existing content

        plants.forEach(plant => {
            const plantCard = document.createElement('div');
            plantCard.className = 'plant-card';
            plantCard.innerHTML = `
                <img src="${plant.image}" alt="${plant.name}">
                <div class="plant-info">
                    <h3>${plant.name}</h3>
                    <p>${plant.description}</p>
                </div>
            `;
            collectionContainer.appendChild(plantCard);
        });

        document.getElementById('my-plant-collection').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }
}

document.querySelector('.plant-collections a').addEventListener('click', () => {
    loadPlantCollection();
});

document.getElementById('close-collection').addEventListener('click', () => {
    document.getElementById('my-plant-collection').style.display = 'none';
});


document.addEventListener('DOMContentLoaded', function () {
    // Get the Planting Ideas link and the form container
    const plantingIdeasLink = document.querySelector('a[href="#planting-ideas"]');
    const plantingIdeasForm = document.getElementById('planting-ideas-form');
    const closePlantingIdeasButton = document.getElementById('close-planting-ideas');

    // Add click event listener to the Planting Ideas link
    plantingIdeasLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default anchor behavior
        plantingIdeasForm.style.display = 'block'; // Show the form
    });

    // Add click event listener to the close button in the form
    closePlantingIdeasButton.addEventListener('click', function () {
        plantingIdeasForm.style.display = 'none'; // Hide the form
    });
});
