// main.js - Shawn Odom Personal Portfolio

// Close the mobile navbar when a nav link is clicked
$("document").ready(() => {
  $(".nav-link").on("click", () => {
    if ($("#navMenu").hasClass("show")) {
      $(".navbar-toggler").trigger("click");
    }
  });
});

// Highlight the active nav link based on where the user has scrolled to
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  // Check which section is currently in view
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 80) {
      current = section.getAttribute("id");
    }
  });

  // Add active class to the matching nav link, remove from the rest
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Contact form validation
const contactForm = document.querySelector("#contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#contactName");
  const email = document.querySelector("#contactEmail");
  const message = document.querySelector("#contactMessage");
  const success = document.querySelector("#formSuccess");
  let valid = true;

  // Clear any errors from a previous submission attempt
  [name, email, message].forEach((field) => {
    field.classList.remove("is-invalid");
  });
  success.textContent = "";

  // Name must be at least 2 characters
  if (name.value.trim().length < 2) {
    name.classList.add("is-invalid");
    document.querySelector("#nameError").textContent =
      "Please enter your name.";
    valid = false;
  }

  // Basic email format check using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    email.classList.add("is-invalid");
    document.querySelector("#emailError").textContent =
      "Please enter a valid email address.";
    valid = false;
  }

  // Message must be at least 10 characters
  if (message.value.trim().length < 10) {
    message.classList.add("is-invalid");
    document.querySelector("#messageError").textContent =
      "Please enter a message (at least 10 characters).";
    valid = false;
  }

  // If everything is valid, simulate a form submission
  if (valid) {
    const btn = document.querySelector("#submitBtn");
    btn.disabled = true;
    btn.textContent = "Sending...";

    setTimeout(() => {
      contactForm.reset();
      btn.disabled = false;
      btn.textContent = "Send Message";
      success.textContent = "Message sent! I will get back to you soon.";
    }, 1000);
  }
});

// Remove the error highlight on a field as soon as the user starts typing in it
["contactName", "contactEmail", "contactMessage"].forEach((id) => {
  document.querySelector(`#${id}`).addEventListener("input", function () {
    this.classList.remove("is-invalid");
  });
});
