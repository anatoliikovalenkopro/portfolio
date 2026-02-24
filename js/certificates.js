document.addEventListener("DOMContentLoaded", () => {
  const certGrid = document.getElementById("certGrid");
  const searchInput = document.getElementById("certSearch");
  const toggleBtn = document.getElementById("certToggle");

  if (!certGrid) return;


  const CERTS = [
    {
      title: "Foundations: Data, Data, Everywhere",
      issuer: "Google (Coursera)",
      date: "",
      tags: ["Data", "Foundations"],
      details: "Intro to data lifecycle, analytics thinking, and data-driven decision making.",
      url: ""
    },
    {
      title: "Object-Oriented Programming Concepts",
      issuer: "Google (Coursera)",
      date: "",
      tags: ["OOP", "Programming"],
      details: "OOP fundamentals: classes, objects, encapsulation, and design basics.",
      url: ""
    },
    {
      title: "HTML, CSS, and JavaScript for Web Developers",
      issuer: "Johns Hopkins University (Coursera)",
      date: "",
      tags: ["HTML", "CSS", "JavaScript"],
      details: "Web fundamentals and responsive layout techniques.",
      url: ""
    },
    {
      title: "Programming for Everybody (Python)",
      issuer: "University of Michigan (Coursera)",
      date: "",
      tags: ["Python", "Basics"],
      details: "Python fundamentals including control flow and functions.",
      url: ""
    },
    {
      title: "Code Foundations Skill Path",
      issuer: "Codecademy",
      date: "",
      tags: ["Foundations"],
      details: "Core programming concepts and development workflow basics.",
      url: ""
    },
    {
      title: "Learn SQL Course",
      issuer: "Codecademy",
      date: "",
      tags: ["SQL", "Databases"],
      details: "Querying, filtering, joins, and aggregation fundamentals.",
      url: ""
    }
  ];

  let showAll = false;
  let filterText = "";


  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });



  searchInput?.addEventListener("input", (e) => {
    filterText = e.target.value.trim().toLowerCase();
    render();
  });

  toggleBtn?.addEventListener("click", () => {
    showAll = !showAll;
    toggleBtn.textContent = showAll ? "Show less" : "Show all";
    render();
  });



  function render() {
    const filtered = CERTS.filter(c => {
      const blob = `${c.title} ${c.issuer} ${c.tags.join(" ")} ${c.details}`.toLowerCase();
      return blob.includes(filterText);
    });

   
    if (toggleBtn) {
      toggleBtn.style.display = filtered.length > 6 ? "inline-block" : "none";
    }

    const visible = showAll ? filtered : filtered.slice(0, 6);

    if (visible.length === 0) {
      certGrid.innerHTML = `
        <div class="card">
          <p class="muted">No certificates found.</p>
        </div>
      `;
      return;
    }

    certGrid.innerHTML = visible.map((c) => `
      <article class="card cert-card fade-in">
        <h3>${escapeHtml(c.title)}</h3>
        <div class="cert-issuer">${escapeHtml(c.issuer)}</div>
        ${c.date ? `<div class="cert-date">${escapeHtml(c.date)}</div>` : ""}

        <div class="cert-tags">
          ${c.tags.map(t => `<span class="cert-tag">${escapeHtml(t)}</span>`).join("")}
        </div>

        <div class="cert-action-row">
          <button class="icon-btn" type="button" data-action="toggle-details">
            Show details
          </button>
          ${c.url ? `
            <a class="link-btn" href="${c.url}" target="_blank" rel="noreferrer">
              Credential
            </a>` : ""}
        </div>

        <div class="cert-details">
          <p class="muted">${escapeHtml(c.details)}</p>
        </div>
      </article>
    `).join("");

    attachHandlers();
    animateIn();
  }



  function attachHandlers() {
    certGrid.querySelectorAll("[data-action='toggle-details']").forEach(btn => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".cert-card");
        const isOpen = card.classList.toggle("open");
        btn.textContent = isOpen ? "Hide details" : "Show details";
      });
    });
  }



  function animateIn() {
    const cards = certGrid.querySelectorAll(".fade-in");
    cards.forEach(card => observer.observe(card));
  }



  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }


  render();
});