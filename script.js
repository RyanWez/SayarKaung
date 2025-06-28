// Mobile menu toggle functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Skip if href is just "#" (placeholder links)
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Partner card click handler with actual links
document.querySelectorAll('.partner-card').forEach(card => {
    card.addEventListener('click', function() {
        const site = this.getAttribute('data-site');
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
            // Open the partner website in a new tab
            window.open(site, '_blank');
        }, 150);
    });
});

// Agent card click handler
document.querySelectorAll('.agent-card').forEach(card => {
    card.addEventListener('click', function() {
        const link = this.getAttribute('data-link');
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
            // You can add the actual links here when provided
            if (link && link !== '#') {
                window.open(link, '_blank');
            }
        }, 150);
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card, .partner-card, .social-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add hover effects for social media cards
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        const platform = this.querySelector('span').textContent;
        
        // Change colors based on platform
        switch(platform) {
            case 'Facebook':
                icon.style.color = '#1877f2';
                break;
            case 'Telegram':
                icon.style.color = '#0088cc';
                break;
            case 'Viber':
                icon.style.color = '#665cac';
                break;
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('i');
        icon.style.color = '';
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
});

// Enhanced particle effect background with casino-themed elements
function createEnhancedParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    // Create different types of particles
    for (let i = 0; i < 30; i++) {
        // Golden sparkles
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: radial-gradient(circle, #ffd700, #ffed4e);
            border-radius: 50%;
            animation: sparkle ${Math.random() * 4 + 3}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 3}s;
            box-shadow: 0 0 6px rgba(255, 215, 0, 0.8);
        `;
        particlesContainer.appendChild(sparkle);
    }
    
    // Create floating casino symbols
    const symbols = ['♠', '♥', '♦', '♣', '★', '💎'];
    for (let i = 0; i < 15; i++) {
        const symbol = document.createElement('div');
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        symbol.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            color: rgba(255, 215, 0, 0.4);
            animation: floatSymbol ${Math.random() * 6 + 4}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 4}s;
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        `;
        particlesContainer.appendChild(symbol);
    }
    
    // Create glowing orbs
    for (let i = 0; i < 8; i++) {
        const orb = document.createElement('div');
        orb.style.cssText = `
            position: absolute;
            width: ${Math.random() * 60 + 40}px;
            height: ${Math.random() * 60 + 40}px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.1), transparent);
            border-radius: 50%;
            animation: pulse ${Math.random() * 4 + 2}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(orb);
    }
    
    document.body.appendChild(particlesContainer);
}

// Enhanced CSS animations for particles
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    @keyframes sparkle {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            opacity: 0.3; 
        }
        25% { 
            transform: translateY(-30px) rotate(90deg) scale(1.2); 
            opacity: 1; 
        }
        50% { 
            transform: translateY(-60px) rotate(180deg) scale(0.8); 
            opacity: 0.7; 
        }
        75% { 
            transform: translateY(-30px) rotate(270deg) scale(1.1); 
            opacity: 0.9; 
        }
    }
    
    @keyframes floatSymbol {
        0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.4; 
        }
        33% { 
            transform: translateY(-40px) rotate(120deg); 
            opacity: 0.8; 
        }
        66% { 
            transform: translateY(-20px) rotate(240deg); 
            opacity: 0.6; 
        }
    }
    
    @keyframes pulse {
        0%, 100% { 
            transform: scale(1); 
            opacity: 0.1; 
        }
        50% { 
            transform: scale(1.3); 
            opacity: 0.3; 
        }
    }
    
    /* Add subtle glow effect to cards */
    .service-card, .partner-card, .social-card {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    
    .service-card:hover, .partner-card:hover, .social-card:hover {
        box-shadow: 0 8px 25px rgba(255, 215, 0, 0.2);
    }
`;
document.head.appendChild(enhancedStyle);

// Initialize enhanced particles
createEnhancedParticles();
