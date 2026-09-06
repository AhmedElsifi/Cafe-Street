import { getCurrentUser, logout } from "./utils/auth.js";

let authControls = document.getElementById("auth-controls");
let navLinks = document.querySelector("nav ul");

function updateNavbar() {
  let user = getCurrentUser();

  let existingDashboard = document.getElementById("admin-dashboard-link");
  if (existingDashboard) {
    existingDashboard.remove();
  }

  if (user) {
    authControls.innerHTML = `
      <p>Hi <span>${user.name}</span></p>
      <button id="logout-btn" class="logout-btn">Logout</button>
    `;
    document.getElementById("logout-btn").addEventListener("click", () => {
      logout();
      window.location.href = "./index.html";
    });

    if (user.role === "admin") {
      let dashboardLink = document.createElement("li");
      dashboardLink.id = "admin-dashboard-link";
      dashboardLink.className = "nav-link underline-effect";
      dashboardLink.innerHTML = `<a href="./dashboard.html">Admin Dashboard</a>`;
      navLinks.appendChild(dashboardLink);
    }
  } else {
    authControls.innerHTML = `<a href="./login.html" class="login-btn">Login</a>`;
  }
}

updateNavbar();
