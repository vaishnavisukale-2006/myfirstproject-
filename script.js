/**
 * ==============================================================================
 * MY FIRST WEBSITE - JAVASCRIPT LOGIC
 * ==============================================================================
 * This script powers all interactive features of the website:
 * 1. Dark / Light Theme Toggle with LocalStorage persistence
 * 2. Dynamic Time-Based Greeting
 * 3. Fun Fact Generator
 * 4. Interactive Click Counter Widget with Milestones
 * 5. Dynamic Color Palette Generator with Clipboard Copy
 * 6. Coding Goals / To-Do List with LocalStorage
 * 7. Contact Form Validation & Toast Notification Alerts
 * 8. Mobile Navigation Toggle & Back-to-Top Button
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. THEME TOGGLE (DARK / LIGHT MODE)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Check saved theme preference or system preference
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  htmlElement.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    showToast(`Switched to ${newTheme} mode!`, 'info');
  });

  /* --------------------------------------------------------------------------
     2. DYNAMIC TIME-BASED GREETING
     -------------------------------------------------------------------------- */
  const dynamicGreeting = document.getElementById('dynamic-greeting');
  const currentHour = new Date().getHours();
  let greetingText = "Welcome to my website!";

  if (currentHour >= 5 && currentHour < 12) {
    greetingText = "Good morning! ☀️ Ready to code?";
  } else if (currentHour >= 12 && currentHour < 17) {
    greetingText = "Good afternoon! 🌤️ Welcome to my space!";
  } else if (currentHour >= 17 && currentHour < 21) {
    greetingText = "Good evening! 🌆 Thanks for visiting!";
  } else {
    greetingText = "Burning the midnight oil! 🌙 Happy coding!";
  }

  if (dynamicGreeting) {
    dynamicGreeting.textContent = greetingText;
  }

  /* --------------------------------------------------------------------------
     3. MOBILE NAVIGATION MENU
     -------------------------------------------------------------------------- */
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggleBtn.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close mobile menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggleBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. FUN FACT GENERATOR
     -------------------------------------------------------------------------- */
  const funFacts = [
    "The first computer bug was an actual real moth found in a Harvard Mark II computer in 1947!",
    "JavaScript was created in just 10 days in May 1995 by Brendan Eich.",
    "The world's first website is still live today at info.cern.ch created by Tim Berners-Lee in 1991.",
    "CSS was first proposed by Håkon Wium Lie on October 10, 1994.",
    "More than 98% of all websites use JavaScript as a client-side programming language.",
    "The '404' error code originated from room 404 at CERN where the original central database servers were kept.",
    "There are over 700 distinct programming languages in existence today!"
  ];

  const funFactText = document.getElementById('fun-fact-text');
  const newFactBtn = document.getElementById('new-fact-btn');
  let lastFactIndex = 0;

  if (newFactBtn && funFactText) {
    newFactBtn.addEventListener('click', () => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * funFacts.length);
      } while (randomIndex === lastFactIndex && funFacts.length > 1);

      lastFactIndex = randomIndex;

      // Subtle fade animation
      funFactText.style.opacity = '0';
      setTimeout(() => {
        funFactText.textContent = `"${funFacts[randomIndex]}"`;
        funFactText.style.opacity = '1';
      }, 150);
    });
  }

  /* --------------------------------------------------------------------------
     5. WIDGET 1: INTERACTIVE CLICK COUNTER
     -------------------------------------------------------------------------- */
  let count = 0;
  const counterValueEl = document.getElementById('counter-value');
  const counterMilestoneEl = document.getElementById('counter-milestone');
  const incrementBtn = document.getElementById('counter-increment');
  const decrementBtn = document.getElementById('counter-decrement');
  const resetBtn = document.getElementById('counter-reset');

  function updateCounter(newVal) {
    count = newVal;
    counterValueEl.textContent = count;
    
    // Trigger bounce animation
    counterValueEl.classList.remove('bump');
    void counterValueEl.offsetWidth; // Trigger reflow
    counterValueEl.classList.add('bump');

    // Milestones check
    if (count === 0) {
      counterMilestoneEl.textContent = "Counter reset to 0.";
    } else if (count === 10) {
      counterMilestoneEl.textContent = "🎉 Milestone 10 reached! Great start!";
      showToast("🎉 Awesome! You reached 10 clicks!", "success");
    } else if (count === 25) {
      counterMilestoneEl.textContent = "🚀 Milestone 25! You're on fire!";
      showToast("🚀 Double digits! 25 clicks!", "success");
    } else if (count === 50) {
      counterMilestoneEl.textContent = "🏆 Halfway to 100! Super clicker!";
      showToast("🏆 Milestone 50 unlocked!", "success");
    } else if (count === 100) {
      counterMilestoneEl.textContent = "👑 Centurion! 100 clicks achieved!";
      showToast("👑 Outstanding! 100 clicks!", "success");
    } else if (count < 0) {
      counterMilestoneEl.textContent = "Sub-zero territory ❄️";
    } else {
      counterMilestoneEl.textContent = `Current count: ${count}`;
    }
  }

  if (incrementBtn && decrementBtn && resetBtn) {
    incrementBtn.addEventListener('click', () => updateCounter(count + 1));
    decrementBtn.addEventListener('click', () => updateCounter(count - 1));
    resetBtn.addEventListener('click', () => updateCounter(0));
  }

  /* --------------------------------------------------------------------------
     6. WIDGET 2: COLOR PALETTE GENERATOR
     -------------------------------------------------------------------------- */
  const palettePreviewBox = document.getElementById('palette-preview-box');
  const paletteSwatchesGrid = document.getElementById('palette-swatches');
  const generatePaletteBtn = document.getElementById('generate-palette-btn');

  // Curated harmonious modern color sets
  const modernColorPalettes = [
    ["#6366f1", "#a855f7", "#ec4899", "#3b82f6"],
    ["#06b6d4", "#3b82f6", "#6366f1", "#10b981"],
    ["#f43f5e", "#fb923c", "#facc15", "#4ade80"],
    ["#8b5cf6", "#d946ef", "#f43f5e", "#0ea5e9"],
    ["#14b8a6", "#06b6d4", "#3b82f6", "#8b5cf6"],
    ["#f97316", "#ef4444", "#ec4899", "#8b5cf6"]
  ];

  function renderPalette(colors) {
    paletteSwatchesGrid.innerHTML = '';
    
    // Set preview gradient
    palettePreviewBox.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`;

    colors.forEach(hex => {
      const swatch = document.createElement('div');
      swatch.className = 'swatch-item';
      swatch.title = 'Click to copy HEX code';
      
      swatch.innerHTML = `
        <div class="swatch-color" style="background-color: ${hex};"></div>
        <span class="swatch-hex">${hex.toUpperCase()}</span>
      `;

      swatch.addEventListener('click', () => {
        navigator.clipboard.writeText(hex).then(() => {
          showToast(`Copied ${hex.toUpperCase()} to clipboard!`, 'success');
        }).catch(() => {
          showToast(`Selected color ${hex.toUpperCase()}`, 'info');
        });
      });

      paletteSwatchesGrid.appendChild(swatch);
    });
  }

  if (generatePaletteBtn) {
    let currentPaletteIndex = 0;
    renderPalette(modernColorPalettes[0]);

    generatePaletteBtn.addEventListener('click', () => {
      currentPaletteIndex = (currentPaletteIndex + 1) % modernColorPalettes.length;
      renderPalette(modernColorPalettes[currentPaletteIndex]);
      showToast("New palette generated!", "info");
    });
  }

  /* --------------------------------------------------------------------------
     7. WIDGET 3: CODING GOALS / TO-DO TRACKER
     -------------------------------------------------------------------------- */
  const goalForm = document.getElementById('goal-form');
  const goalInput = document.getElementById('goal-input');
  const goalsList = document.getElementById('goals-list');
  const goalsEmptyState = document.getElementById('goals-empty-state');
  const goalsCounter = document.getElementById('goals-counter');
  const clearGoalsBtn = document.getElementById('clear-goals-btn');

  // Default starter goals
  let goals = JSON.parse(localStorage.getItem('my_coding_goals')) || [
    { id: 1, text: "Build my first website layout", completed: true },
    { id: 2, text: "Style it with modern CSS variables", completed: true },
    { id: 3, text: "Add interactive JavaScript widgets", completed: false },
    { id: 4, text: "Share my creation with friends!", completed: false }
  ];

  function saveAndRenderGoals() {
    localStorage.setItem('my_coding_goals', JSON.stringify(goals));
    goalsList.innerHTML = '';

    if (goals.length === 0) {
      goalsEmptyState.classList.remove('hidden');
    } else {
      goalsEmptyState.classList.add('hidden');
    }

    const remainingCount = goals.filter(g => !g.completed).length;
    goalsCounter.textContent = `${remainingCount} goal${remainingCount === 1 ? '' : 's'} remaining`;

    goals.forEach(goal => {
      const li = document.createElement('li');
      li.className = `goal-item ${goal.completed ? 'completed' : ''}`;
      
      li.innerHTML = `
        <div class="goal-content">
          <div class="goal-checkbox">
            ${goal.completed ? '<i class="fa-solid fa-check"></i>' : ''}
          </div>
          <span class="goal-title">${escapeHtml(goal.text)}</span>
        </div>
        <button class="goal-delete-btn" aria-label="Delete goal" title="Delete">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      `;

      // Toggle completed on click
      li.querySelector('.goal-content').addEventListener('click', () => {
        goal.completed = !goal.completed;
        saveAndRenderGoals();
        if (goal.completed) {
          showToast(`Goal completed: "${goal.text}"! 🎯`, 'success');
        }
      });

      // Delete goal
      li.querySelector('.goal-delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        goals = goals.filter(g => g.id !== goal.id);
        saveAndRenderGoals();
        showToast("Goal removed", "info");
      });

      goalsList.appendChild(li);
    });
  }

  if (goalForm && goalInput) {
    goalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = goalInput.value.trim();
      if (text) {
        goals.push({
          id: Date.now(),
          text: text,
          completed: false
        });
        goalInput.value = '';
        saveAndRenderGoals();
        showToast("New goal added! 🚀", "success");
      }
    });

    clearGoalsBtn.addEventListener('click', () => {
      if (goals.length > 0) {
        goals = [];
        saveAndRenderGoals();
        showToast("All goals cleared", "info");
      }
    });

    saveAndRenderGoals();
  }

  /* --------------------------------------------------------------------------
     8. CONTACT FORM VALIDATION & TOAST ALERT
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Name validation
      if (!nameInput.value.trim()) {
        nameInput.closest('.form-group').classList.add('error');
        isValid = false;
      } else {
        nameInput.closest('.form-group').classList.remove('error');
      }

      // Email validation
      if (!validateEmail(emailInput.value.trim())) {
        emailInput.closest('.form-group').classList.add('error');
        isValid = false;
      } else {
        emailInput.closest('.form-group').classList.remove('error');
      }

      // Subject validation
      if (!subjectInput.value.trim()) {
        subjectInput.closest('.form-group').classList.add('error');
        isValid = false;
      } else {
        subjectInput.closest('.form-group').classList.remove('error');
      }

      // Message validation
      if (messageInput.value.trim().length < 5) {
        messageInput.closest('.form-group').classList.add('error');
        isValid = false;
      } else {
        messageInput.closest('.form-group').classList.remove('error');
      }

      if (isValid) {
        const userName = nameInput.value.trim();
        showToast(`Thank you, ${userName}! Your message was sent successfully. 🎉`, 'success');
        contactForm.reset();
      } else {
        showToast("Please correct the highlighted fields before sending.", "info");
      }
    });

    // Clear error on input typing
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.closest('.form-group').classList.remove('error');
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     9. TOAST NOTIFICATION HELPER
     -------------------------------------------------------------------------- */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'info') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
    
    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${escapeHtml(message)}</span>
    `;

    toastContainer.appendChild(toast);

    // Auto remove after 3.5 seconds
    setTimeout(() => {
      toast.classList.add('toast-hide');
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 300);
    }, 3500);
  }

  /* --------------------------------------------------------------------------
     10. BACK TO TOP BUTTON & SCROLL LISTENER
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     11. FOOTER CURRENT YEAR
     -------------------------------------------------------------------------- */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     12. UTILITY: ESCAPE HTML
     -------------------------------------------------------------------------- */
  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

});
