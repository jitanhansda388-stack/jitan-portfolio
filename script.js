/* ==============================
   NAVBAR FUNCTIONALITY
============================== */

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.getElementById("navLinks");

const navItems = document.querySelectorAll(".nav-link");


/* OPEN / CLOSE MENU */

function closeMenu() {

    navLinks.classList.remove("active");

    menuBtn.textContent = "☰";

    menuBtn.setAttribute("aria-expanded", "false");

    menuBtn.setAttribute("aria-label", "Open navigation menu");

}


menuBtn.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuBtn.textContent = isOpen ? "✕" : "☰";

    menuBtn.setAttribute("aria-expanded", String(isOpen));

    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});


/* CLOSE MENU AFTER CLICK */

navItems.forEach(link => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});


/* CLOSE MENU ON OUTSIDE CLICK */

document.addEventListener("click", event => {

    if (
        !navLinks.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {

        closeMenu();

    }

});


/* CLOSE MENU WITH ESCAPE KEY */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeMenu();

    }

});


/* CLOSE MENU WHEN RESIZING TO DESKTOP */

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        closeMenu();

    }

});


/* ==============================
   ACTIVE NAVIGATION
============================== */

const sections = document.querySelectorAll(
    "#home, #about, #skills, #projects, #contact"
);

function updateActiveLink() {

    let currentSection = "home";

    const activationPoint = 150;

    sections.forEach(section => {

        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop <= activationPoint) {

            currentSection = section.id;

        }

    });

    navItems.forEach(link => {

        const isActive =
            link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", isActive);

    });

}

window.addEventListener("scroll", updateActiveLink);

window.addEventListener("load", updateActiveLink);





/* ==============================
   HERO TYPING ANIMATION
============================== */

(() => {

    const typingText = document.getElementById("typingText");

    if (!typingText) return;

    const roles = [
        "Web Developer",
        "UI/UX Designer",
        "Frontend Developer",
        "Full Stack Developer"
    ];

    // Reduced motion accessibility
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typingText.textContent = roles[0];
        return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentRole = roles[roleIndex];

        if (!deleting) {

            typingText.textContent =
                currentRole.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentRole.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);
                return;
            }

            setTimeout(typeEffect, 100);

        } else {

            typingText.textContent =
                currentRole.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                roleIndex = (roleIndex + 1) % roles.length;

                setTimeout(typeEffect, 400);
                return;
            }

            setTimeout(typeEffect, 50);
        }
    }

    typingText.textContent = "";
    typeEffect();

})();







/* ==============================
   ABOUT STATISTICS COUNTER
============================== */

(() => {

    const aboutStats = document.querySelector(".about-stats");

    if (!aboutStats) return;

    const counters = aboutStats.querySelectorAll(".stat-number");

    let hasAnimated = false;

    function startCounters() {

        if (hasAnimated) return;

        hasAnimated = true;

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);
            const digits = Number(counter.dataset.digits) || 0;

            if (!Number.isFinite(target) || target < 0) return;

            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const elapsed = currentTime - startTime;

                const progress = Math.min(elapsed / duration, 1);

                // Smooth easing effect
                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                const currentValue = Math.floor(
                    easedProgress * target
                );

                counter.textContent = String(currentValue)
                    .padStart(digits, "0");

                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = String(target)
                        .padStart(digits, "0");

                }

            }

            requestAnimationFrame(updateCounter);

        });

    }


    // Accessibility: Reduced Motion

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);
            const digits = Number(counter.dataset.digits) || 0;

            counter.textContent = String(target).padStart(digits, "0");

        });

        hasAnimated = true;
        return;

    }


    // Start animation when About stats become visible

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                startCounters();

                observer.disconnect();

            }

        });

    }, {
        threshold: 0.3
    });

    observer.observe(aboutStats);

})();





/* ==============================
   ABOUT SCROLL REVEAL
============================== */

(() => {

    const aboutSection = document.querySelector("#about");

    if (!aboutSection) return;

    const elements = aboutSection.querySelectorAll(
        ".section-heading, .about-visual, .about-info, .stat-card"
    );

    // Reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Add reveal classes
    elements.forEach((element, index) => {

        element.classList.add("reveal-item");

        // Slight delay between elements
        element.style.transitionDelay = `${index * 100}ms`;

    });

    // Observe elements
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(element => {
        observer.observe(element);
    });

})();











/* ==============================
   SKILLS SCROLL REVEAL
============================== */

(() => {

    const skillsSection = document.querySelector("#skills");

    if (!skillsSection) return;

    const revealElements = skillsSection.querySelectorAll(
        ".section-heading, .skill-card, .learning-box"
    );

    // Reduced motion preference check
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Add reveal classes
    revealElements.forEach((element, index) => {

        element.classList.add("reveal-item");

        element.style.transitionDelay = `${index * 120}ms`;

    });


    // Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });


    // Observe all elements
    revealElements.forEach(element => {

        observer.observe(element);

    });

})();








/* ==============================
   SERVICES SCROLL REVEAL
============================== */

(() => {

    const servicesSection = document.querySelector("#services");

    if (!servicesSection) return;

    const revealElements = servicesSection.querySelectorAll(
        ".section-heading, .service-card"
    );

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;


    // Add reveal classes
    revealElements.forEach((element, index) => {

        element.classList.add("reveal-item");

        element.style.transitionDelay = `${index * 150}ms`;

    });


    // Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });


    // Observe elements
    revealElements.forEach(element => {

        observer.observe(element);

    });

})();






/* ==============================
   PROJECTS SCROLL REVEAL
============================== */

