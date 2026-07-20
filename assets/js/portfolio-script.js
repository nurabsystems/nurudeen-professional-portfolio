/* ===========================
   THEME TOGGLE
=========================== */


const themeToggle =
document.getElementById("themeToggle");

const currentTheme =
localStorage.getItem("theme");

if(currentTheme){

    document.documentElement.setAttribute(
        "data-theme",
        currentTheme
    );

    updateThemeIcon(currentTheme);
}

themeToggle?.addEventListener(
    "click",
    () => {

        let theme =
        document.documentElement.getAttribute(
            "data-theme"
        );

        if(theme === "dark"){

            theme = "light";

        }else{

            theme = "dark";
        }

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "theme",
            theme
        );

        updateThemeIcon(theme);
    }
);


function updateThemeIcon(theme){

    const icon =
    themeToggle.querySelector("i");

    if(theme === "dark"){

        icon.className =
        "bi bi-sun-fill";

    }else{

        icon.className =
        "bi bi-moon-stars-fill";
    }
}



document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize AOS
    AOS.init({
        duration: 1200,
        easing: "ease-out-cubic",
        once: true,
        offset: 100
    });
});

// 2. Reveal Cards Observer
const revealCards = document.querySelectorAll(".reveal-card");
const cardObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    { threshold: 0.2 }
);

// Properly loop through cards and apply stagger delay
revealCards.forEach((card, index) => {
    cardObserver.observe(card);
    card.style.transitionDelay = `${index * 120}ms`;
});

// 3. Project Cards 3D Tilt Effect
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.transform = `
            perspective(1000px)
            rotateY(${(x - rect.width / 2) / 25}deg)
            rotateX(${-(y - rect.height / 2) / 25}deg)
            translateY(-10px)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    });
});

// 4. Counter Engine Function
const counters = document.querySelectorAll(".counter");
const startCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / 80;

        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
};

// 5. Career Highlights Counter Observer (Renamed to prevent collisions)
const counterSection = document.querySelector(".career-highlights");

if (counterSection) {
    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter();
                    counterObserver.disconnect(); // Safely disconnects the renamed observer
                }
            });
        },
        { threshold: 0.3 }
    );

    counterObserver.observe(counterSection);
}






document.querySelectorAll(".footer-social a").forEach(icon => {

    icon.addEventListener("mouseenter", () => {
        icon.style.transform = "translateY(-5px) rotate(8deg)";
    });

    icon.addEventListener("mouseleave", () => {
        icon.style.transform = "translateY(0) rotate(0)";
    });

});



