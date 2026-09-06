import {
  getProducts,
  addProduct,
  removeProduct,
  updateProduct,
} from "./utils/productUtility.js";
import { initialUsers } from "./data.js";

let productsContainer = document.getElementById("products-table-body");
let usersContainer = document.getElementById("users-table-body");
let ordersContainer = document.getElementById("orders-table-body");
let productSearch = document.getElementById("product-search");
let userSearch = document.getElementById("user-search");
let orderSearch = document.getElementById("order-search");
let addProductBtn = document.getElementById("add-product-btn");
let addUserBtn = document.getElementById("add-user-btn");
let productModal = document.getElementById("product-modal");
let userModal = document.getElementById("user-modal");
let productForm = document.getElementById("product-form");
let userForm = document.getElementById("user-form");

let products = getProducts();
let users = JSON.parse(localStorage.getItem("users")) || [...initialUsers];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify(users));
}

function renderProducts(renderedProducts) {
  productsContainer.innerHTML = "";

  renderedProducts.forEach((product) => {
    let categoryClass = product.category;
    let categoryLabel =
      product.category === "hot"
        ? "Hot Coffee"
        : product.category === "cold"
        ? "Cold Coffee"
        : "Food";

    productsContainer.innerHTML += `
      <tr>
        <td><img src="./${product.imagePath}" alt="${product.name}" /></td>
        <td>${product.name}</td>
        <td><span class="category-tag ${categoryClass}">${categoryLabel}</span></td>
        <td>$${product.price.toFixed(2)}</td>
        <td class="actions">
          <button class="edit-btn product-edit-btn" data-id="${product.productID}">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="delete-btn product-delete-btn" data-id="${product.productID}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>`;
  });

  document.querySelectorAll(".product-edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let product = products.find((p) => p.productID === Number(btn.dataset.id));
      document.getElementById("modal-title").textContent = "Edit Product";
      document.getElementById("product-id").value = product.productID;
      document.getElementById("product-name").value = product.name;
      document.getElementById("product-category").value = product.category;
      document.getElementById("product-price").value = product.price;
      document.getElementById("product-description").value = product.description;
      document.getElementById("product-stock").value = product.stock;
      document.getElementById("product-image").value = product.imagePath;
      productModal.classList.add("show");
    });
  });

  document.querySelectorAll(".product-delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this product?")) {
        removeProduct(Number(btn.dataset.id));
        products = getProducts();
        renderProducts(products);
        updateStats();
      }
    });
  });
}

function renderUsers(renderedUsers) {
  usersContainer.innerHTML = "";

  renderedUsers.forEach((user) => {
    usersContainer.innerHTML += `
      <tr>
        <td><div class="user-avatar"><i class="fa-solid fa-user"></i></div></td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><span class="role-tag ${user.role}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></td>
        <td class="actions">
          <button class="edit-btn user-edit-btn" data-id="${user.userID}">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="delete-btn user-delete-btn" data-id="${user.userID}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>`;
  });

  document.querySelectorAll(".user-edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let user = users.find((u) => u.userID === Number(btn.dataset.id));
      document.getElementById("user-modal-title").textContent = "Edit User";
      document.getElementById("user-id").value = user.userID;
      document.getElementById("user-name").value = user.name;
      document.getElementById("user-email").value = user.email;
      document.getElementById("user-password").value = user.password || "";
      document.getElementById("user-role").value = user.role;
      userModal.classList.add("show");
    });
  });

  document.querySelectorAll(".user-delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this user?")) {
        users = users.filter((u) => u.userID !== Number(btn.dataset.id));
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers(users);
        updateStats();
      }
    });
  });
}

