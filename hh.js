// Sample product data
const products = [
    { id: 1, name: "Modern Comfort Sofa", price: 1299, image: "https://via.placeholder.com/300?text=Sofa", category: "Living Room", isBestSeller: true, isNewArrival: false },
    { id: 2, name: "Elegant Dining Set", price: 1899, image: "https://via.placeholder.com/300?text=Dining+Set", category: "Dining", isBestSeller: false, isNewArrival: true },
    { id: 3, name: "Modern Bed Frame", price: 989, image: "https://via.placeholder.com/300?text=Bed", category: "Bedroom", isBestSeller: true, isNewArrival: false },
    { id: 4, name: "Executive Office Desk", price: 799, image: "https://via.placeholder.com/300?text=Desk", category: "Office", isBestSeller: false, isNewArrival: true },
];

// Function to render products
function renderProducts(productList) {
    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = "";
    productList.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "bg-gray-800 rounded-lg shadow-md overflow-hidden";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-24 object-cover">
            <div class="p-2">
                <h3 class="text-sm font-semibold text-white">${product.name}</h3>
                <p class="text-yellow-400 text-sm">$${product.price}</p>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

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