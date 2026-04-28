'use strict';

/**
 * PRELOAD
 * 
 * Loading will end after document is loaded
 */
const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  if (preloader) {
    setTimeout(function () {
      preloader.classList.add("loaded");
      document.body.classList.add("loaded");
    }, 1500);
  }
});

/**
 * Add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  if (elements) {
    for (let i = 0, len = elements.length; i < len; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  }
}

/**
 * NAVBAR (Index Page)
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  if (navbar) {
    navbar.classList.toggle("active");
  }
  if (overlay) {
    overlay.classList.toggle("active");
  }
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER & BACK TOP BTN (Index Page)
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (header) {
    if (isScrollBottom) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  }
  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    if (header) header.classList.add("active");
    if (backTopBtn) backTopBtn.classList.add("active");
    hideHeader();
  } else {
    if (header) header.classList.remove("active");
    if (backTopBtn) backTopBtn.classList.remove("active");
  }
});

/**
 * HERO SLIDER (Index Page)
 */
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems.length > 0 ? heroSliderItems[0] : null;

const updateSliderPos = function () {
  if (lastActiveSliderItem && heroSliderItems[currentSlidePos]) {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
  }
}

const slideNext = function () {
  if (heroSliderItems.length > 0) {
    if (currentSlidePos >= heroSliderItems.length - 1) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }
    updateSliderPos();
  }
}

if (heroSliderNextBtn) {
  heroSliderNextBtn.addEventListener("click", slideNext);
}

const slidePrev = function () {
  if (heroSliderItems.length > 0) {
    if (currentSlidePos <= 0) {
      currentSlidePos = heroSliderItems.length - 1;
    } else {
      currentSlidePos--;
    }
    updateSliderPos();
  }
}

if (heroSliderPrevBtn) {
  heroSliderPrevBtn.addEventListener("click", slidePrev);
}

/**
 * Auto slide
 */
let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

if (heroSliderNextBtn && heroSliderPrevBtn) {
  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
  });

  addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
}

if (heroSliderItems.length > 0) {
  window.addEventListener("load", autoSlide);
}

/**
 * PARALLAX EFFECT
 */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {
  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // Reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    const itemX = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    const itemY = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${itemX}px, ${itemY}px, 0px)`;
  }
});

/**
 * EMAILJS - Reservation Form
 */
const reservationForm = document.querySelector("#reservationForm");

if (reservationForm && typeof emailjs !== 'undefined') {
  // Initialize EmailJS with your Public Key (User ID)
  emailjs.init("U5dbb5XfzzRzyYjn3");

  // Form submission handler
  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    const name = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;
    const person = document.querySelector("#person").value;
    const reservationDate = document.querySelector("#reservation-date").value;
    const time = document.querySelector("#time").value;
    const message = document.querySelector("#message").value;

    // Send email using EmailJS
    emailjs
      .send("service_tip0zku", "template_bxor2fq", {
        name: name,
        phone: phone,
        person: person,
        reservation_date: reservationDate,
        time: time,
        message: message,
      })
      .then(
        function (response) {
          alert("Your Order Is Booked!");
        },
        function (error) {
          alert("Order Failed.");
          console.error("EmailJS Error:", error);
        }
      );
  });
}

/**
 * SWIPER - Mission/Vision Carousel
 */
if (typeof Swiper !== 'undefined') {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
}

/**
 * MENU PAGE SCRIPTS
 */

// Mobile Navigation for Menu Page
const navToggle = document.getElementById('navToggle');
const menuNavbar = document.getElementById('navbar');
const menuOverlay = document.getElementById('overlay');

if (navToggle && menuNavbar) {
  navToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    menuNavbar.classList.toggle('active');
    if (menuOverlay) {
      menuOverlay.classList.toggle('active');
    }
    document.body.style.overflow = menuNavbar.classList.contains('active') ? 'hidden' : '';
  });
}

if (menuOverlay) {
  menuOverlay.addEventListener('click', function() {
    if (navToggle) navToggle.classList.remove('active');
    if (menuNavbar) menuNavbar.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Hero Slider for Menu Page
const menuSlides = document.querySelectorAll('.menu-hero .slider-item');
const menuDots = document.querySelectorAll('.menu-hero .slider-dot');
let menuCurrentSlide = 0;
let menuSlideInterval;

function showMenuSlide(index) {
  if (menuSlides.length > 0) {
    menuSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    menuDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    menuCurrentSlide = index;
  }
}

function nextMenuSlide() {
  if (menuSlides.length > 0) {
    showMenuSlide((menuCurrentSlide + 1) % menuSlides.length);
  }
}

function startMenuSlider() {
  if (menuSlides.length > 0) {
    menuSlideInterval = setInterval(nextMenuSlide, 5000);
  }
}

menuDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    clearInterval(menuSlideInterval);
    showMenuSlide(index);
    startMenuSlider();
  });
});

if (menuSlides.length > 0) {
  startMenuSlider();
}

// Category Navigation
const categoryBtns = document.querySelectorAll('.category-btn');
const menuCategories = document.querySelectorAll('.menu-category');

categoryBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const category = this.dataset.category;
    
    categoryBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    menuCategories.forEach(cat => {
      cat.classList.remove('active');
      if (cat.id === category) {
        cat.classList.add('active');
        // Re-trigger animations
        const cards = cat.querySelectorAll('.menu-page-card');
        cards.forEach((card, i) => {
          card.style.animation = 'none';
          card.offsetHeight; // Trigger reflow
          card.style.animation = `fadeInUp 0.6s ease forwards ${i * 0.1}s`;
        });
      }
    });
  });
});

// Back to Top Button (Menu Page)
const menuBackTopBtn = document.getElementById('backTopBtn');

if (menuBackTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      menuBackTopBtn.classList.add('visible');
    } else {
      menuBackTopBtn.classList.remove('visible');
    }
  });

  menuBackTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});
