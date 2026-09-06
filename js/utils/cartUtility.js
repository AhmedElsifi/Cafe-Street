function getCartKey() {
  let session = JSON.parse(localStorage.getItem("session"));
  return session ? `cart_${session.userID}` : "cart_guest";
}

function getCart() {
  return JSON.parse(localStorage.getItem(getCartKey())) || [];
}

function saveCart(cart) {
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  let cart = getCart();
  let existing = cart.find((item) => item.productID === product.productID);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
}

function removeFromCart(productID) {
  let cart = getCart();
  cart = cart.filter((item) => item.productID !== productID);
  saveCart(cart);
}

function updateQuantity(productID, quantity) {
  let cart = getCart();
  let item = cart.find((item) => item.productID === productID);

  if (item) {
    if (quantity <= 0) {
      removeFromCart(productID);
    } else {
      item.quantity = quantity;
      saveCart(cart);
    }
  }
}

function getCartCount() {
  let cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal() {
  let cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function updateCartCount() {
  let cartCountElements = document.querySelectorAll(".cart span");
  let count = getCartCount();
  cartCountElements.forEach((el) => {
    el.textContent = count;
  });
}

export { getCart, saveCart, addToCart, removeFromCart, updateQuantity, getCartCount, getCartTotal, updateCartCount };
