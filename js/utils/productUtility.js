import initialProducts from "../data.js";

if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(initialProducts));
}

const products = JSON.parse(localStorage.getItem("products"));

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((product) => product.productID === id);
}

export function getProductsByCategory(category) {
  return products.filter((product) => product.category === category);
}

export function getCategories() {
  return [...new Set(products.map((product) => product.category))];
}

export function searchProducts(query) {
  return products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase()),
  );
}

export function getProductsAscendingly(products) {
  return [...products].sort((a, b) => a.price - b.price);
}

export function getProductsDescendingly(products) {
  return [...products].sort((a, b) => b.price - a.price);
}

export function addProduct(product) {
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
  return product;
}

export function removeProduct(id) {
  const index = products.findIndex((product) => product.productID === id);
  if (index !== -1) {
    const removed = products.splice(index, 1)[0];
    localStorage.setItem("products", JSON.stringify(products));
    return removed;
  }
  return null;
}

export function updateProduct(id, updates) {
  const index = products.findIndex((product) => product.productID === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updates };
    localStorage.setItem("products", JSON.stringify(products));
    return products[index];
  }
  return null;
}
