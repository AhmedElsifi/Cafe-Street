import {
  getCategories,
  getProducts,
  getProductsAscendingly,
  getProductsDescendingly,
} from "./utils/productUtility.js";
import { addToCart, updateCartCount } from "./utils/cartUtility.js";

let categorySelector = document.getElementById("category-selector");
let sortSelector = document.getElementById("sort-selector");
let searchInput = document.getElementById("search-input");

let products = getProducts();
let categories = getCategories();

categories.forEach((category) => {
  const categoryHTML = `<option value="${category}">${category}</option>`;

  categorySelector.innerHTML += categoryHTML;
});

renderProducts(products);
updateCartCount();

function renderProducts(renderedProducts) {
  let container = document.getElementById("products-container");

  container.innerHTML = "";

  if (renderedProducts.length === 0) {
    container.innerHTML = `
      <div class="no-products">
        <i class="fa-solid fa-search"></i>
        <h3>No products found</h3>
        <p>Try adjusting your search or filter criteria</p>
      </div>
    `;
    return;
  }

  renderedProducts.forEach((product) => {
    const productHTML = `
            <div class="product-card">
              <div class="product-image">
                <p class="product-tag">${product.category}</p>
                <img
                  src="${product.imagePath}"
                  alt="${product.name}"
                />
                <button type="button" class="product-add-to-cart-btn" data-id="${product.productID}">
                  <i class="fa-solid fa-cart-plus"></i>
                </button>
              </div>
              <div class="product-details">
                <h3>${product.name}</h3>
                <p class="product-description">
                  ${product.description}
                </p>
                <div class="product-meta">
                  <span class="product-rating">
                    <i class="fa-solid fa-star"></i>
                    ${product.rating}
                  </span>
                  <span class="product-price">$${product.price}</span>
                </div>
              </div>
            </div>`;

    container.innerHTML += productHTML;
  });

  document.querySelectorAll(".product-add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let product = products.find((p) => p.productID === Number(btn.dataset.id));
      addToCart(product);
    });
  });
}

categorySelector.addEventListener("change", () => {
  applyFilters();
});

sortSelector.addEventListener("change", () => {
  applyFilters();
});

searchInput.addEventListener("input", () => {
  applyFilters();
});

function applyFilters() {
  let filteredProducts = getProducts();
  let selectedCategory = categorySelector.value;
  let selectedSort = sortSelector.value;
  let searchQuery = searchInput.value.toLowerCase();

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery),
    );
  }

  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory,
    );
  }

  if (selectedSort === "price-asc") {
    filteredProducts = getProductsAscendingly(filteredProducts);
  } else if (selectedSort === "price-desc") {
    filteredProducts = getProductsDescendingly(filteredProducts);
  }

  renderProducts(filteredProducts);
}
