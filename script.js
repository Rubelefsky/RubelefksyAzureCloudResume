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

// ============================================
// VISITOR COUNTER - Step 7 of Cloud Resume Challenge
// ============================================

// IMPORTANT: Replace this URL with your actual Azure Function URL
// After deploying your function, it will look something like:
// https://cloudresume-api.azurewebsites.net/api/GetVisitorCount
const API_URL = 'https://cloudresume-api-rubelefsky-gceag4fsg8gmh0d5.centralus-01.azurewebsites.net/api/getvisitorcounter';

/**
 * Fetches the visitor count from the Azure Function API
 * and updates the counter display on the page
 */
async function updateVisitorCounter() {
    const counter = document.getElementById('visitorCount');
    
    if (!counter) {
        console.log('Visitor counter element not found');
        return;
    }

    try {
        // Show loading state
        counter.textContent = 'Loading...';
        
        // Call the Azure Function API
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Update the counter with the retrieved value
        counter.textContent = data.count.toLocaleString();
        
        // Optional: Add a subtle animation when count updates
        counter.style.transform = 'scale(1.1)';
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
        }, 200);

    } catch (error) {
        console.error('Error fetching visitor count:', error);
        
        // Show error state - you might want to hide this in production
        // or show a default value
        counter.textContent = '---';
        
        // Optional: Retry after a delay
        // setTimeout(updateVisitorCounter, 5000);
    }
}

// Initialize visitor counter when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    updateVisitorCounter();
});
