

document.addEventListener("DOMContentLoaded", function () {
  console.log("Website Loaded Successfully.");

  initializeWebsite();
});

/*==========================================================
            WEBSITE CONTROL CENTER
==========================================================*/

/*
Every feature starts here.

This makes the project:

✓ Easy to read

✓ Easy to maintain

✓ Easy to debug

✓ Easy for team members to contribute
*/

function initializeWebsite() {
  initializeLoader();
  initializeNavbar();
  initializeActiveNavigation();
  initializeTechnologyCards();
  initializeContactForm();
  animateCounters();
  revealCustomOnScroll();
  initializeDarkMode();
  initializeProjectSearch();
}

function initializeDarkMode() {

    const buttons = document.querySelectorAll(".theme-toggle");

    if (buttons.length === 0) return;

    function syncIcons(isDark) {

        buttons.forEach(function (btn) {

            const icon = btn.querySelector("i");

            if (!icon) return;

            if (isDark) {
                icon.classList.replace("bi-brightness-high-fill", "bi-moon-stars-fill");
            } else {
                icon.classList.replace("bi-moon-stars-fill", "bi-brightness-high-fill");
            }

        });

    }

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-mode");

        syncIcons(true);

    }

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            const isDark = document.body.classList.contains("dark-mode");

            syncIcons(isDark);

            localStorage.setItem("theme", isDark ? "dark" : "light");

        });

    });

}

function initializeProjectSearch(){

    const search=document.getElementById("projectSearch");

    if(!search) return;

    const cards=document.querySelectorAll(".project-card-custom");

    const noProjects=document.getElementById("noProjects");

    search.addEventListener("input",function(){

        const value=this.value.toLowerCase();

        let found=false;

        cards.forEach(card=>{

            const text=card.innerText.toLowerCase();

            if(text.includes(value)){

                card.style.display="block";

                found=true;

            }else{

                card.style.display="none";

            }

        });

        noProjects.style.display=found?"none":"block";

    });

}

/*FUNCTIONS*/

/*==========================================================
                PAGE LOADER
==========================================================*/

/*
The loading screen disappears after
the website has loaded.
*/

function initializeLoader() {
  // Find the loader

  const loader = document.getElementById("loader");

  // Safety check

  if (!loader) {
    return;
  }

  // Hide loader after a short delay

  window.addEventListener("load", function () {
    setTimeout(function () {
      loader.style.opacity = "0";

      loader.style.visibility = "hidden";

      loader.style.transition = "0.6s";
    }, 700);
  });
}

/*==========================================================
                STICKY NAVBAR
==========================================================*/

/*
When the user scrolls down,
the navbar changes appearance.
*/

function initializeNavbar() {
  const navbar = document.querySelector(".navbar");

  if (!navbar) {
    return;
  }

  window.addEventListener("scroll", function () {
    if (window.scrollY > 60) {
      navbar.classList.add("shadow");

      navbar.style.padding = "10px 0";
    } else {
      navbar.classList.remove("shadow");

      navbar.style.padding = "15px 0";
    }
  });
}

/*==========================================================
            ACTIVE NAVIGATION LINK
==========================================================*/

/*
Highlight the menu item
that matches the section
currently visible.
*/

function initializeActiveNavigation() {
  // Get all sections

  const sections = document.querySelectorAll("section");

  // Get all navigation links

  const navLinks = document.querySelectorAll(".navbar .nav-link");

  window.addEventListener("scroll", function () {
    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;

      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  });
}

/*

What Part 1 Does

✅ Waits until the HTML has loaded

✅ Initializes the website

✅ Removes the loading screen

✅ Makes the navbar react when scrolling

✅ Highlights the active menu item

✅ Keeps the code organized for your teammates


*/

/*==========================================================
            NEXT FEATURES
==========================================================*/

/*
Part 2 will include

✓ Smooth Scrolling

✓ Scroll Reveal Animation

✓ Fade-up Animation

✓ Fade-left Animation

✓ Fade-right Animation

✓ Simple code with comments
*/

function animateCounters() {
  const counters = document.querySelectorAll(".counter");

  if (!counters.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}

function animateCounter(counter) {

  const target = Number(counter.dataset.target);

  let current = 0;

const increment = Math.max(target / 120, 1);

  const update = () => {
    current += increment;

    if (current < target) {
      counter.innerText = Math.floor(current);

      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  };

  update();
}

/*==========================================================
        TECHNOLOGY SECTION ANIMATION
==========================================================*/

function initializeTechnologyCards() {
  // Select all technology cards

  const cards = document.querySelectorAll(".technology-card");

  // Create observer

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  // Observe every card

  cards.forEach(function (card) {
    observer.observe(card);
  });
}

/* ==========================================
        SCROLL REVEAL - Custom Sections
=========================================== */

const customRevealEls = document.querySelectorAll(
  ".project-card-custom, .skill-card-custom, .testimonial-card-custom",
);

customRevealEls.forEach((el) => el.classList.add("fade-up-custom"));

function revealCustomOnScroll() {
  customRevealEls.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active-custom");
    }
  });
}

