import { mobileMenu } from "./mobileMenu.js";
import { products } from "./products.js";
import { addToCart, updateCartCount } from "./addToCart.js";
import {createProductCard} from "./productCard.js"

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document.addEventListener("DOMContentLoaded", () => {

  document.addEventListener("click", (e) => {
    const target = e.target;

    mobileMenu(target);

    if (target.closest(".wishlist-btn")) {
      const productId = target.closest(".wishlist-btn").dataset.id;
      toggleWishlist(productId);
      updateWishlistButtons();
    }
  });

  renderProducts();
  updateCartCount();
  updateWishlistButtons();

  document.querySelector(".newsletter-form").addEventListener("submit", handleNewsletterSubmit);
});

const renderProducts = () => {
  const menSection = document.querySelector(".collection:nth-of-type(2) .product-grid");
  products.men.forEach(product => {
    menSection.appendChild(createProductCard(product));
  });

  const womenSection = document.querySelector(".collection:nth-of-type(3) .product-grid");
  products.women.forEach(product => {
    womenSection.appendChild(createProductCard(product));
  });

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", addToCart);
  });
}

const toggleWishlist = (productId) => {
  const index = wishlist.findIndex(item => item.id === productId);
  if (index === -1) {
    const product = products.men.find(p => p.id === productId) || products.women.find(p => p.id === productId);
    wishlist.push(product);
  } else {
    wishlist.splice(index, 1);
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

const updateWishlistButtons = () => {
  document.querySelectorAll(".wishlist-btn").forEach(btn => {
    const productId = btn.dataset.id;
    btn.innerHTML = wishlist.some(item => item.id === productId) ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
  });
};

const handleNewsletterSubmit = (e) => {
  e.preventDefault();
  const emailInput = e.target.querySelector('input[type="email"]');

  alert("Thank you for subscribing to our newsletter!");
  emailInput.value = "";
}