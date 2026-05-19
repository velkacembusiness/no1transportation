// Replace Text In Header
const checkReplace = document.querySelector('.replace-me');

if (checkReplace !== null) {
    const replace = new ReplaceMe(checkReplace, {
        animation: 'animated fadeIn',
        speed: 2000,
        separator: ',',
        loopCount: 'infinite',
        autoRun: true,
    });
}

function userScroll() {
  const navbar = document.querySelector('.navbar');
  const toTopBtn = document.querySelector('#to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      // navbar.classList.add('navbar-sticky');
      toTopBtn.classList.add('show');
    } else {
      // navbar.classList.remove('navbar-sticky');
      toTopBtn.classList.remove('show');
    }
  });
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function incrementStats() {
  const counters = document.querySelectorAll('.counter');

  counters.forEach((counter) => {
    counter.innerText = 0;

    const updateCounter = () => {
      const target = +counter.getAttribute('data-target');
      const c = +counter.innerText;

      const increment = target / 200;

      if (c < target) {
        counter.innerText = Math.ceil(c + increment);
        setTimeout(updateCounter, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', userScroll);
document.addEventListener('DOMContentLoaded', incrementStats);
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // animation une seule fois
          }
        });
      },
      {
        threshold: 0.2, // 20% visible
      }
  );

  reveals.forEach(el => observer.observe(el));
});

document.querySelector('#to-top').addEventListener('click', scrollToTop);