function renderOrders(renderedOrders) {
  ordersContainer.innerHTML = "";

  if (renderedOrders.length === 0) {
    ordersContainer.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 40px; color: #7e7d7a;">
          No orders found
        </td>
      </tr>
    `;
    return;
  }

  renderedOrders.forEach((order) => {
    let itemsList = order.items.map((item) => `${item.name} x${item.quantity}`).join(", ");
    let date = new Date(order.date).toLocaleDateString();
    let statusClass = order.status === "pending" ? "hot" : order.status === "completed" ? "cold" : "food";

    ordersContainer.innerHTML += `
      <tr>
        <td>#${order.orderID}</td>
        <td>${order.user ? order.user.name : "Guest"}</td>
        <td>${itemsList}</td>
        <td>$${order.total.toFixed(2)}</td>
        <td><span class="category-tag ${statusClass}">${order.status}</span></td>
        <td>${date}</td>
        <td class="actions">
          <button class="edit-btn order-status-btn" data-id="${order.orderID}" data-status="${order.status}">
            <i class="fa-solid fa-check"></i>
          </button>
          <button class="delete-btn order-delete-btn" data-id="${order.orderID}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  document.querySelectorAll(".order-status-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = Number(btn.dataset.id);
      let order = orders.find((o) => o.orderID === id);
      if (order.status === "pending") {
        order.status = "completed";
      } else {
        order.status = "pending";
      }
      localStorage.setItem("orders", JSON.stringify(orders));
      renderOrders(orders);
    });
  });

  document.querySelectorAll(".order-delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this order?")) {
        orders = orders.filter((o) => o.orderID !== Number(btn.dataset.id));
        localStorage.setItem("orders", JSON.stringify(orders));
        renderOrders(orders);
        updateStats();
      }
    });
  });
}

function updateStats() {
  document.getElementById("total-products").textContent = products.length;
  document.getElementById("total-users").textContent = users.length;
  document.getElementById("total-orders").textContent = orders.length;
}

addProductBtn.addEventListener("click", () => {
  document.getElementById("modal-title").textContent = "Add Product";
  productForm.reset();
  document.getElementById("product-id").value = "";
  productModal.classList.add("show");
});

addUserBtn.addEventListener("click", () => {
  document.getElementById("user-modal-title").textContent = "Add User";
  userForm.reset();
  document.getElementById("user-id").value = "";
  userModal.classList.add("show");
});

document.querySelector(".close-btn").addEventListener("click", () => {
  productModal.classList.remove("show");
});

document.querySelector(".user-close-btn").addEventListener("click", () => {
  userModal.classList.remove("show");
});

window.addEventListener("click", (e) => {
  if (e.target === productModal) productModal.classList.remove("show");
  if (e.target === userModal) userModal.classList.remove("show");
});

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = document.getElementById("product-id").value;
  let productData = {
    name: document.getElementById("product-name").value,
    category: document.getElementById("product-category").value,
    price: parseFloat(document.getElementById("product-price").value),
    description: document.getElementById("product-description").value,
    stock: parseInt(document.getElementById("product-stock").value),
    imagePath: document.getElementById("product-image").value,
  };

  if (id) {
    updateProduct(Number(id), productData);
  } else {
    productData.productID = Date.now();
    productData.rating = 0;
    addProduct(productData);
  }

  products = getProducts();
  renderProducts(products);
  updateStats();
  productModal.classList.remove("show");
});

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = document.getElementById("user-id").value;
  let userData = {
    name: document.getElementById("user-name").value,
    email: document.getElementById("user-email").value,
    password: document.getElementById("user-password").value,
    role: document.getElementById("user-role").value,
  };

  if (id) {
    let index = users.findIndex((u) => u.userID === Number(id));
    users[index] = { ...users[index], ...userData };
  } else {
    userData.userID = Date.now();
    users.push(userData);
  }

  localStorage.setItem("users", JSON.stringify(users));
  renderUsers(users);
  updateStats();
  userModal.classList.remove("show");
});

productSearch.addEventListener("input", () => {
  let query = productSearch.value.toLowerCase();
  let filtered = products.filter(
    (p) => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

userSearch.addEventListener("input", () => {
  let query = userSearch.value.toLowerCase();
  let filtered = users.filter(
    (u) => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
  );
  renderUsers(filtered);
});

orderSearch.addEventListener("input", () => {
  let query = orderSearch.value.toLowerCase();
  let filtered = orders.filter(
    (o) =>
      (o.user && o.user.name.toLowerCase().includes(query)) ||
      (o.user && o.user.email.toLowerCase().includes(query)) ||
      o.status.toLowerCase().includes(query)
  );
  renderOrders(filtered);
});

renderProducts(products);
renderUsers(users);
renderOrders(orders);
updateStats();
