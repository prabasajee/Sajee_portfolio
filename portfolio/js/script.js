// ===== PORTFOLIO JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeLoader();
    initializeNavigation();
    initializeThemeToggle();
    initializeTypedText();
    initializeScrollEffects();
    initializeSkillBars();
    initializeProjectFilters();
    initializeContactForm();
    initializeBackToTop();
    initializeSmoothScrolling();
    
    // Intersection Observer for animations
    initializeScrollAnimations();
});

// ===== LOADING SCREEN =====
function initializeLoader() {
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }, 1000);
    });
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = getComputedStyle(document.documentElement)
                .getPropertyValue('--bg-primary').trim() === '#ffffff' 
                ? 'rgba(255, 255, 255, 0.98)' 
                : 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = 'var(--shadow)';
        } else {
            navbar.style.background = getComputedStyle(document.documentElement)
                .getPropertyValue('--bg-primary').trim() === '#ffffff' 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
}

// ===== THEME TOGGLE =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add animation effect
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

// ===== TYPED TEXT EFFECT =====
function initializeTypedText() {
    const typedTextElement = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    
    const textArray = [
        'Network Engineer',
        'DevOps Specialist',
        'Cloud Architect',
        'Infrastructure Expert',
        'Security Professional'
    ];
    
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let deletingDelay = 50;
    let pauseDelay = 2000;
    
    function type() {
        const currentText = textArray[textArrayIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(type, deletingDelay);
            }
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, pauseDelay);
            } else {
                setTimeout(type, typingDelay);
            }
        }
    }
    
    // Start typing effect
    setTimeout(type, 1000);
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }
    
    // Intersection Observer for skill bars
    const skillsSection = document.querySelector('.skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ===== PROJECT FILTERS =====
function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Form validation
            if (!validateForm(formObject)) {
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Simulate form submission (replace with actual form handling)
                await simulateFormSubmission(formObject);
                
                // Show success message
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
                
            } catch (error) {
                // Show error message
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    function validateForm(data) {
        const { name, email, subject, message } = data;
        
        if (!name.trim()) {
            showNotification('Please enter your name.', 'error');
            return false;
        }
        
        if (!email.trim() || !isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return false;
        }
        
        if (!subject.trim()) {
            showNotification('Please enter a subject.', 'error');
            return false;
        }
        
        if (!message.trim()) {
            showNotification('Please enter a message.', 'error');
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#6366f1';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Smooth scroll for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = button.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const animationElements = document.querySelectorAll([
        '.about-content',
        '.skill-category',
        '.project-card',
        '.contact-content'
    ].join(','));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animationElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== UTILITY FUNCTIONS =====

// Throttle function for scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Random number generator
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
    
    // Arrow keys for project navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const projectCards = document.querySelectorAll('.project-card:not([style*="display: none"])');
        const currentFocused = document.activeElement;
        
        if (currentFocused && currentFocused.classList.contains('project-card')) {
            const currentIndex = Array.from(projectCards).indexOf(currentFocused);
            let nextIndex;
            
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : projectCards.length - 1;
            } else {
                nextIndex = currentIndex < projectCards.length - 1 ? currentIndex + 1 : 0;
            }
            
            projectCards[nextIndex].focus();
            e.preventDefault();
        }
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // You could send error reports to analytics service here
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Handle promise rejections gracefully
});

// ===== ANALYTICS & TRACKING =====
function trackUserInteraction(action, element) {
    // This is where you would integrate with Google Analytics, etc.
    console.log(`User interaction: ${action} on ${element}`);
    
    // Example: gtag('event', action, { element: element });
}

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        trackUserInteraction('button_click', e.target.textContent.trim());
    }
    
    if (e.target.classList.contains('project-link')) {
        trackUserInteraction('project_link_click', e.target.closest('.project-card').querySelector('h3').textContent);
    }
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10001;
        border-radius: 4px;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels where needed
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    const navToggle = document.getElementById('nav-toggle');
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    const backToTop = document.getElementById('back-to-top');
    backToTop.setAttribute('aria-label', 'Back to top');
}

// Initialize accessibility enhancements
enhanceAccessibility();

// ===== PWA SUPPORT =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}