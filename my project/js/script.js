/* ================== HERO SLIDER DATA ================== */
const HERO_SLIDES = [
  {
    id: 1,
    eyebrow: "Premium Beans",
    title: "ROAST",
    desc: "Ethically sourced, roasted to perfection to bring out the distinct notes of every origin.",
    img: "images/bag2-removebg-preview.png",
    bg: "#1f140e", /* Dark Brown */
    circleColor: "rgba(255, 255, 255, 0.05)",
    floaters: [
      "🫘", "🍂", "✨", "☕", "🔥", "🌱", "🤎", "🌟"
    ],
    card: {
      title: "Ethiopian Roast",
      rating: "★ 4.9",
      time: "Fresh",
      icon: "images/cup-removebg-preview.png"
    }
  },
  {
    id: 2,
    eyebrow: "Fresh Ingredients",
    title: "Dessert",
    desc: "We use only the finest natural ingredients for a rich and authentic taste.",
    img: "images/rg.png",
    bg: "#4b5333", /* Fresh Green/Nature */
    circleColor: "rgba(255, 255, 255, 0.1)",
    floaters: [
      "🍪", "🍵", "🥞", "🧁", "🍩", "🥯", "✨"
    ],
    card: {
      title: "Organic Selection",
      rating: "★ 5.0",
      time: "Daily",
      icon: "images/rg.png"
    }
  },
  {
    id: 3,
    eyebrow: "Bakery & Sweets",
    title: "BAKERY",
    desc: "Daily baked goods made with premium butter and love.",
    img: "images/mk3.png",
    bg: "#D84315", /* Deep Orange/Warm */
    circleColor: "rgba(255, 255, 255, 0.08)",
    floaters: [
      "🥐", "🥖", "🥨", "🧈", "🍞", "🥯"
    ],
    card: {
      title: "Fresh Croissant",
      rating: "★ 4.8",
      time: "Daily",
      icon: "images/swe.jpg"
    }
  },
  {
    id: 4,
    eyebrow: "Ready to Drink",
    title: "COFFEE",
    desc: "Perfectly brewed coffee, ready to energize your day.",
    img: "images/ncup.png",
    bg: "#c69c6d", /* Blue Grey/Cool */
    circleColor: "rgba(255, 255, 255, 0.1)",
    floaters: [
      "🥤", "🧊", "⚡", "❄️", "🥛", "☕", "🍨"
    ],
    card: {
      title: "Iced Coffee",
      rating: "★ 4.9",
      time: "Cold",
      icon: "images/ncup.png"
    }
  }
];

/* ================== DOM ELEMENTS ================== */
const dom = {
  hero: document.getElementById('home'),
  bg: document.getElementById('hero-bg'),
  eyebrowText: document.getElementById('eyebrow-text'),
  title: document.getElementById('slide-title'),
  desc: document.getElementById('slide-desc'),
  image: document.getElementById('slide-image'),
  floaters: document.getElementById('floating-elements'),
  circle: document.querySelector('.visual-circle'),

  // Card
  card: document.getElementById('info-card'),
  cardIcon: document.getElementById('card-icon-img'),
  cardTitle: document.getElementById('card-title'),
  cardRating: document.getElementById('card-rating'),
  cardTime: document.getElementById('card-time'),

  // Nav
  prevBtn: document.getElementById('prev-slide'),
  nextBtn: document.getElementById('next-slide')
};

let currentSlide = 0;
let isAnimating = false;

/* ================== FUNCTIONS ================== */

function initHero() {
  renderSlide(0);

  dom.prevBtn.addEventListener('click', () => changeSlide(-1));
  dom.nextBtn.addEventListener('click', () => changeSlide(1));

  // Auto play optional
  // setInterval(() => changeSlide(1), 5000);
}

function changeSlide(direction) {
  if (isAnimating) return;
  isAnimating = true;

  currentSlide = (currentSlide + direction + HERO_SLIDES.length) % HERO_SLIDES.length;

  // Animate Out
  animateOut().then(() => {
    renderSlide(currentSlide);
    animateIn();
  });
}

