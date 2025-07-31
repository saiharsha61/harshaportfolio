// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    setupScrollIndicator();
    setupSmoothScrolling();
    setupFormHandling();
    setupAnimations();
    setupNavigation();
    setupProjectCards();
    setupSkillsInteraction();
    setupResumeDownload();
}

// Scroll Progress Indicator
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollIndicator.style.setProperty('--scroll-width', `${scrollPercent}%`);
    });
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Form Handling
function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('#name').value;
            const email = formData.get('email') || this.querySelector('#email').value;
            const message = formData.get('message') || this.querySelector('#message').value;
            
            // Validate form
            if (!validateForm(name, email, message)) {
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Form Validation
function validateForm(name, email, message) {
    const errors = [];
    
    if (!name || name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!email || !isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!message || message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
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
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll Animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('section, .project, .experience-item, .skill-category');
    animateElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Navigation Setup
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add navbar styles if not present
    if (navbar && !document.querySelector('#navbar-styles')) {
        const styles = document.createElement('style');
        styles.id = 'navbar-styles';
        styles.textContent = `
            .navbar {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(10px);
                z-index: 1000;
                padding: 1rem 0;
                transition: all 0.3s ease;
            }
            
            .nav-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .nav-logo {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--accent-color);
                text-decoration: none;
            }
            
            .nav-menu {
                display: flex;
                list-style: none;
                gap: 2rem;
                margin: 0;
                padding: 0;
            }
            
            .nav-link {
                color: var(--text-secondary);
                text-decoration: none;
                font-weight: 500;
                transition: color 0.3s ease;
                position: relative;
            }
            
            .nav-link:hover {
                color: var(--accent-color);
            }
            
            .nav-link::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 0;
                height: 2px;
                background: var(--accent-color);
                transition: width 0.3s ease;
            }
            
            .nav-link:hover::after {
                width: 100%;
            }
            
            @media (max-width: 768px) {
                .nav-menu {
                    display: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Project Cards Interaction
function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click to view project details
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn')) {
                const projectTitle = this.querySelector('h3').textContent;
                showNotification(`Opening ${projectTitle} details...`, 'info');
            }
        });
    });
}

// Skills Interaction
function setupSkillsInteraction() {
    const skillItems = document.querySelectorAll('.skills-list span');
    
    skillItems.forEach(skill => {
        skill.addEventListener('click', function() {
            // Add pulse animation
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
            
            // Show skill info
            showNotification(`Expertise in ${this.textContent}`, 'info');
        });
    });
    
    // Add pulse animation styles
    if (!document.querySelector('#pulse-animation')) {
        const pulseStyles = document.createElement('style');
        pulseStyles.id = 'pulse-animation';
        pulseStyles.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(pulseStyles);
    }
}

// Resume Download
function setupResumeDownload() {
    const downloadBtn = document.getElementById('downloadResume');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalText = this.textContent;
            this.textContent = 'Preparing...';
            
            // Simulate download (replace with actual resume file)
            setTimeout(() => {
                showNotification('Resume download started!', 'success');
                this.textContent = originalText;
                
                // Create a dummy download link
                const link = document.createElement('a');
                link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('Kontham Sai Sri Harsha - Resume\n\nFull Stack Developer & AI Automation Specialist\n\nExperience:\n- AI Automation Engineer @ FastBots\n- Cybersecurity Intern\n\nSkills: Python, Java, Flutter, AI/ML, Cybersecurity\n\nContact: Konthamharsha61@gmail.com');
                link.download = 'Kontham_Sai_Sri_Harsha_Resume.txt';
                link.click();
            }, 1500);
        });
    }
}

// Utility Functions
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

// Performance optimization for scroll events
const debouncedScrollHandler = debounce(() => {
    // Any additional scroll-based functionality can go here
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Add CSS for additional components
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .about-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        margin-top: 2rem;
    }
    
    .about-text p {
        margin-bottom: 1.5rem;
    }
    
    .about-skills ul {
        list-style: none;
        padding-left: 0;
    }
    
    .about-skills li {
        margin-bottom: 0.75rem;
        color: var(--text-secondary);
    }
    
    .project-tech {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }
    
    .project-tech span {
        background: rgba(6, 182, 212, 0.2);
        color: var(--accent-color);
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .experience-container {
        max-width: 800px;
        margin: 0 auto;
    }
    
    .experience-period {
        color: var(--accent-color);
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .skills-categories {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .skill-category h3 {
        color: var(--accent-color);
        margin-bottom: 1rem;
        text-align: center;
    }
    
    .certifications-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .certification-item {
        background: var(--background-light);
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
        transition: all 0.3s ease;
    }
    
    .certification-item:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    
    .cert-date {
        background: var(--gradient-primary);
        color: white;
        padding: 0.25rem 1rem;
        border-radius: 1rem;
        font-size: 0.9rem;
        font-weight: 600;
    }
    
    .contact-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        margin-top: 2rem;
    }
    
    .contact-info h3 {
        color: var(--accent-color);
        margin-bottom: 1rem;
    }
    
    .contact-details p {
        margin-bottom: 0.75rem;
    }
    
    .contact-details a {
        color: var(--accent-color);
        text-decoration: none;
        transition: color 0.3s ease;
    }
    
    .contact-details a:hover {
        color: var(--primary-color);
    }
    
    .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }
    
    @media (max-width: 768px) {
        .about-content,
        .contact-container {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .skills-categories {
            grid-template-columns: 1fr;
        }
        
        .footer-content {
            flex-direction: column;
            text-align: center;
        }
    }
`;

document.head.appendChild(additionalStyles);
