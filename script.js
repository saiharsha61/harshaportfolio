// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeContactForm();
    initializeSkillBars();
    initializeScrollAnimations();
    initializeMobileMenu();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
        });
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Also check for home section (hero)
        if (scrollY < 100) {
            current = 'home';
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Enhanced contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate all fields
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Remove any error states
                formInputs.forEach(input => {
                    input.classList.remove('error', 'success');
                });
            }, 2000);
        } else {
            showNotification('Please correct the errors in the form.', 'error');
        }
    });
}

// Field validation function
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove previous states
    field.classList.remove('error', 'success');
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            isValid = false;
        }
    }
    
    // Name validation (minimum 2 characters)
    if (field.name === 'name' && value && value.length < 2) {
        field.classList.add('error');
        isValid = false;
    }
    
    // Message validation (minimum 10 characters)
    if (field.name === 'message' && value && value.length < 10) {
        field.classList.add('error');
        isValid = false;
    }
    
    if (isValid && value) {
        field.classList.add('success');
    }
    
    return isValid;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Skill bars animation
function initializeSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const animateSkillBars = () => {
        skillItems.forEach(item => {
            const progress = item.querySelector('.skill-progress');
            const width = progress.getAttribute('data-width');
            
            if (isElementInViewport(item) && !progress.classList.contains('animate')) {
                progress.style.setProperty('--width', width + '%');
                progress.classList.add('animate');
                
                // Animate width
                setTimeout(() => {
                    progress.style.width = width + '%';
                }, 100);
            }
        });
    };
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
}

// Scroll animations for other elements
function initializeScrollAnimations() {
    const animateElements = document.querySelectorAll('.project-card, .tool-category, .timeline-item, .certification-card');
    
    const animateOnScroll = () => {
        animateElements.forEach(element => {
            if (isElementInViewportPartial(element, 0.2) && !element.classList.contains('animated')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s ease-out';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.classList.add('animated');
                }, 100);
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(animateOnScroll, 10);
    });
}

// Utility function to check if element is in viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Enhanced viewport check for animations
function isElementInViewportPartial(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const elementHeight = rect.height;
    const elementTop = rect.top;
    
    return (elementTop + elementHeight * threshold < windowHeight) && (elementTop + elementHeight > 0);
}

// Typing effect for hero text (optional enhancement)
function initializeTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (titleElement) {
        const originalText = titleElement.innerHTML;
        const text = titleElement.textContent;
        
        titleElement.innerHTML = '';
        let index = 0;
        
        const typeText = () => {
            if (index < text.length) {
                titleElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 50);
            } else {
                // Restore original HTML with highlight
                titleElement.innerHTML = originalText;
            }
        };
        
        setTimeout(typeText, 1000);
    }
}

// Parallax effect for background elements
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.hero, .tools, .projects');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Add CSS for form validation states
const validationStyles = document.createElement('style');
validationStyles.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #EF4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .form-group input.success,
    .form-group textarea.success {
        border-color: #10B981 !important;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .nav-link.active {
        color: #38BDF8 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;

document.head.appendChild(validationStyles);
