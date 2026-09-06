import { login, isLoggedIn } from "./utils/auth.js";

let loginForm = document.getElementById("login-form");
let loginError = document.getElementById("login-error");

if (isLoggedIn()) {
  window.location.href = "./index.html";
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let user = login(email, password);

  if (user) {
    if (user.role === "admin") {
      window.location.href = "./dashboard.html";
    } else {
      window.location.href = "./index.html";
    }
  } else {
    loginError.textContent = "Invalid email or password. Please register first.";
  }
});
