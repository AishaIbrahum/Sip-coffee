console.log("JavaScript is working");

document.addEventListener("DOMContentLoaded", () => {

  /* ===================== CATEGORY FILTER ===================== */
  const categoryTabs = document.querySelectorAll(".category-tab");
  const productCards = document.querySelectorAll(".product-card");

  categoryTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.dataset.category;

      productCards.forEach(card => {
        const match = category === "all" || card.dataset.category === category;
        card.classList.remove("fade-in");

        if (match) {
          card.style.display = "";
          requestAnimationFrame(() => card.classList.add("fade-in"));
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* ===================== SLIDER ===================== */
  const slider = document.querySelector(".products-slider");
  const leftBtn = document.querySelector(".slider-arrow.left");
  const rightBtn = document.querySelector(".slider-arrow.right");

  if (slider && leftBtn && rightBtn) {
    leftBtn.onclick = () => slider.scrollBy({ left: -300, behavior: "smooth" });
    rightBtn.onclick = () => slider.scrollBy({ left: 300, behavior: "smooth" });
  }

  /* ===================== SCROLL ANIMATIONS ===================== */
  function addScrollAnimation(selector, className, threshold = 0.2, delay = 0.1) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold });

    elements.forEach((el, i) => {
      el.style.transitionDelay = `${i * delay}s`;
      observer.observe(el);
    });
  }

  addScrollAnimation(".crop-card", "show", 0.1);
  addScrollAnimation(".product-card", "fade-in", 0.2);

  /* ===================== CART FUNCTIONS ===================== */
  const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
  const saveCart = cart => localStorage.setItem("cart", JSON.stringify(cart));

  function updateCartCount() {
    const cart = getCart();
    const countEl = document.getElementById("cart-count");
    if (!countEl) return;

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    countEl.textContent = totalQty;
  }

  function renderCart() {
    const cartItems = document.getElementById("cart-items");
    if (!cartItems) return;

    const cart = getCart();
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div>
          <strong>${item.name}</strong>
          <span>${item.price} ر.س × ${item.qty}</span>
        </div>
        <button class="remove-item" data-index="${index}">✕</button>
      `;
      cartItems.appendChild(div);
    });

    document.querySelectorAll(".remove-item").forEach(btn => {
      btn.onclick = e => {
        const index = e.target.dataset.index;
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        updateCartCount();
        renderCart();
      };
    });
  }

  updateCartCount();
  renderCart();

  /* ===================== ADD TO CART ===================== */
  document.querySelectorAll(".btn-add").forEach(btn => {
    btn.addEventListener("click", e => {
      const card = e.target.closest(".product-card");
      if (!card) return;

      const name = card.querySelector(".product-name")?.textContent;
      const priceText = card.querySelector(".product-price")?.textContent || "0";
      const price = parseInt(priceText.replace(/\D/g, ""), 10);

      let cart = getCart();
      const existing = cart.find(item => item.name === name);

      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      saveCart(cart);
      updateCartCount();
      renderCart();

      alert("تمت الإضافة إلى السلة 🛒");
    });
  });

  /* ===================== CHECKOUT ===================== */
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.onclick = () => location.href = "payment.html";
  }

});

/* ===================== PAYMENT ===================== */
function goToPayment(name, price) {
  localStorage.setItem("selectedCoffee", name);
  localStorage.setItem("selectedPrice", Number(price));
  location.href = "payment.html";
}

/* ===================== PARALLAX ===================== */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".coffee-bean-float").forEach((bean, i) => {
    const y = window.pageYOffset * (i + 1) * 0.3;
    bean.style.transform = `translateY(${y}px) rotate(${y * 0.2}deg)`;
  });
});

/* ===================== TILT EFFECT ===================== */
document.querySelectorAll(".banner-product").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    card.style.transform = `
      perspective(1000px)
      rotateX(${(y - r.height / 2) / 20}deg)
      rotateY(${(r.width / 2 - x) / 20}deg)
      translateY(-10px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "none";
  });
});
