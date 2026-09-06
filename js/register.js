import { register, isLoggedIn } from "./utils/auth.js";

let registerForm = document.getElementById("register-form");
let registerError = document.getElementById("register-error");

if (isLoggedIn()) {
  window.location.href = "./index.html";
}

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    registerError.textContent = "Passwords do not match.";
    return;
  }

  let user = register(name, email, password);

  if (user) {
    window.location.href = "./index.html";
  } else {
    registerError.textContent = "Email already exists. Please sign in.";
  }
});
