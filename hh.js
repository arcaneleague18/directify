// Sample place data
const places = [
    { id: 1, name: "Union Bank", image: "spiders.jpg", category: "Banks", isBestSeller: true, isNewArrival: false, description: "Union Bank at JNTUH is an on-campus branch offering comprehensive banking services to students, faculty." },
    { id: 2, name: "CSE Block", image: "https://via.placeholder.com/300?text=CSE", category: "Departments", isBestSeller: false, isNewArrival: true, description: "Department of Computer Science Engineering with advanced computing labs and seminar halls." },
    { id: 3, name: "Krishna Hostel", image: "https://via.placeholder.com/300?text=Hostel", category: "Hostels", isBestSeller: true, isNewArrival: false, description: "Krishna boys hostel adjacent to Gowthami hostel for senior and junior boys." },
    { id: 4, name: "ECE Block", image: "https://via.placeholder.com/300?text=ECE", category: "Departments", isBestSeller: false, isNewArrival: true, description: "Department of Electronics and Communication Engineering with digital system labs." },
];

// Function to render places
function renderPlaces(placeList) {
    const placeGrid = document.querySelector(".place-grid");
    placeGrid.innerHTML = "";
    placeList.forEach(place => {
        const placeCard = document.createElement("div");
        placeCard.className = "bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer";
        placeCard.innerHTML = `
            <img src="${place.image}" alt="${place.name}" class="w-full h-24 object-cover">
            <div class="p-2">
                <h3 class="text-sm font-semibold text-white">${place.name}</h3>
            </div>
        `;
        placeCard.addEventListener("click", () => showPlaceDetail(place));
        placeGrid.appendChild(placeCard);
    });
}

// Function to show place detail
function showPlaceDetail(place) {
    const placeDetail = document.getElementById("place-detail");
    const detailImage = document.getElementById("detail-image");
    const detailName = document.getElementById("detail-name");
    const detailDescription = document.getElementById("detail-description");

    detailImage.src = place.image;
    detailName.textContent = place.name;
    detailDescription.textContent = place.description;

    document.querySelector(".featured-categories").classList.add("hidden");
    placeDetail.classList.remove("hidden");
}

// Function to go back to categories
document.getElementById("back-to-categories").addEventListener("click", () => {
    document.querySelector(".featured-categories").classList.remove("hidden");
    document.getElementById("place-detail").classList.add("hidden");
    renderPlaces(places); // Re-render places to reset the grid
});

// Initial render of all places
renderPlaces(places);

// Search functionality
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPlaces = places.filter(place => 
        place.name.toLowerCase().includes(searchTerm)
    );
    renderPlaces(filteredPlaces);
});

// Filter tabs functionality
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Update active button styling
        filterButtons.forEach(btn => {
            btn.classList.remove("bg-yellow-800", "text-white");
            btn.classList.add("bg-gray-700", "text-white");
        });
        button.classList.remove("bg-gray-700", "text-white");
        button.classList.add("bg-yellow-800", "text-white");

        // Filter places
        const filter = button.getAttribute("data-filter");
        let filteredPlaces;
        if (filter === "all") {
            filteredPlaces = places;
        } else {
            filteredPlaces = places.filter(place => place.category === filter);
        }
        renderPlaces(filteredPlaces);
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