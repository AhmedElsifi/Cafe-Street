import { getProducts, getCategories } from "./utils/productUtility.js";
import { addToCart, updateCartCount } from "./utils/cartUtility.js";

let container = document.getElementById("carousel-products");
let prevBtn = document.getElementById("popular-carousel-prev");
let nextBtn = document.getElementById("popular-carousel-next");

let products = getProducts();
let categories = getCategories();

updateCartCount();

products.forEach((product) => {
  const productHTML = `
            <div class="carousel-product">
              <div class="carousel-product-image">
                <p class="carousel-product-tag">${product.category}</p>
                <img
                  src="${product.imagePath}"
                  alt="${product.name}"
                />
                <button type="button" class="carousel-product-add-to-cart-btn" data-id="${product.productID}">
                  <i class="fa-solid fa-cart-plus"></i>
                </button>
              </div>
              <div class="carousel-product-details">
                <div class="carousel-product-details-header">
                  <h3>${product.name}</h3>
                  <h4>$${product.price}</h4>
                </div>
              </div>
            </div>`;

  container.innerHTML += productHTML;
});

let scrollAmount = 0;
let productWidth = container.querySelector(".carousel-product").offsetWidth + 18;
let visibleProducts = 3;
let totalProducts = products.length;
let maxScroll = Math.max(0, (totalProducts - visibleProducts) * productWidth);

nextBtn.addEventListener("click", () => {
  if (scrollAmount < maxScroll) {
    scrollAmount = Math.min(scrollAmount + productWidth, maxScroll);
    container.style.transform = `translateX(-${scrollAmount}px)`;
  }
});

prevBtn.addEventListener("click", () => {
  if (scrollAmount > 0) {
    scrollAmount = Math.max(scrollAmount - productWidth, 0);
    container.style.transform = `translateX(-${scrollAmount}px)`;
  }
});

document.querySelectorAll(".carousel-product-add-to-cart-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    let product = products.find((p) => p.productID === Number(btn.dataset.id));
    addToCart(product);
  });
});

let categoriesContainer = document.getElementById("categories-container");

categories.forEach((category) => {
  let categoryLabel = category === "hot" ? "Hot Coffee" : category === "cold" ? "Cold Coffee" : "Food";
  let icon = category === "hot" ? "fa-mug-hot" : category === "cold" ? "fa-glass-water" : "fa-utensils";

  categoriesContainer.innerHTML += `
    <a href="./products.html" class="category-card">
      <div class="category-icon">
        <i class="fa-solid ${icon}"></i>
      </div>
      <h3>${categoryLabel}</h3>
    </a>
  `;
});
