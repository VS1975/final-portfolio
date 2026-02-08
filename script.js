// ===========================
// SMOOTH SCROLL & INTERACTIONS
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // MOBILE MENU TOGGLE LOGIC
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (menuToggle && nav) {
        // Toggle Menu
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : ''; // Prevent background scrolling
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.classList.remove('is-active');
                document.body.style.overflow = '';
            }
        });
    }

    // ... existing code ...
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all major sections and cards
    const elementsToAnimate = document.querySelectorAll(
        '.strength-item, .timeline-item, .skill-category, .education-item, .contact-card, .project-card, .cert-list li'
    );

    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.25s ease-out, transform 0.25s ease-out';
        observer.observe(element);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add active state to contact cards on focus
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('focus', function() {
            this.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Performance: Reduce animations on low-end devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elementsToAnimate.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.style.transition = 'none';
        });
    }

    // Add keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Simple analytics helper (placeholder for future integration)
    function trackEvent(category, action, label) {
        // This is where you'd integrate with Google Analytics or similar
        console.log('Event tracked:', { category, action, label });
    }

    // Track CTA clicks
    document.querySelectorAll('.btn, .contact-card').forEach(element => {
        element.addEventListener('click', function() {
            const action = this.classList.contains('btn') ? 'Button Click' : 'Contact Click';
            const label = this.textContent.trim() || this.querySelector('.contact-value')?.textContent;
            trackEvent('User Interaction', action, label);
        });
    });

    // Console message for developers
    console.log('%c👋 Hi there!', 'color: #2563EB; font-size: 20px; font-weight: bold;');
    console.log('%cThanks for checking out the code! If you\'re interested in working together, reach out at codewithvarun80@gmail.com', 'color: #4B5563; font-size: 14px;');
});

// ===========================
// ACCESSIBILITY ENHANCEMENTS
// ===========================

// Skip to main content link (for screen readers)
const skipLink = document.createElement('a');
skipLink.href = '#about';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #2563EB;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
`;

skipLink.addEventListener('focus', function() {
    this.style.top = '0';
});

skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);
