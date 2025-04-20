// Global variable to store fetched places
let places = [];

async function fetchPlaces(sector = 'all') {
    try {
        const url = sector === 'all' ? 'http://localhost:3000/api/places' : `http://localhost:3000/api/places/${sector}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        places = await response.json();
        renderPlaces(places);
    } catch (error) {
        console.error('Error fetching places:', error);
        places = []; // Fallback to empty array if fetch fails
        renderPlaces(places);
    }
}

function renderPlaces(placeList) {
    const placeGrid = document.querySelector(".place-grid");
    placeGrid.innerHTML = "";
    placeList.forEach(place => {
        const placeCard = document.createElement("div");
        placeCard.className = "bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer";
        const imageSrc = place.image_url ? `http://localhost:3000/${place.image_url}` : `https://via.placeholder.com/300?text=${encodeURIComponent(place.location)}`;
        placeCard.innerHTML = `
            <img src="${imageSrc}" alt="${place.location}" class="w-full h-24 object-cover">
            <div class="p-2">
                <h3 class="text-sm font-semibold text-white">${place.location}</h3>
            </div>
        `;
        placeCard.addEventListener("click", () => showPlaceDetail(place));
        placeGrid.appendChild(placeCard);
    });
}

function showPlaceDetail(place) {
    const placeDetail = document.getElementById("place-detail");
    const detailImage = document.getElementById("detail-image");
    const detailName = document.getElementById("detail-name");
    const detailDescription = document.getElementById("detail-description");
    const detailCoordinates = document.getElementById("detail-coordinates");

    detailImage.src = place.image_url ? `http://localhost:3000/${place.image_url}` : `https://via.placeholder.com/300?text=${encodeURIComponent(place.location)}`;
    detailName.textContent = place.location;
    detailDescription.textContent = place.description;
    detailCoordinates.textContent = `Latitude: ${place.latitude}, Longitude: ${place.longitude}`;

    document.querySelector(".featured-categories").classList.add("hidden");
    placeDetail.classList.remove("hidden");
}
// Function to go back to categories
document.getElementById("back-to-categories").addEventListener("click", () => {
    document.querySelector(".featured-categories").classList.remove("hidden");
    document.getElementById("place-detail").classList.add("hidden");
    fetchPlaces('all'); // Re-fetch all places to reset the grid
});

// Initial fetch of all places
fetchPlaces('all');

// Search functionality
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPlaces = places.filter(place => 
        place.location.toLowerCase().includes(searchTerm)
    );
    renderPlaces(filteredPlaces);
});

// Filter tabs functionality
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Update active button styling
        filterButtons.forEach(btn => {
            btn.classList.remove("bg-green-700", "text-white");
            btn.classList.add("bg-gray-700", "text-white");
        });
        button.classList.remove("bg-gray-700", "text-white");
        button.classList.add("bg-green-700", "text-white");

        // Filter places
        const filter = button.getAttribute("data-filter");
        fetchPlaces(filter);
    });
});

// Go to Top Button Functionality
const goToTopButton = document.getElementById("goToTop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        goToTopButton.classList.remove("hidden");
    } else {
        goToTopButton.classList.add("hidden");
    }
});

goToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});