import { initialUsers } from "../data.js";

let storedUsers = JSON.parse(localStorage.getItem("users"));
let users = storedUsers && storedUsers[0] && storedUsers[0].password ? storedUsers : [...initialUsers];

if (!storedUsers || !storedUsers[0] || !storedUsers[0].password) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function login(email, password) {
  let user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    let session = {
      userID: user.userID,
      name: user.name,
      email: user.email,
      role: user.role,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem("session", JSON.stringify(session));
    return user;
  }
  return null;
}

export function register(name, email, password) {
  let exists = users.find((u) => u.email === email);
  if (exists) {
    return null;
  }
  let newUser = {
    userID: Date.now(),
    name,
    email,
    password,
    role: "customer",
  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  let session = {
    userID: newUser.userID,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    loginTime: new Date().toISOString(),
  };
  localStorage.setItem("session", JSON.stringify(session));
  return newUser;
}

export function logout() {
  localStorage.removeItem("session");
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("session"));
}

export function isLoggedIn() {
  return getCurrentUser() !== null;
}
