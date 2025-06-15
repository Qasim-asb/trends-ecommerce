import { products } from "../data/products.js";

const cartCount = document.querySelector(".cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addToCart = (e) => {
  const productId = e.target.dataset.id;
  let product;

  product = products.men.find(p => p.id === productId) || products.women.find(p => p.id === productId);

  if (product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    showAddToCartFeedback(e.target);
  }
}

const updateCartCount = () => {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? "flex" : "none";
}

const showAddToCartFeedback = (button) => {
  const originalText = button.textContent;
  button.textContent = "Added!";
  button.style.backgroundColor = "var(--success-color)";

  setTimeout(() => {
    button.textContent = originalText;
    button.style.backgroundColor = 'var(--dark-color)';
  }, 1500);
}

export { addToCart, updateCartCount }