(() => {

    const projectsSection = document.querySelector("#projects");

    if (!projectsSection) return;

    const revealElements = projectsSection.querySelectorAll(
        ".section-heading, .project-card"
    );

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;


    // Add reveal classes
    revealElements.forEach((element, index) => {

        element.classList.add("reveal-item");

        element.style.transitionDelay = `${index * 150}ms`;

    });


    // Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });


    // Observe elements
    revealElements.forEach(element => {

        observer.observe(element);

    });

})();









/* ==============================
   PROJECT CATEGORY FILTER
============================== */

(() => {

    const projectsSection = document.querySelector("#projects");

    if (!projectsSection) return;

    const filterButtons = projectsSection.querySelectorAll(".filter-btn");

    const projectCards = projectsSection.querySelectorAll(".project-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter;


            // Update active button
            filterButtons.forEach(btn => {

                const isActive = btn === button;

                btn.classList.toggle("active", isActive);

                btn.setAttribute("aria-pressed", isActive);

            });


            // Filter project cards
            projectCards.forEach(card => {

                const cardCategory = card.dataset.category;

                const shouldShow =
                    selectedFilter === "all" ||
                    cardCategory === selectedFilter;

                card.hidden = !shouldShow;

            });

        });

    });

})();











/* ==============================
   JOURNEY SECTION ANIMATIONS
============================== */

(() => {

    const journeySection = document.querySelector("#journey");

    if (!journeySection) return;

    const animatedElements = journeySection.querySelectorAll(
        ".section-heading, .journey-title, .timeline-item"
    );

    const timelines = journeySection.querySelectorAll(".timeline");

    // Reduced motion preference
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Show everything without animation
    if (reduceMotion) {

        animatedElements.forEach(element => {
            element.classList.add("is-visible");
        });

        timelines.forEach(timeline => {
            timeline.classList.add("is-visible");
        });

        return;
    }

    // Reveal animation
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry, index) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    animatedElements.forEach((element, index) => {

        element.classList.add("reveal-item");

        element.style.transitionDelay = `${index * 100}ms`;

        revealObserver.observe(element);

    });


    // Timeline progress animation
    const timelineObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.2
        }
    );

    timelines.forEach(timeline => {
        timelineObserver.observe(timeline);
    });

})();










/* ==============================
   CONTACT FORM FUNCTIONALITY
============================== */

(() => {

    const contactForm = document.querySelector("#contactForm");

    if (!contactForm) return;

    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const subjectInput = document.querySelector("#subject");
    const messageInput = document.querySelector("#message");

    const submitButton = contactForm.querySelector(".contact-submit");
    const statusMessage = document.querySelector("#formStatus");

    const myEmail = "jitanhansda388@gmail.com";

    let emailPending = false;
    let leftWebsite = false;


    // Show status message

    function showStatus(message, type) {

        statusMessage.textContent = message;
        statusMessage.className = `form-status ${type}`;

    }


    // Reset form after returning from email app

    function resetContactForm() {

        if (!emailPending || !leftWebsite) return;

        contactForm.reset();

        statusMessage.textContent = "";
        statusMessage.className = "form-status";

        submitButton.disabled = false;

        submitButton.querySelector("span").textContent =
            "Send Message";

        emailPending = false;
        leftWebsite = false;

    }


    // Detect when user leaves website

    window.addEventListener("blur", () => {

        if (emailPending) {
            leftWebsite = true;
        }

    });


    // Detect when user returns to website

    window.addEventListener("focus", () => {

        resetContactForm();

    });


    // Also support mobile browsers

    document.addEventListener("visibilitychange", () => {

        if (document.visibilityState === "hidden" && emailPending) {

            leftWebsite = true;

        }

        if (document.visibilityState === "visible") {

            resetContactForm();

        }

    });


    // Form submission

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        statusMessage.textContent = "";
        statusMessage.className = "form-status";


        // Browser validation

        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;

        }


        // Get input values

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();


        // Name validation

        if (name.length < 2) {

            showStatus("Please enter a valid name.", "error");

            nameInput.focus();

            return;

        }


        // Email validation

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

            showStatus("Please enter a valid email address.", "error");

            emailInput.focus();

            return;

        }


        // Subject validation

        if (subject.length < 3) {

            showStatus(
                "Subject must contain at least 3 characters.",
                "error"
            );

            subjectInput.focus();

            return;

        }


        // Message validation

        if (message.length < 10) {

            showStatus(
                "Message must contain at least 10 characters.",
                "error"
            );

            messageInput.focus();

            return;

        }


        // Prepare email content

        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            `Hello Jitan,

Name: ${name}
Email: ${email}

Message:
${message}`
        );


        // Create mailto link

        const mailtoLink =
            `mailto:${myEmail}?subject=${emailSubject}&body=${emailBody}`;


        // Loading state

        submitButton.disabled = true;

        submitButton.querySelector("span").textContent =
            "Opening Email App...";


        showStatus(
            "Your email application is opening. Send your message there, then return to this website.",
            "success"
        );


        // Mark email as pending

        emailPending = true;
        leftWebsite = false;


        // Open email application

        window.location.href = mailtoLink;


        // Restore button if email app does not open

        setTimeout(() => {

            if (emailPending && !leftWebsite) {

                submitButton.disabled = false;

                submitButton.querySelector("span").textContent =
                    "Send Message";

            }

        }, 3000);

    });

})();









/* ==============================
   FOOTER FUNCTIONALITY
============================== */

(() => {

    // Automatic Current Year

    const currentYear = document.querySelector("#current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // Back To Top

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        backToTop.addEventListener("click", (event) => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // Footer Scroll Reveal

    const footerElements = document.querySelectorAll(
        ".footer-brand, .footer-links, .footer-contact, .footer-bottom"
    );

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const footerObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    footerElements.forEach((element, index) => {

        element.classList.add("footer-reveal");

        element.style.transitionDelay = `${index * 100}ms`;

        footerObserver.observe(element);

    });

})();