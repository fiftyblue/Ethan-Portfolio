// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class and observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-content');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.style.display = 'none';
    
    const navLinks = document.querySelector('.nav-links').cloneNode(true);
    mobileMenu.appendChild(navLinks);
    
    nav.appendChild(mobileMenuBtn);
    nav.appendChild(mobileMenu);
    
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.style.display === 'block';
        mobileMenu.style.display = isOpen ? 'none' : 'block';
        mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
    });
    
    // Add mobile menu styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--primary-color);
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .mobile-menu {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: var(--background);
                padding: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .mobile-menu .nav-links {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
};

// Initialize mobile menu
createMobileMenu();

// Add scroll-based progress indicator
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);
    
    const progressStyles = document.createElement('style');
    progressStyles.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 3px;
            background: var(--primary-color);
            z-index: 1001;
            transition: width 0.1s ease-out;
        }
    `;
    document.head.appendChild(progressStyles);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progress.style.width = scrolled + '%';
    });
};

// Initialize scroll progress
createScrollProgress();

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Initialize floating skills
const skills = [
    // Technical Skills
    'Data Analysis & Analytics',
    'SEO Strategy',
    'AI Tool Development',
    'Content Management',
    'Adobe Creative Suite',
    // Marketing Skills
    'Content Strategy',
    'Social Media Growth',
    'Brand Development',
    'Campaign Management',
    'Influencer Partnerships',
    // Leadership Skills
    'Team Management',
    'Project Coordination',
    'Strategic Planning',
    'Cross-functional Leadership',
    'Mentorship'
];

function initializeSkillBubbles() {
    const container = document.getElementById('skills-container');
    
    skills.forEach((skill) => {
        const bubble = document.createElement('div');
        bubble.className = 'skill-bubble';
        bubble.textContent = skill;
        container.appendChild(bubble);
    });

    // Add hover effect with collision prevention
    const bubbles = container.getElementsByClassName('skill-bubble');
    Array.from(bubbles).forEach(bubble => {
        bubble.addEventListener('mouseenter', () => {
            const rect = bubble.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Push other bubbles away
            Array.from(bubbles).forEach(otherBubble => {
                if (otherBubble !== bubble) {
                    const otherRect = otherBubble.getBoundingClientRect();
                    const otherCenterX = otherRect.left + otherRect.width / 2;
                    const otherCenterY = otherRect.top + otherRect.height / 2;

                    const dx = otherCenterX - centerX;
                    const dy = otherCenterY - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) { // Adjust this value based on your needs
                        const angle = Math.atan2(dy, dx);
                        const pushDistance = (150 - distance) / 2;

                        const translateX = Math.cos(angle) * pushDistance;
                        const translateY = Math.sin(angle) * pushDistance;

                        otherBubble.style.transform = `translate(${translateX}px, ${translateY}px)`;
                    }
                }
            });
        });

        bubble.addEventListener('mouseleave', () => {
            // Reset all bubbles
            Array.from(bubbles).forEach(otherBubble => {
                if (otherBubble !== bubble) {
                    otherBubble.style.transform = 'none';
                }
            });
        });
    });
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    const profileContainer = document.querySelector('.profile-container');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        // Parallax effect for hero background
        hero.style.transform = `translateY(${rate * 0.5}px)`;
        
        // Fade out effect for hero content
        heroContent.style.opacity = 1 - Math.max(0, Math.min(1, scrolled / 500));
        
        // Rotate effect for profile picture
        profileContainer.style.transform = `rotateX(${scrolled * 0.05}deg) rotateY(${scrolled * 0.05}deg)`;
    });
}

// Smooth scroll for navigation links and logo
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href') === '#' 
                ? document.body 
                : document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations for timeline items
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = item.classList.contains('left') ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.5s ease-out';
        observer.observe(item);
    });
}

// Hover effect for skill tags
function initSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-5px) scale(1.1)';
            tag.style.backgroundColor = 'var(--accent-color)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
            tag.style.backgroundColor = 'var(--background)';
        });
    });
}

// Counter animation for metrics
function animateMetric(element, start, end, duration) {
    const startTime = performance.now();
    const numberElement = element.querySelector('.metric-number');
    const originalText = numberElement.innerHTML;
    const numericValue = parseFloat(end.replace(/[^0-9.]/g, ''));
    const suffix = end.includes('+') ? '+' : end.includes('x') ? 'x' : '';
    
    function easeOutQuart(x) {
        return 1 - Math.pow(1 - x, 4);
    }
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apply easing function
        const easedProgress = easeOutQuart(progress);
        
        // Calculate current value
        let currentValue = numericValue * easedProgress;
        
        // Format the number based on its magnitude
        let formattedValue;
        if (currentValue >= 1000000) {
            formattedValue = (currentValue / 1000000).toFixed(1) + 'B';
        } else if (currentValue >= 1000) {
            formattedValue = (currentValue / 1000).toFixed(currentValue >= 100000 ? 0 : 1) + 'K';
        } else {
            formattedValue = currentValue.toFixed(1);
        }
        
        // Update the number display
        numberElement.innerHTML = formattedValue + `<span class="accent-text ${suffix === 'x' ? 'x' : 'plus'}">${suffix}</span>`;
        
        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            // Reset to original text when animation completes
            numberElement.innerHTML = originalText;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Initialize metrics animations
function initMetricsAnimations() {
    const metricItems = document.querySelectorAll('.metric-item');
    
    metricItems.forEach(item => {
        const numberElement = item.querySelector('.metric-number');
        const originalText = numberElement.innerHTML;
        
        item.addEventListener('mouseenter', () => {
            // Start the counting animation
            animateMetric(item, '0', originalText, 600); // 600ms duration to match CSS transition
        });
        
        item.addEventListener('mouseleave', () => {
            // Reset to original text
            numberElement.innerHTML = originalText;
        });
    });
}

// Table of Contents functionality
function initTOC() {
    const toc = document.querySelector('.toc');
    const tocItems = document.querySelectorAll('.toc-item');
    const tocIndicator = document.querySelector('.toc-indicator');
    const tocTrack = document.querySelector('.toc-track');
    const sections = ['hero', 'stats', 'about', 'skills', 'experience', 'projects', 'contact'].map(id => document.getElementById(id));
    const trackHeight = tocTrack.offsetHeight;
    
    // Click handlers for TOC items
    tocItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll handler for updating TOC
    function updateTOC() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Calculate scroll percentage
        const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
        const fillHeight = Math.min(Math.max(0, scrollPercentage * trackHeight), trackHeight);
        
        // Update indicator position and fill
        tocIndicator.style.top = `${fillHeight - 4}px`; // Center the ball on the fill line
        tocTrack.style.setProperty('--fill-height', `${fillHeight}px`);

        // Update active section
        let activeSection = sections[0];
        sections.forEach(section => {
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= windowHeight * 0.5) {
                    activeSection = section;
                }
            }
        });

        // Update active TOC item
        tocItems.forEach(item => {
            item.classList.remove('active');
            if (activeSection && item.getAttribute('data-section') === activeSection.id) {
                item.classList.add('active');
            }
        });
    }

    // Initial update and event listeners
    updateTOC();
    window.addEventListener('scroll', updateTOC);
    window.addEventListener('resize', updateTOC);
}

// Initialize TOC when DOM is loaded
document.addEventListener('DOMContentLoaded', initTOC);

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize skills
    initializeSkillBubbles();
    initParallax();
    initSmoothScroll();
    initTimelineAnimations();
    initSkillTags();
    initMetricsAnimations();
    initAboutSection();
    loadSubstackArticles();
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// Smooth Scroll to Top
document.addEventListener('DOMContentLoaded', () => {
    const footerLogo = document.querySelector('.footer-logo');
    
    footerLogo.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            // If on main page, smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // If on other pages, redirect to main page top
            window.location.href = 'index.html#';
        }
    });
});

// Initialize about section animations
function initAboutSection() {
    const aboutParagraphs = document.querySelectorAll('.about-paragraph');
    
    function checkParagraphs() {
        aboutParagraphs.forEach(paragraph => {
            const rect = paragraph.getBoundingClientRect();
            const speed = paragraph.dataset.speed || 0.1;
            
            // Check if element is in viewport
            if (rect.top <= window.innerHeight * 0.8) {
                paragraph.classList.add('visible');
                
                // Parallax effect
                const scrolled = window.pageYOffset;
                const parallaxOffset = scrolled * speed;
                paragraph.style.transform = `translateY(${parallaxOffset}px)`;
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkParagraphs);
    
    // Initial check
    checkParagraphs();
    
    // Force initial visibility after a short delay
    setTimeout(checkParagraphs, 100);
}

// Function to fetch and display Substack articles
async function loadSubstackArticles() {
    const substackFeed = document.getElementById('substack-feed');
    if (!substackFeed) return;

    try {
        // Fetch the RSS feed from Substack
        const response = await fetch('https://ethanwelsh.substack.com/feed');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        const items = xml.querySelectorAll('item');

        // Clear loading state
        substackFeed.innerHTML = '';

        // Process each article
        items.forEach(item => {
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;
            const pubDate = new Date(item.querySelector('pubDate').textContent);
            let description = item.querySelector('description').textContent;
            
            // Create article card
            const articleCard = document.createElement('article');
            articleCard.className = 'blog-card';
            
            // Format date
            const formattedDate = pubDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Clean up description (remove HTML tags and limit length)
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = description;
            description = tempDiv.textContent || tempDiv.innerText;
            const excerpt = description.length > 150 ? 
                description.substring(0, 150) + '...' : 
                description;

            articleCard.innerHTML = `
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date">
                            <i class="far fa-calendar"></i>
                            ${formattedDate}
                        </span>
                    </div>
                    <h2 class="blog-title">${title}</h2>
                    <p class="blog-excerpt">${excerpt}</p>
                    <a href="${link}" target="_blank" class="read-more">
                        Read on Substack <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;

            substackFeed.appendChild(articleCard);
        });

    } catch (error) {
        console.error('Error loading Substack articles:', error);
        substackFeed.innerHTML = `
            <div class="error-state">
                <p>Unable to load articles. Please visit my <a href="https://substack.com/@ethanwelsh" target="_blank">Substack page</a> directly.</p>
            </div>
        `;
    }
} 