// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('theme-toggle');
        const sunIcon = themeToggle.querySelector('.sun-icon');
        const moonIcon = themeToggle.querySelector('.moon-icon');
        
        if (this.theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
        } else {
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    bindEvents() {
        // Mobile menu toggle
        this.mobileMenuToggle.addEventListener('click', () => this.toggleMobileMenu());

        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Scroll event for navbar background
        window.addEventListener('scroll', () => this.handleScroll());

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.mobileMenuToggle.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.mobileMenuToggle.classList.remove('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
        this.closeMobileMenu();
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                this.navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            }
        } else {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                this.navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            }
        }
    }

    handleOutsideClick(e) {
        if (!this.navbar.contains(e.target)) {
            this.closeMobileMenu();
        }
    }
}

// Scroll Management
class ScrollManager {
    constructor() {
        this.backToTopButton = document.getElementById('back-to-top');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.backToTopButton.addEventListener('click', () => scrollToTop());
    }

    handleScroll() {
        if (window.scrollY > 300) {
            this.backToTopButton.classList.add('show');
        } else {
            this.backToTopButton.classList.remove('show');
        }
    }
}

// Animation Management
class AnimationManager {
    constructor() {
        this.observedElements = [];
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.observeElements();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    observeElements() {
        const elementsToAnimate = document.querySelectorAll(
            '.section-title, .info-card, .skill-card, .certificate-card, .experience-card, .ambitions-card'
        );
        
        elementsToAnimate.forEach(element => {
            this.observer.observe(element);
        });
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const elementPosition = element.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function openEmail() {
    window.location.href = 'mailto:mohataibrahim@gmail.com';
}

function openGitHub() {
    window.open('https://github.com/mohataibrahim', '_blank');
}

// Smooth scrolling polyfill for older browsers
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
        document.head.appendChild(script);
    }
}

// Performance optimization
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

// Enhanced scroll handling with debouncing
const debouncedScrollHandler = debounce(() => {
    // Update navbar background
    const navbar = document.getElementById('navbar');
    const theme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        navbar.style.background = theme === 'dark' 
            ? 'rgba(15, 23, 42, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = theme === 'dark' 
            ? 'rgba(15, 23, 42, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)';
    }

    // Update back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}, 10);

// Keyboard navigation support
function handleKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Handle escape key to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }

        // Handle enter key on buttons
        if (e.key === 'Enter' && e.target.classList.contains('btn')) {
            e.target.click();
        }
    });
}

// Accessibility improvements
function enhanceAccessibility() {
    // Add ARIA labels
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    mobileMenuToggle.setAttribute('aria-label', 'Toggle mobile menu');
    
    const backToTop = document.getElementById('back-to-top');
    backToTop.setAttribute('aria-label', 'Back to top');

    // Add role attributes
    const navbar = document.getElementById('navbar');
    navbar.setAttribute('role', 'navigation');
    
    // Update ARIA expanded state for mobile menu
    const navMenu = document.getElementById('nav-menu');
    const observer = new MutationObserver(() => {
        const isActive = navMenu.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isActive);
    });
    observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
}

// Preload critical resources
function preloadResources() {
    // Preload fonts if using external fonts
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.as = 'font';
    fontPreload.type = 'font/woff2';
    fontPreload.crossOrigin = 'anonymous';
    
    // Only add if using external fonts
    // document.head.appendChild(fontPreload);
}

// Error handling
function handleErrors() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        // Could send error to analytics service
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        // Could send error to analytics service
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize managers
        new ThemeManager();
        new NavigationManager();
        new ScrollManager();
        new AnimationManager();

        // Initialize utility functions
        smoothScrollPolyfill();
        handleKeyboardNavigation();
        enhanceAccessibility();
        preloadResources();
        handleErrors();

        // Use debounced scroll handler
        window.addEventListener('scroll', debouncedScrollHandler);

        // Add loading complete class for any CSS animations
        document.body.classList.add('loaded');

        console.log('Website initialized successfully');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause any animations or timers
        console.log('Page hidden');
    } else {
        // Page is visible, resume animations or timers
        console.log('Page visible');
    }
});

// Handle resize events
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
}, 250));

// Service worker registration (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

