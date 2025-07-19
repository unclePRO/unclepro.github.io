// Portfolio project data
const portfolioData = [
    {
        title: "E-commerce Platform",
        category: "web",
        description: "A modern e-commerce solution built with React and Node.js. Features include real-time inventory management, secure payment processing, and an intuitive admin dashboard. The platform handles thousands of products and supports multiple payment gateways.",
        image: "https://via.placeholder.com/400x300/4f46e5/ffffff?text=E-commerce+Platform"
    },
    {
        title: "Mobile App Design",
        category: "design",
        description: "Complete UI/UX design for a fitness tracking mobile application. Created user personas, wireframes, and high-fidelity prototypes. The design focuses on user engagement and motivation through gamification elements.",
        image: "https://via.placeholder.com/400x300/06b6d4/ffffff?text=Mobile+App+Design"
    },
    {
        title: "Brand Identity",
        category: "branding",
        description: "Full brand identity design for a sustainable fashion startup. Includes logo design, color palette, typography, brand guidelines, and marketing materials. The identity reflects the company's commitment to environmental responsibility.",
        image: "https://via.placeholder.com/400x300/10b981/ffffff?text=Brand+Identity"
    },
    {
        title: "Digital Campaign",
        category: "marketing",
        description: "Comprehensive digital marketing campaign for a tech startup launch. Included social media strategy, content creation, influencer partnerships, and performance tracking. Achieved 300% increase in brand awareness within 3 months.",
        image: "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Digital+Campaign"
    }
];

class UnclePROWebsite {
    constructor() {
        this.currentTheme = 'light';
        this.init();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.startTypingAnimation();
        this.createParticles();
    }

    init() {
        // Initialize theme first
        this.initializeTheme();
        
        // Initialize navigation
        this.setupNavigation();
        
        // Initialize portfolio
        this.setupPortfolio();
        
        // Initialize form
        this.setupContactForm();
        
        // Initialize animations
        this.setupScrollAnimations();
    }

    setupEventListeners() {
        // Theme toggle - Fixed implementation
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        }

