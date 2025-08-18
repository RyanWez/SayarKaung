// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize pre-loader first
    initPreloader();
    
    // Initialize all functionality
    initNavbar();
    initMobileMenu();
    initSmoothScrolling();
    initScrollReveal();
    initActiveNavHighlighting();
    initPartnerCards();
    initGridBackground();
    initLoadingAnimations();
    initKeyboardNavigation();
});

// Pre-loader Functionality
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    // Show preloader for 0.7 seconds
    setTimeout(() => {
        preloader.classList.add('fade-out');
        
        // Remove preloader from DOM after fade animation completes
        setTimeout(() => {
            preloader.remove();
        }, 300); // Match the CSS transition duration
    }, 700); // 0.7 seconds as requested
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');
    let mobileMenu = document.querySelector('.mobile-menu');

    // Create mobile menu if it doesn't exist
    if (!mobileMenu) {
        mobileMenu = createMobileMenu();
        navbar.appendChild(mobileMenu);
    }

    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && mobileMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Create Mobile Menu
function createMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const mobileLink = link.cloneNode(true);
        mobileLink.addEventListener('click', function() {
            // Close mobile menu when link is clicked
            document.querySelector('.mobile-menu-toggle').classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
        mobileMenu.appendChild(mobileLink);
    });
    
    return mobileMenu;
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Reveal Animation using Intersection Observer
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.service-card, .partner-card, .social-card, section h2');
    
    // Add reveal class to elements
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// Active Navigation Link Highlighting
function initActiveNavHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Partner Cards Click Handler
function initPartnerCards() {
    const partnerCards = document.querySelectorAll('.partner-card[data-site]');
    
    partnerCards.forEach(card => {
        card.addEventListener('click', function() {
            const url = this.getAttribute('data-site');
            if (url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        });

        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make cards focusable
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Visit ${card.querySelector('h3').textContent} website`);
    });
}

// Interactive Grid Background
function initGridBackground() {
    const canvas = document.getElementById('gridCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouse = { x: 0, y: 0 };

    // Resize canvas
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    // Particle class
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse interaction
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.x -= dx * force * 0.01;
                this.y -= dy * force * 0.01;
            }

            // Boundary check
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#4f46e5';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Initialize particles
    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }
    }

    // Draw grid
    function drawGrid() {
        const gridSize = 50;
        ctx.strokeStyle = 'rgba(79, 70, 229, 0.1)';
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        drawGrid();
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.save();
                    ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                    ctx.strokeStyle = '#a855f7';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                    ctx.restore();
                }
            });
        });

        animationId = requestAnimationFrame(animate);
    }

    // Mouse move handler
    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    // Initialize
    resizeCanvas();
    initParticles();
    animate();

    // Handle resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        initParticles();
    });

    // Pause animation when not visible (performance optimization)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// Loading Animations
function initLoadingAnimations() {
    // Add loading class to body
    document.body.classList.add('loading');

    // Remove loading class after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            
            // Trigger hero content animation
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '0';
                heroContent.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    heroContent.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    heroContent.style.opacity = '1';
                    heroContent.style.transform = 'translateY(0)';
                }, 100);
            }
        }, 500);
    });
}

// Keyboard Navigation Support
function initKeyboardNavigation() {
    // Add keyboard support for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // Add keyboard support for agent links
    const agentLinks = document.querySelectorAll('.agent-text');
    agentLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Add keyboard support for social cards
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Utility Functions

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function scrollToElement(element, offset = 0) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Performance monitoring (optional)
function initPerformanceMonitoring() {
    // Monitor FPS
    let fps = 0;
    let lastTime = performance.now();
    
    function measureFPS() {
        const currentTime = performance.now();
        fps = 1000 / (currentTime - lastTime);
        lastTime = currentTime;
        
        // Log FPS if it drops below 30
        if (fps < 30) {
            console.warn('Low FPS detected:', Math.round(fps));
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    // Only monitor in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        measureFPS();
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error tracking service
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavbar,
        initMobileMenu,
        initSmoothScrolling,
        initScrollReveal,
        initActiveNavHighlighting,
        initPartnerCards,
        initGridBackground,
        throttle,
        debounce,
        isInViewport,
        scrollToElement
    };
}
