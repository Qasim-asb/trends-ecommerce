import { products } from "./products.js";

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const cartCount = document.querySelector(".cart-count");
const newsletterForm = document.querySelector(".newsletter-form");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  hamburger.addEventListener("click", toggleMobileMenu);

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  renderProducts();
  updateCartCount();

  newsletterForm.addEventListener("submit", handleNewsletterSubmit);
});

const toggleMobileMenu = () => {
  navLinks.classList.toggle("active");
  hamburger.innerHTML = navLinks.classList.contains("active") ? "<i class='fa-solid fa-xmark'></i>" : "<i class='fa-solid fa-bars'></i>";
}

const closeMobileMenu = () => {
  navLinks.classList.remove("active");
  hamburger.innerHTML = "<i class='fa-solid fa-bars'></i>";
}

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

const createProductCard = (product) => {
  const card = document.createElement("div");
  card.className = "product-card";

  const badgeHTML = product.badge ? `<div class="product-badge ${product.badge === "Sale" ? "sale" : ""}">${product.badge}</div>` : "";

  const originalPriceHTML = product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : "";

  const starRating = createStarRating(product.rating);

  card.innerHTML = `
    ${badgeHTML}
    <img src="${product.image}" alt="${product.name}" loading="lazy">
    <div class="product-info">
      <h3 class="product-title">${product.name}</h3>
      <div class="product-rating">
        ${starRating}
        <span>(${product.reviews})</span>
      </div>
      <div class="product-price">
        <span class="current-price">$${product.price.toFixed(2)}</span>
        ${originalPriceHTML}
      </div>
      <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
    </div>
  `;

  return card;
}

const createStarRating = (rating) => {
  let stars = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fa-solid fa-star"></i>';
  }

  if (hasHalfStar) {
    stars += '<i class="fa-solid fa-star-half-stroke"></i>';
  }

  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="fa-regular fa-star"></i>';
  }

  return stars;
}

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

const handleNewsletterSubmit = (e) => {
  e.preventDefault();
  const emailInput = e.target.querySelector('input[type="email"]');

  alert("Thank you for subscribing to our newsletter!");
  emailInput.value = "";
}