function renderSlide(index) {
  const slide = HERO_SLIDES[index];

  // Update Background
  dom.bg.style.backgroundColor = slide.bg;
  dom.circle.style.borderColor = slide.circleColor;
  dom.circle.style.backgroundColor = slide.circleColor.replace('0.1', '0.05');

  // Update Content
  dom.eyebrowText.textContent = slide.eyebrow;
  dom.title.innerHTML = slide.title;
  dom.desc.textContent = slide.desc;

  // Image Logic
  dom.image.src = slide.img;

  // Remove border radius/shadow for PNGs (transparent images)
  // Only apply styling if it's a JPG/rectangular image like seew.jpg
  if (slide.img.includes('seew.jpg')) {
    dom.image.style.borderRadius = '20px';
    dom.image.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
  } else {
    dom.image.style.borderRadius = '0';
    dom.image.style.boxShadow = 'none';
    dom.image.style.filter = 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))';
  }

  // Update Card
  dom.cardTitle.textContent = slide.card.title;
  dom.cardRating.textContent = slide.card.rating;
  dom.cardTime.textContent = slide.card.time;
  dom.cardIcon.src = slide.card.icon;

  // Floaters - Enhanced Logic
  dom.floaters.innerHTML = '';

  // We want to generate roughly 12-15 floating items from the list
  // Reuse the list or pick randomly
  const baseFloaters = slide.floaters; // Array of emojis
  const count = 12;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.classList.add('floater');

    // Pick random emoji from the slide's list
    el.textContent = baseFloaters[Math.floor(Math.random() * baseFloaters.length)];

    // Random Position (dispersed around center)
    // Avoid the very center (30%-70% range in both X and Y) so text is readable
    // We'll place them in the outer regions
    let top, left;
    if (Math.random() > 0.5) {
      // Top or Bottom strip
      top = Math.random() > 0.5 ? Math.random() * 30 + '%' : Math.random() * 30 + 70 + '%';
      left = Math.random() * 90 + 5 + '%';
    } else {
      // Left or Right strip
      top = Math.random() * 90 + 5 + '%';
      left = Math.random() > 0.5 ? Math.random() * 20 + '%' : Math.random() * 20 + 80 + '%';
    }

    el.style.top = top;
    el.style.left = left;

    // Random Size
    const size = Math.floor(Math.random() * (45 - 20) + 20) + 'px';
    el.style.fontSize = size;

    // Random Animation
    // We defined floatAnim1, floatAnim2, floatAnim3 in CSS
    const animType = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
    const duration = Math.floor(Math.random() * (8 - 4) + 4) + 's'; // 4s to 8s
    const delay = Math.random() * 2 + 's'; // 0s to 2s delay

    el.style.animationName = `floatAnim${animType}`;
    el.style.animationDuration = duration;
    el.style.animationDelay = delay;

    dom.floaters.appendChild(el);
  }
}

function animateOut() {
  return new Promise(resolve => {
    dom.title.style.opacity = '0';
    dom.title.style.transform = 'translateY(20px)';

    dom.desc.style.opacity = '0';
    dom.desc.style.transform = 'translateY(20px)';

    dom.image.style.opacity = '0';
    dom.image.style.transform = 'scale(0.8) rotate(-5deg)';

    dom.card.style.opacity = '0';
    dom.card.style.transform = 'translateY(20px)';

    setTimeout(resolve, 400);
  });
}

function animateIn() {
  dom.title.style.opacity = '1';
  dom.title.style.transform = 'translateY(0)';

  dom.desc.style.opacity = '0.8';
  dom.desc.style.transform = 'translateY(0)';

  dom.image.style.opacity = '1';
  dom.image.style.transform = 'scale(1) rotate(0deg)';

  dom.card.style.opacity = '1';
  dom.card.style.transform = 'translateY(0)';

  setTimeout(() => {
    isAnimating = false;
  }, 400);
}

/* ================== SCROLL ANIMATIONS ================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Optional: stop observing once animated
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initScrollAnimations();
});
