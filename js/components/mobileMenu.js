const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

export const mobileMenu = (target) => {
  if (target.classList.contains("fa-bars") || target.classList.contains("fa-xmark")) {
    toggleMobileMenu();
  }

  if (target.tagName === "A") {
    closeMobileMenu();
  }
}

const toggleMobileMenu = () => {
  navLinks.classList.toggle("active");
  hamburger.innerHTML = navLinks.classList.contains("active") ? "<i class='fa-solid fa-xmark'></i>" : "<i class='fa-solid fa-bars'></i>";
}

const closeMobileMenu = () => {
  navLinks.classList.remove("active");
  hamburger.innerHTML = "<i class='fa-solid fa-bars'></i>";
}