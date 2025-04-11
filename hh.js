// Sample product data
const products = [
    { id: 1, name: "Modern Comfort Sofa", price: 1299, image: "spiders.jpg", category: "Living Room", isBestSeller: true, isNewArrival: false, description: "A stylish and comfortable sofa for your living room." },
    { id: 2, name: "Elegant Dining Set", price: 1899, image: "https://via.placeholder.com/300?text=Dining+Set", category: "Dining", isBestSeller: false, isNewArrival: true, description: "A premium dining set for family gatherings." },
    { id: 3, name: "Modern Bed Frame", price: 989, image: "https://via.placeholder.com/300?text=Bed", category: "Bedroom", isBestSeller: true, isNewArrival: false, description: "Sleek bed frame for a modern bedroom." },
    { id: 4, name: "ABB INITIO GYM PVC Dumbbell Set 5kg x 2", price: 799, image: "https://via.placeholder.com/300?text=Dumbbell", category: "Office", isBestSeller: false, isNewArrival: true, description: "PVC Dumbbells, Hex Dumbbells, Home Gym Fixed Weight Dumbbell (5 kg)" },
];

// Function to render products
function renderProducts(productList) {
    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = "";
    productList.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-24 object-cover">
            <div class="p-2">
                <h3 class="text-sm font-semibold text-white">${product.name}</h3>
                <p class="text-yellow-400 text-sm">$${product.price}</p>
            </div>
        `;
        productCard.addEventListener("click", () => showProductDetail(product));
        productGrid.appendChild(productCard);
    });
}

// Function to show product detail
function showProductDetail(product) {
    const productDetail = document.getElementById("product-detail");
    const detailImage = document.getElementById("detail-image");
    const detailName = document.getElementById("detail-name");
    const detailDescription = document.getElementById("detail-description");

    detailImage.src = product.image;
    detailName.textContent = product.name;
    detailDescription.textContent = product.description;

    document.querySelector(".featured-products").classList.add("hidden");
    productDetail.classList.remove("hidden");
}

// Function to go back to products
document.getElementById("back-to-products").addEventListener("click", () => {
    document.querySelector(".featured-products").classList.remove("hidden");
    document.getElementById("product-detail").classList.add("hidden");
    renderProducts(products); // Re-render products to reset the grid
});

// Initial render of all products
renderProducts(products);

// Search functionality
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
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

        // Filter products
        const filter = button.getAttribute("data-filter");
        let filteredProducts;
        if (filter === "all") {
            filteredProducts = products;
        } else if (filter === "best") {
            filteredProducts = products.filter(product => product.isBestSeller);
        } else if (filter === "new") {
            filteredProducts = products.filter(product => product.isNewArrival);
        }
        renderProducts(filteredProducts);
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