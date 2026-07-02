// Global variable to store fetched places and the currently selected place
let places = [];
let selectedPlace = null;

/**
 * Fetches places from the backend API. If 'sector' is 'all', fetches all places.
 * Otherwise, fetches places for the specified sector.
 * Updates the global 'places' array and renders them.
 * @param {string} sector - The sector to filter places by ('all' or sector name)
 */
async function fetchPlaces(sector = 'all') {
    try {
        const url = sector === 'all' ? 'http://localhost:3000/api/places' : `http://localhost:3000/api/places/${sector}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        places = await response.json();
        renderPlaces(places);
    } catch (error) {
        console.error('Error fetching places:', error);
        places = [];
        renderPlaces(places);
    }
}

/**
 * Renders the places as cards in the UI grid.
 * @param {Array} placeList - List of place objects to render.
 */
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

/**
 * Shows the detail view for a selected place.
 * @param {Object} place - The place object whose details are to be shown.
 */
function showPlaceDetail(place) {
    selectedPlace = place; // Store the selected place
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
// Hides detail view, shows categories, and fetches all places again
// User can return to main list
// Defensive: clears selectedPlace
//
// TODO: Consider using a routing library for better navigation state in future

// Add event listener for 'back to categories' button
// Only attach if element exists
const backBtn = document.getElementById("back-to-categories");
if (backBtn) {
    backBtn.addEventListener("click", () => {
        selectedPlace = null; // Clear selected place
        document.querySelector(".featured-categories").classList.remove("hidden");
        document.getElementById("place-detail").classList.add("hidden");
        fetchPlaces('all');
    });
}

// Initial fetch of all places on page load
fetchPlaces('all');

// Search functionality
// Filters the current list of places by the search input value (case-insensitive)
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPlaces = places.filter(place => 
            place.location.toLowerCase().includes(searchTerm)
        );
        renderPlaces(filteredPlaces);
    });
}

// Filter tabs functionality
// Highlights selected filter and fetches places for that sector
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => {
            btn.classList.remove("bg-yellow-800", "text-white");
            btn.classList.add("bg-gray-700", "text-white");
        });
        button.classList.remove("bg-gray-700", "text-white");
        button.classList.add("bg-yellow-800", "text-white");

        const filter = button.getAttribute("data-filter");
        fetchPlaces(filter);
    });
});

// Go to Top Button Functionality
// Shows button after scrolling and scrolls to top on click
const goToTopButton = document.getElementById("goToTop");
if (goToTopButton) {
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
}

// Start navigation button functionality
// Defensive: attach only if button exists
// Uses Google Maps Directions with two-wheeler as travel mode
// Note: 'two-wheeler' is not an official Google Maps API mode, but some browsers may accept it for bikes
const startButton = document.querySelector("#place-detail button.bg-yellow-500");
if (startButton) {
    startButton.addEventListener("click", () => {
        if (!selectedPlace) {
            alert("No place selected. Please try again.");
            return;
        }

        // Get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;

                    // Construct Google Maps URL
                    const destinationLat = selectedPlace.latitude;
                    const destinationLng = selectedPlace.longitude;
                    const travelMode = "two-wheeler"; // Default mode is bike
                    // Note: If travelMode not supported, Google Maps defaults to driving
                    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationLat},${destinationLng}&travelmode=${travelMode}`;

                    // Redirect to Google Maps
                    window.open(mapsUrl, "_blank");
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    alert("Unable to get your location. Please enable location services and try again.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    });
}

// For maintainability: Consider extracting repeated URLs and selectors to constants in future refactor.
