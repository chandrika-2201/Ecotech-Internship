// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#FAB12F'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1
            }
        },
        size: {
          value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#FAB12F',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(13, 10, 8, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(13, 10, 8, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.about-content, .skill-category, .project-card, .timeline-item, .cert-card, .interest-card, .stat-item');

animatedElements.forEach(function(el, index) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease ' + (index * 0.1) + 's';
    observer.observe(el);
});

// Animated Counter for Stats
function animateCounter(element, target, duration) {
    if (!duration) duration = 2000;
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start * 100) / 100;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statValue = entry.target.querySelector('h3');
            const targetValue = parseFloat(statValue.textContent);
            animateCounter(statValue, targetValue);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(function(stat) {
    statsObserver.observe(stat);
});

// Project Card 3D Tilt Effect
document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = '';
    });
});

// Ripple Effect on Buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(function() {
        ripple.remove();
    }, 600);
}

const style = document.createElement('style');
style.textContent = '.btn { position: relative; overflow: hidden; } .ripple { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.6); transform: scale(0); animation: ripple-animation 0.6s ease-out; } @keyframes ripple-animation { to { transform: scale(4); opacity: 0; } }';
document.head.appendChild(style);

document.querySelectorAll('.btn').forEach(function(button) {
    button.addEventListener('click', createRipple);
});

// Parallax Effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText && heroImage && scrolled < window.innerHeight) {
        heroText.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
        heroImage.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
    }
});

// Active Navigation
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(function(section) {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Scroll Progress Bar
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = 'position: fixed; top: 0; left: 0; height: 4px; background: linear-gradient(90deg, #FAB12F 0%, #FA812F 100%); z-index: 9999; transition: width 0.1s ease;';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.style.cssText = 'position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; background: linear-gradient(135deg, #FAB12F 0%, #FA812F 100%); color: white; border: none; border-radius: 50%; cursor: pointer; display: none; align-items: center; justify-content: center; font-size: 1.2rem; box-shadow: 0 4px 15px rgba(250, 177, 47, 0.4); transition: all 0.3s ease; z-index: 9998;';

scrollToTopBtn.addEventListener('mouseenter', function() {
    scrollToTopBtn.style.transform = 'translateY(-5px)';
    scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(250, 177, 47, 0.6)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(250, 177, 47, 0.4)';
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Loading Animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console Message
console.log('%c🚀 Portfolio Built by Siva Chandrika Mogili', 'font-size: 20px; font-weight: bold; color: #FAB12F;');
console.log('%c📧 Contact: chandumogili2201@gmail.com', 'font-size: 14px; color: #FEF3E2;');

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    highlightNavigation();
});