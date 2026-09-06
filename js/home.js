import { getProducts } from "./utils/productUtility.js";
import { addToCart, updateCartCount } from "./utils/cartUtility.js";

let container = document.getElementById("carousel-products");

let products = getProducts();

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

document.querySelectorAll(".carousel-product-add-to-cart-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    let product = products.find((p) => p.productID === Number(btn.dataset.id));
    addToCart(product);
  });
});
