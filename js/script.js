const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

document.addEventListener("DOMContentLoaded", () => {
  hamburger.addEventListener("click", toggleMobileMenu);

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });
});

function toggleMobileMenu() {
  navLinks.classList.toggle("active");
  hamburger.innerHTML = navLinks.classList.contains("active") ? "<i class='fa-solid fa-xmark'></i>" : "<i class='fa-solid fa-bars'></i>";
}

function closeMobileMenu() {
  navLinks.classList.remove("active");
  hamburger.innerHTML = "<i class='fa-solid fa-bars'></i>";
}