window.addEventListener("scroll", revealCustomOnScroll);
revealCustomOnScroll();



/*==========================================================
                CONTACT FORM
==========================================================*/


/*==========================================================
            SHOW FORM ALERT
==========================================================*/
function showFormAlert(message, type = "success") {

   const alertBox = document.getElementById("formAlert");

if (alertBox) {
    alertBox.innerHTML = "";
}

    if (!alertBox) return;

    // Clear previous alert
    alertBox.innerHTML = "";

    // Show new alert
    alertBox.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close">
            </button>
        </div>
    `;

    // Scroll to alert
    alertBox.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


function initializeContactForm() {
  const form = document.getElementById("contactForm");

  if (!form) return;

  const submitBtn = document.getElementById("submitBtn");

  const messageBox = document.getElementById("message");

  const charCount = document.getElementById("charCount");

  const fields = [
    {
      id: "name",
      label: "Full Name",
    },

    {
      id: "email",
      label: "Email Address",
    },

    {
      id: "phone",
      label: "Phone Number",
    },

    {
      id: "service",
      label: "Service",
    },

    {
      id: "subject",
      label: "Project Subject",
    },

    {
      id: "message",
      label: "Project Details",
    },
  ];



  /*==============================
            Character Counter
    ==============================*/

  if (messageBox && charCount) {
    messageBox.addEventListener("input", function () {
      charCount.textContent = `${this.value.length} / 500`;
    });
  }





  /*==============================
            Form Submit
    ==============================*/

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Remove any previous alert
    document.getElementById("formAlert").innerHTML = "";

    let missingFields = [];

    fields.forEach(function (field) {
      const input = document.getElementById(field.id);

      input.classList.remove("valid-field");

      input.classList.remove("invalid-field");

      if (input.value.trim() === "") {
        missingFields.push(field.label);

        input.classList.add("invalid-field");
      } else {
        input.classList.add("valid-field");
      }
    });





    /*==============================
                Email Validation
        ==============================*/

    const email = document.getElementById("email");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() !== "" && !emailPattern.test(email.value)) {
      email.classList.remove("valid-field");

      email.classList.add("invalid-field");

      missingFields.push("Valid Email Address");
    }

    /*==============================
                Phone Validation
        ==============================*/

    const phone = document.getElementById("phone");

    const phonePattern = /^[0-9+\-\s()]{7,20}$/;

    if (phone.value.trim() !== "" && !phonePattern.test(phone.value)) {
      phone.classList.remove("valid-field");

      phone.classList.add("invalid-field");

      missingFields.push("Valid Phone Number");
    }

    /*==============================
                Validation Failed
        ==============================*/

    if (missingFields.length > 0) {
      showFormAlert(
        "Please complete the following:<br><br>• " +
          [...new Set(missingFields)].join("<br>• "),

        "danger",
      );

      return;
    }

    /*==============================
                Loading Button
        ==============================*/

    submitBtn.disabled = true;

    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

    /*==============================
                Build Mail
        ==============================*/

    const body = `Project Request

Full Name: ${document.getElementById("name").value}

Email: ${document.getElementById("email").value}

Phone: ${document.getElementById("phone").value}

Service: ${document.getElementById("service").value}

Subject: ${document.getElementById("subject").value}

Message:

${document.getElementById("message").value}

Submitted:

${new Date().toLocaleString()}
`;


setTimeout(function () {

    // Show success alert
    showFormAlert(
        "<strong>Success!</strong><br><br>" +
        "Your project request has been prepared successfully.<br>" +
        "Your email application will open shortly.",
        "success"
    );

    // Reset the form
    form.reset();

    // Remove validation classes
    fields.forEach(function (field) {

        const input = document.getElementById(field.id);

        input.classList.remove("valid-field");
        input.classList.remove("invalid-field");

    });

    // Reset character counter
    if (charCount) {

        charCount.textContent = "0 / 500";

    }

    // Restore button
    submitBtn.disabled = false;

    submitBtn.innerHTML =
        '<i class="bi bi-send-fill me-2"></i>Send Project Request';

    // Open email client after a short delay
    setTimeout(function () {

        
        const emailSubject =
    document.getElementById("subject").value;

        // Open email client
window.location.href =
    "mailto:nurabsystems@gmail.com?subject=" +
    encodeURIComponent(emailSubject) +
    "&body=" +
    encodeURIComponent(body);

    }, 800);


    

    // Redirect to Thank You page
    setTimeout(function () {

        

        window.location.href = "thankyou.html";

    }, 1500);

}, 1200);
  });
}
