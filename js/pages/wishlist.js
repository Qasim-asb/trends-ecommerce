import { mobileMenu } from "../components/mobileMenu.js";
import { addToCart } from "../components/cart.js";
import {createProductCard} from "../components/productCard.js"

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const emptyMessage = document.querySelector(".empty-wishlist");
const grid = document.getElementById("wishlist-grid");

document.addEventListener("DOMContentLoaded", () => {

  document.addEventListener("click", (e) => {
    const target = e.target;

    mobileMenu(target);

    if (target.classList.contains("remove-btn")) {
      const productId = target.closest(".product-card").querySelector(".wishlist-btn").dataset.id;
      removeFromWishlist(productId);
      target.closest(".product-card").remove();

      if (document.querySelectorAll(".product-card").length === 0) {
        emptyMessage.style.display = "grid";
      }
    }
  });

  if (wishlist.length === 0) {
    emptyMessage.style.display = "grid";
  } else {
    wishlist.forEach(product => {
      grid.appendChild(createProductCard(product, true));
    });
  }

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", addToCart);
  });
});

const removeFromWishlist = (productId) => {
  wishlist = wishlist.filter(item => item.id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}