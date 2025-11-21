// =======================================
// SCROLL ANIMATION OBSERVER
// =======================================
const elements = document.querySelectorAll("section, .solution");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.2 });

elements.forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.2}s`;
  observer.observe(el);
});

// =======================================
// MOBILE MENU TOGGLE
// =======================================
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuIcon.classList.replace(
    navLinks.classList.contains("active") ? "ri-menu-3-line" : "ri-close-line",
    navLinks.classList.contains("active") ? "ri-close-line" : "ri-menu-3-line"
  );
});

// Close menu on click
document.querySelectorAll("#nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuIcon.classList.replace("ri-close-line", "ri-menu-3-line");
  });
});

// =======================================
// CART SYSTEM
// =======================================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  let totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("cart-count").innerText = totalQty;
}
updateCartCount();

// Add to Cart
document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", () => {

    let item = {
      id: btn.dataset.id,
      name: btn.dataset.name,
      price: Number(btn.dataset.price),
      image: btn.dataset.image,
      quantity: 1
    };

    let existing = cart.find(p => p.id === item.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    alert(`${item.name} added to cart!`);
  });
});

// Open cart page
document.querySelector(".cart-icon").onclick = () => {
  window.location.href = "cart.html";
};
