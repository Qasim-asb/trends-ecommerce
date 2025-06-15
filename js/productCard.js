export const createProductCard = (product, isWishlistPage = false) => {
  const card = document.createElement("div");
  card.className = "product-card";

  const badgeHTML = product.badge ? `<div class="product-badge ${product.badge === "Sale" ? "sale" : ""}">${product.badge}</div>` : "";

  const originalPriceHTML = product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : "";

  card.innerHTML = `
    ${badgeHTML}
    <button class="wishlist-btn" data-id="${product.id}">
      <i class="fas fa-heart"></i>
    </button>
    <img src="${product.image}" alt="${product.name}" loading="lazy">
    <div class="product-info">
      <h3 class="product-title">${product.name}</h3>
      <div class="product-rating">
        ${createStarRating(product.rating)}
        <span>(${product.reviews})</span>
      </div>
      <div class="product-price">
        <span class="current-price">$${product.price.toFixed(2)}</span>
        ${originalPriceHTML}
      </div>
      <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
      ${isWishlistPage ? '<button class="btn remove-btn">Remove</button>' : ""}
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