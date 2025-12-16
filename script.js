// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Cursor glow effect (desktop only)
const cursorGlow = document.getElementById('cursorGlow');

if (window.matchMedia('(pointer: fine)').matches && cursorGlow) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow effect
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        cursorGlow.style.left = currentX + 'px';
        cursorGlow.style.top = currentY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hide cursor glow when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '0.3';
    });
} else if (cursorGlow) {
    cursorGlow.style.display = 'none';
}

// Scroll reveal animation with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(item => {
    revealObserver.observe(item);
});

// Add staggered animation delays to resume sections
document.querySelectorAll('.resume-section.reveal').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
});

// Parallax effect for hero section (subtle)
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.002);
        }
    });
}

// Interactive hover effect for cards
document.querySelectorAll('.skill-category, .cert-item, .contact-link').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Typing effect for hero badge
const heroBadge = document.querySelector('.hero-badge');
if (heroBadge) {
    heroBadge.style.opacity = '0';
    setTimeout(() => {
        heroBadge.style.opacity = '1';
    }, 100);
}

// Visitor counter functionality (placeholder for Azure Function integration)
document.addEventListener('DOMContentLoaded', function() {
    const counter = document.getElementById('visitorCount');
    if (counter) {
        // This would connect to your Azure Function
        // For now, showing a placeholder
        setTimeout(() => {
            counter.textContent = 'Loading...';
        }, 500);
    }
});