        // Mobile navigation
        const navToggle = document.getElementById('nav-toggle');
        const navClose = document.getElementById('nav-close');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', (e) => {
                e.preventDefault();
                navMenu.classList.add('active');
            });
        }

        if (navClose && navMenu) {
            navClose.addEventListener('click', (e) => {
                e.preventDefault();
                navMenu.classList.remove('active');
            });
        }

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            });
        });

        // Fixed smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Portfolio filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.filterPortfolio(btn.dataset.filter);
            });
        });

        // Portfolio modals - Fixed implementation
        document.querySelectorAll('.portfolio-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectIndex = parseInt(btn.dataset.project);
                this.openModal(projectIndex);
            });
        });

        // Modal close - Fixed implementation
        const modal = document.getElementById('portfolio-modal');
        const modalClose = document.getElementById('modal-close');
        
        if (modalClose) {
            modalClose.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal();
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal__overlay')) {
                    this.closeModal();
                }
            });
        }

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Window scroll event for navigation highlight
        window.addEventListener('scroll', () => this.highlightActiveNavLink());
    }

    initializeTheme() {
        // Check if user has a saved preference
        const savedTheme = localStorage.getItem('unclepro-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme
        this.currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.applyTheme(this.currentTheme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('unclepro-theme', this.currentTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-color-scheme', theme);
        
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    setupNavigation() {
        // Active navigation highlighting
        this.highlightActiveNavLink();
    }

    highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link');
        
        let current = 'home'; // Default to home
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setupPortfolio() {
        // Initialize portfolio filter
        this.filterPortfolio('all');
    }

    filterPortfolio(filter) {
        const items = document.querySelectorAll('.portfolio-item');
        const buttons = document.querySelectorAll('.filter-btn');

        // Update active button
        buttons.forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`[data-filter="${filter}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Filter items with animation
        items.forEach((item, index) => {
            const category = item.dataset.category;
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                item.classList.add('hidden');
            }
        });
    }

    openModal(projectIndex) {
        const modal = document.getElementById('portfolio-modal');
        const project = portfolioData[projectIndex];
        
        if (!project || !modal) {
            console.error('Project or modal not found:', projectIndex);
            return;
        }

        // Populate modal content
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalImage = document.getElementById('modal-image');
        
        if (modalTitle) modalTitle.textContent = project.title;
        if (modalDescription) modalDescription.textContent = project.description;
        if (modalImage) {
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalImage.onload = () => {
                console.log('Modal image loaded successfully');
            };
            modalImage.onerror = () => {
                console.error('Failed to load modal image');
            };
        }

        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log('Modal opened for project:', project.title);
    }

    closeModal() {
        const modal = document.getElementById('portfolio-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });

        // Add real-time validation
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.clearFieldError(field);

        if (!value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else {
            switch (field.type) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    isValid = emailRegex.test(value);
                    errorMessage = 'Please enter a valid email address';
                    break;
                case 'text':
                    isValid = value.length >= 2;
                    errorMessage = 'This field must be at least 2 characters long';
                    break;
            }
            
            if (field.tagName.toLowerCase() === 'textarea') {
                isValid = value.length >= 10;
                errorMessage = 'Message must be at least 10 characters long';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = 'var(--color-error)';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--color-error);
            font-size: var(--font-size-sm);
            margin-top: var(--space-4);
            animation: fadeInUp 0.3s ease-out;
        `;
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Validate all fields
        const fields = form.querySelectorAll('.form-control');
        let isFormValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Please fix the errors in the form', 'error');
            return;
        }

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
        } catch (error) {
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification status status--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 3000;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger specific animations
                    if (entry.target.querySelector('.stats')) {
                        this.animateCounters();
                    }
                    
                    if (entry.target.querySelector('.skills')) {
                        this.animateSkillBars();
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.section').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    setupScrollAnimations() {
        // Add fade-in animation to various elements
        const animatedElements = document.querySelectorAll(
            '.service-card, .portfolio-item, .contact__card'
        );
        
        animatedElements.forEach((el, index) => {
            el.style.cssText = `
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease-out ${index * 0.1}s;
            `;
        });

        // Trigger animations on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat__number');
        
        counters.forEach(counter => {
            if (counter.classList.contains('animated')) return;
            
            const target = parseInt(counter.dataset.target);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);

            counter.classList.add('animated');
        });
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill__progress');
        
        skillBars.forEach(bar => {
            if (bar.classList.contains('animated')) return;
            
            const width = bar.dataset.width;
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
            
            bar.classList.add('animated');
        });
    }

    startTypingAnimation() {
        const element = document.getElementById('typing-text');
        if (!element) return;

        const text = 'unclePRO';
        let index = 0;
        
        element.textContent = '';
        
        // Start typing after initial delay
        setTimeout(() => {
            const typeInterval = setInterval(() => {
                element.textContent += text[index];
                index++;
                
                if (index >= text.length) {
                    clearInterval(typeInterval);
                    // Add blinking cursor effect
                    element.style.cssText += `
                        border-right: 3px solid var(--color-primary);
                        animation: blink 1s infinite;
                    `;
                }
            }, 150);
        }, 1000);
    }

    createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particleContainer);

        // Create floating particles
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                this.createParticle(particleContainer);
            }, i * 200);
        }

        // Continuously create new particles
        setInterval(() => {
            if (document.querySelectorAll('.particle').length < 30) {
                this.createParticle(particleContainer);
            }
        }, 3000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 3;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(var(--color-teal-500-rgb), 0.3);
            border-radius: 50%;
            left: ${startX}px;
            top: ${window.innerHeight}px;
            animation: floatUp ${duration}s linear ${delay}s forwards;
            filter: blur(0.5px);
        `;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, (duration + delay) * 1000);
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: var(--color-primary); }
        51%, 100% { border-color: transparent; }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UnclePROWebsite();
});

// Handle page visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Refresh animations when page becomes visible
        const skillBars = document.querySelectorAll('.skill__progress.animated');
        const counters = document.querySelectorAll('.stat__number.animated');
        
        skillBars.forEach(bar => {
            bar.classList.remove('animated');
            bar.style.width = '0';
        });
        
        counters.forEach(counter => {
            counter.classList.remove('animated');
            counter.textContent = '0';
        });
    }
});