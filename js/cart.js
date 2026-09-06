import { getCart, removeFromCart, updateQuantity, getCartTotal, updateCartCount, saveCart } from "./utils/cartUtility.js";
import { getCurrentUser } from "./utils/auth.js";

let cartItemsContainer = document.getElementById("cart-items");
let cartSummary = document.querySelector(".cart-summary");
let subtotalText = document.getElementById("subtotal-text");
let subtotalValue = document.getElementById("subtotal-value");
let totalValue = document.getElementById("total-value");
let createOrderBtn = document.getElementById("create-order-btn");

function renderCart() {
  let cart = getCart();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-cart-shopping"></i>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <a href="./products.html" class="continue-shopping-btn">
          <i class="fa-solid fa-arrow-left"></i>
          Continue Shopping
        </a>
      </div>
    `;
    cartSummary.style.display = "none";
    return;
  }

  cartSummary.style.display = "block";
  cartItemsContainer.innerHTML = "";

  cart.forEach((item) => {
    let itemTotal = (item.price * item.quantity).toFixed(2);

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="./${item.imagePath}" alt="${item.name}" />
        </div>
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-quantity">
          <button class="qty-btn minus" data-id="${item.productID}">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn plus" data-id="${item.productID}">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div class="cart-item-total">
          <p>$${itemTotal}</p>
        </div>
        <button class="cart-item-remove" data-id="${item.productID}">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
  });

  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  let subtotal = getCartTotal();
  let shipping = 2.99;
  let total = subtotal + shipping;

  subtotalText.textContent = `Subtotal (${totalItems} items)`;
  subtotalValue.textContent = `$${subtotal.toFixed(2)}`;
  totalValue.textContent = `$${total.toFixed(2)}`;

  document.querySelectorAll(".minus").forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = Number(btn.dataset.id);
      let item = cart.find((item) => item.productID === id);
      if (item.quantity > 1) {
        updateQuantity(id, item.quantity - 1);
      } else {
        removeFromCart(id);
      }
      renderCart();
    });
  });

  document.querySelectorAll(".plus").forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = Number(btn.dataset.id);
      let item = cart.find((item) => item.productID === id);
      updateQuantity(id, item.quantity + 1);
      renderCart();
    });
  });

  document.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(Number(btn.dataset.id));
      renderCart();
    });
  });
}

createOrderBtn.addEventListener("click", () => {
  let cart = getCart();
  if (cart.length === 0) return;

  let user = getCurrentUser();
  let subtotal = getCartTotal();
  let shipping = 2.99;
  let total = subtotal + shipping;

  let order = {
    orderID: Date.now(),
    user: user ? { userID: user.userID, name: user.name, email: user.email } : null,
    items: cart.map((item) => ({
      productID: item.productID,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      imagePath: item.imagePath,
    })),
    subtotal: subtotal,
    shipping: shipping,
    total: total,
    status: "pending",
    date: new Date().toISOString(),
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  saveCart([]);
  updateCartCount();

  alert("Order created successfully!");
  renderCart();
});

renderCart();
updateCartCount();
