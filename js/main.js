document.addEventListener("DOMContentLoaded", () => {

  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();


  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

   
    navMenu.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      if (window.matchMedia("(min-width: 700px)").matches) return;

      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      menuToggle.textContent = "☰";
    });
  }


  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.body.classList.add("dark");
  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
      );
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isDark ? "Toggle light mode" : "Toggle dark mode");
  }


  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("successMsg");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  if (form) {
    form.addEventListener("submit", (e) => {
      
      if (successMsg) successMsg.textContent = "";

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const msgVal = messageInput.value.trim();

      let ok = true;

      
      if (nameVal.length < 2) {
        nameError.textContent = "Please enter your name (at least 2 characters).";
        ok = false;
      } else {
        nameError.textContent = "";
      }

      
      if (!isValidEmail(emailVal)) {
        emailError.textContent = "Please enter a valid email address.";
        ok = false;
      } else {
        emailError.textContent = "";
      }

     
      if (msgVal.length < 10) {
        messageError.textContent = "Message should be at least 10 characters.";
        ok = false;
      } else {
        messageError.textContent = "";
      }

      
      if (!ok) {
        e.preventDefault();
        return;
      }

      
      if (successMsg) successMsg.textContent = "Sending…";
    });

    
    [nameInput, emailInput, messageInput].forEach((el) => {
      el.addEventListener("input", () => {
        if (el === nameInput) nameError.textContent = "";
        if (el === emailInput) emailError.textContent = "";
        if (el === messageInput) messageError.textContent = "";
        if (successMsg) successMsg.textContent = "";
      });
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});