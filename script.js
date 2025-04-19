// Main script file for Khuddam Al Quran website

// ===== INITIALIZATION LIST =====
// This list contains all the functions that will be initialized when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    initAOS();

    // Initialize navbar functionality
    initNavbar();

    // Initialize smooth scrolling for anchor links
    initSmoothScrolling();

    // Initialize mobile menu and accordion
    initMobileMenu();

    // Initialize counter animations
    initCounterAnimation();

    // Initialize testimonial slider
    initTestimonialSlider();

    // Initialize form submission handling
    initFormHandling();

    // Initialize hero section planet animation
    initHeroAnimation();
});

// ===== UTILITY FUNCTIONS =====
// Easing function for smooth animations
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Helper function to close mobile menu
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle');

    if (mobileMenu) {
        // Add a fade-out effect
        mobileMenu.style.opacity = '0';

        // After the fade-out animation, hide the menu
        setTimeout(() => {
            mobileMenu.style.display = 'none';
            mobileMenu.style.opacity = '1'; // Reset opacity for next opening
        }, 200);

        document.body.style.overflow = ''; // Re-enable scrolling

        // Ensure menu toggle is visible and properly styled
        if (menuToggle) {
            menuToggle.style.zIndex = '9000'; // Keep high z-index

            // Reset menu toggle icon
            const menuIcon = menuToggle.querySelector('i');
            if (menuIcon && menuIcon.classList.contains('fa-xmark')) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-ellipsis-vertical');
            }
        }
    }
}

// ===== INITIALIZATION FUNCTIONS =====

// Initialize AOS animation library
function initAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Initialize navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');

    if (!navbar) return;

    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-primary-black', 'shadow-lg');
        } else {
            navbar.classList.remove('bg-primary-black', 'shadow-lg');
        }

        // Ensure the menu toggle is always visible and clickable
        if (menuToggle) {
            menuToggle.style.zIndex = '60';
        }
    });

    // Trigger scroll event on page load to set initial navbar state
    window.dispatchEvent(new Event('scroll'));
}

// Initialize smooth scrolling for all anchor links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const chevronDown = document.querySelector('.fa-chevron-down')?.closest('a');

    // Consolidated smooth scrolling function
    function smoothScrollToElement(targetElement, duration = 1200) {
        if (!targetElement) return;

        const startPosition = window.scrollY;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80; // Offset for header
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if it's just '#'
            if (this.getAttribute('href') === '#') return;

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Close mobile menu if open
            closeMobileMenu();

            // Special handling for chevron down icon
            if (chevronDown && this === chevronDown) {
                smoothScrollToElement(targetElement, 1200); // Longer duration for hero scroll
            } else {
                // Regular scroll for other links
                smoothScrollToElement(targetElement, 1000);
            }
        });
    });
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const accordionToggles = document.querySelectorAll('.accordion-toggle');

    if (!menuToggle || !mobileMenu) return;

    // Ensure the menu toggle is always visible and accessible
    menuToggle.style.zIndex = '9000';

    // Open menu when clicking the hamburger icon
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        e.preventDefault(); // Prevent default behavior

        // Set initial opacity to 0 for fade-in effect
        mobileMenu.style.opacity = '0';
        mobileMenu.style.display = 'block';
        mobileMenu.style.zIndex = '9999'; // Ensure it's on top

        // Trigger reflow to ensure the transition works
        void mobileMenu.offsetWidth;

        // Fade in the menu
        mobileMenu.style.opacity = '1';

        document.body.style.overflow = 'hidden'; // Prevent scrolling of the body when menu is open

        // Toggle icon between ellipsis and X
        const icon = menuToggle.querySelector('i');
        if (icon && icon.classList.contains('fa-ellipsis-vertical')) {
            icon.classList.remove('fa-ellipsis-vertical');
            icon.classList.add('fa-xmark');
        }
    });

    // Close menu when clicking the X button
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            closeMobileMenu();
        });
    }

    // Add event listener to document to handle clicks outside the menu
    document.addEventListener('click', function(e) {
        // Check if the mobile menu is open and the click is outside the menu and the toggle button
        if (mobileMenu.style.display === 'block' &&
            !mobileMenu.contains(e.target) &&
            e.target !== menuToggle &&
            !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Handle mobile menu closing when clicking on navigation links
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a[href^="#"]');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Accordion functionality for dropdown menus
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Get the content panel that follows this toggle button
            const content = this.nextElementSibling;
            const icon = this.querySelector('i.fas') || this.querySelector('i.fa-chevron-down');
            const iconContainer = this.querySelector('.icon-container');

            // Toggle the content visibility
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                if (icon) {
                    icon.style.transform = 'rotate(180deg)'; // Rotate icon when open
                }

                // Enhance the icon container when open
                if (iconContainer) {
                    iconContainer.classList.add('bg-opacity-40');
                    iconContainer.classList.remove('bg-opacity-20');
                }
            } else {
                content.classList.add('hidden');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)'; // Reset icon rotation
                }

                // Reset the icon container when closed
                if (iconContainer) {
                    iconContainer.classList.remove('bg-opacity-40');
                    iconContainer.classList.add('bg-opacity-20');
                }
            }
        });
    });

    // Close menu when clicking on direct links (not accordion toggles)
    const directLinks = mobileMenu.querySelectorAll('a:not(.accordion-toggle)');
    directLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
}

// Initialize hero animation
function initHeroAnimation() {
    // Get required elements
    const quranText = document.getElementById('quran-text');
    const heroContent = document.getElementById('hero-content');
    const canvas = document.getElementById('orbit-canvas');

    // Skip if any required element is missing
    if (!quranText || !heroContent || !canvas) return;

    const ctx = canvas.getContext('2d');

    // Animation state variables
    let animationRunning = false;
    let animationFrameId = null;
    let arabicLetters = [];
    let stars = [];
    let ringOpacity = 0;
    let ringFadeStartTime = 0;
    const ringFadeDuration = 1000;
    let starOpacity = 0;
    let starFadeStartTime = 0;
    const starFadeDuration = 2000;

    // Check if screen is large enough for the animation
    const isLargeScreen = () => window.innerWidth >= 768;

    // Arabic letters for each ring
    const innerRingChars = 'امس';
    const middleRingChars = 'عفل';
    const outerRingChars = 'حفر';

    // Set canvas size and initialize stars
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }

    // Initialize stars for the background
    function initStars() {
        stars = [];
        const numStars = Math.floor(canvas.width * canvas.height / 2000);

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2.0 + 0.7,
                opacity: Math.random() * 0.3 + 0.2,
                twinkleSpeed: Math.random() * 0.05 + 0.01,
                twinkleFactor: 0,
                color: Math.random() > 0.7 ? '#deae35' : '#FFFFFF'
            });
        }
    }

    // Initialize the Arabic letters for animation
    function initArabicLetters() {
        arabicLetters = [];

        // Calculate a base radius that's responsive to screen size
        const baseRadius = Math.min(window.innerWidth, window.innerHeight) * 0.25;

        // Define solar system planet data with colors and relative orbital speeds
        const planetData = [
            { color: '#e29468', name: 'Mercury', speed: 0.3072 },
            { color: '#e7cdcd', name: 'Venus', speed: 0.224 },
            { color: '#3d9c4b', name: 'Earth', speed: 0.192 },
            { color: '#c1440e', name: 'Mars', speed: 0.1536 },
            { color: '#e0ae6f', name: 'Jupiter', speed: 0.0832 },
            { color: '#d6b56b', name: 'Saturn', speed: 0.0576 },
            { color: '#b5e3e3', name: 'Uranus', speed: 0.0384 },
            { color: '#5b5ddf', name: 'Neptune', speed: 0.032 }
        ];

        // Define the three rings with their specific letters
        const rings = [
            { chars: innerRingChars, radius: baseRadius * 0.5 },
            { chars: middleRingChars, radius: baseRadius * 0.75 },
            { chars: outerRingChars, radius: baseRadius * 1.0 }
        ];

        // Create letters for each ring
        rings.forEach(ring => {
            for (let i = 0; i < ring.chars.length; i++) {
                // Distribute letters evenly around the ring
                const angle = (i / ring.chars.length) * Math.PI * 2;
                const char = ring.chars.charAt(i);
                const finalRadius = ring.radius;

                // Assign a planet color and speed based on position
                const planetIndex = (rings.indexOf(ring) * ring.chars.length + i) % planetData.length;
                const planet = planetData[planetIndex];

                arabicLetters.push({
                    char: char,
                    angle: angle,
                    radius: finalRadius,
                    speed: planet.speed,
                    planetName: planet.name,
                    size: 14.4, // Reduced size by 20%
                    opacity: 1,
                    ringType: rings.indexOf(ring),
                    planetSize: 16, // Reduced size by 20%
                    planetColor: planet.color
                });
            }
        });
    }

    // Draw the orbiting letters with 3D perspective effect
    function drawOrbitingLetters() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw starry background
        if (starOpacity > 0) {
            ctx.save();
            stars.forEach(star => {
                // Update twinkle effect
                star.twinkleFactor += star.twinkleSpeed;
                const twinkle = Math.sin(star.twinkleFactor) * 0.5 + 0.5;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                const globalStarBrightness = 0.6;
                ctx.globalAlpha = star.opacity * twinkle * starOpacity * globalStarBrightness;
                ctx.fill();
            });
            ctx.restore();

            // Update star fade-in effect
            if (starOpacity < 1 && starFadeStartTime > 0) {
                const elapsed = Date.now() - starFadeStartTime;
                starOpacity = Math.min(elapsed / starFadeDuration, 1);
            }
        }

        // Calculate responsive ring sizes
        const baseRadius = Math.min(window.innerWidth, window.innerHeight) * 0.25;
        const ringRadii = [baseRadius * 0.5, baseRadius * 0.75, baseRadius * 1.0];

        // 3D perspective parameters
        const tiltAngle = 0.5; // About 29 degrees
        const horizontalStretch = 3.0; // 300% horizontal stretch

        // Draw orbit rings
        if (ringOpacity > 0) {
            ringRadii.forEach(radius => {
                ctx.beginPath();
                ctx.strokeStyle = '#FFFFFF';
                ctx.setLineDash([5, 10]);
                ctx.lineWidth = 2;
                ctx.globalAlpha = 0.15 * ringOpacity;

                // Draw elliptical path
                ctx.beginPath();
                for (let angle = 0; angle < Math.PI * 2; angle += 0.01) {
                    // Calculate position with horizontal stretch
                    const x = Math.cos(angle) * radius * horizontalStretch;
                    const y = Math.sin(angle) * radius;

                    // Apply rotation for tilt
                    const tiltedX = x * Math.cos(-tiltAngle) - y * Math.sin(-tiltAngle);
                    const tiltedY = x * Math.sin(-tiltAngle) + y * Math.cos(-tiltAngle);

                    // Translate to center of canvas
                    const finalX = canvas.width / 2 + tiltedX;
                    const finalY = canvas.height / 2 + tiltedY;

                    if (angle === 0) {
                        ctx.moveTo(finalX, finalY);
                    } else {
                        ctx.lineTo(finalX, finalY);
                    }
                }

                ctx.closePath();
                ctx.stroke();
            });

            // Update ring fade-in effect
            if (ringOpacity < 1 && ringFadeStartTime > 0) {
                const elapsed = Date.now() - ringFadeStartTime;
                ringOpacity = Math.min(elapsed / ringFadeDuration, 1);
            }
        }

        // Draw Arabic letters with planet-like backgrounds
        ctx.setLineDash([]);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        arabicLetters.forEach(letter => {
            // Update angle (counter-clockwise)
            letter.angle -= letter.speed * 0.01;

            // Calculate position with 3D perspective
            const orbitX = Math.cos(letter.angle) * letter.radius * horizontalStretch;
            const orbitY = Math.sin(letter.angle) * letter.radius;

            // Apply rotation for tilt
            const tiltedX = orbitX * Math.cos(-tiltAngle) - orbitY * Math.sin(-tiltAngle);
            const tiltedY = orbitX * Math.sin(-tiltAngle) + orbitY * Math.cos(-tiltAngle);

            // Final position
            const x = canvas.width / 2 + tiltedX;
            const y = canvas.height / 2 + tiltedY;

            // Draw circular border
            ctx.globalAlpha = letter.opacity;
            ctx.strokeStyle = '#deae35';
            ctx.lineWidth = 1.2; // Reduced by 20%
            ctx.beginPath();
            ctx.arc(x, y, letter.planetSize, 0, Math.PI * 2);
            ctx.stroke();

            // Add planet-colored background
            ctx.fillStyle = letter.planetColor || '#deae35';
            ctx.beginPath();
            ctx.arc(x, y, letter.planetSize, 0, Math.PI * 2);
            ctx.fill();

            // Special effect for Earth (green-blue mix)
            if (letter.planetName === 'Earth') {
                // Add blue ocean patches
                ctx.beginPath();
                ctx.arc(x + letter.planetSize * 0.3, y - letter.planetSize * 0.1, letter.planetSize * 0.5, 0, Math.PI * 0.8);
                ctx.fillStyle = '#4f97dd';
                ctx.fill();

                // Add another ocean patch
                ctx.beginPath();
                ctx.arc(x - letter.planetSize * 0.4, y + letter.planetSize * 0.3, letter.planetSize * 0.4, 0, Math.PI * 1.2);
                ctx.fillStyle = '#4f97dd';
                ctx.fill();
            }

            // Special effect for Saturn (rings)
            if (letter.planetName === 'Saturn') {
                // Draw Saturn's rings
                ctx.beginPath();
                ctx.ellipse(x, y, letter.planetSize * 1.8, letter.planetSize * 0.5, Math.PI / 6, 0, Math.PI * 2);
                ctx.strokeStyle = '#e0ae6f';
                ctx.lineWidth = 2.4; // Reduced by 20%
                ctx.stroke();

                // Draw the planet on top of the rings
                ctx.beginPath();
                ctx.arc(x, y, letter.planetSize, 0, Math.PI * 2);
                ctx.fillStyle = '#d6b56b';
                ctx.fill();
            }

            // Add a subtle highlight for 3D effect
            ctx.beginPath();
            ctx.arc(x - letter.planetSize * 0.3, y - letter.planetSize * 0.3, letter.planetSize * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fill();

            // Draw letter inside the circle
            ctx.fillStyle = '#000000';
            ctx.font = `bold ${letter.size}px Amiri`;

            // Add a subtle shadow for better visibility
            ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
            ctx.shadowBlur = 3;

            // Draw the text twice for a stronger effect
            ctx.fillText(letter.char, x, y);
            ctx.fillText(letter.char, x, y);

            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
        });
    }

    // Animation loop
    function animate() {
        drawOrbitingLetters();
        animationFrameId = requestAnimationFrame(animate);
    }

    // Initialize animation
    canvas.style.opacity = '0';

    if (isLargeScreen()) {
        // Initialize canvas and animation for large screens
        resizeCanvas();
        initArabicLetters();

        // Start animation on hover
        heroContent.addEventListener('mouseenter', function() {
            if (!animationRunning) {
                // Make Quran text glow
                quranText.classList.add('glow');

                // Show canvas with orbiting letters
                canvas.style.opacity = '1';

                // Cancel any existing animation frame
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }

                // Start animation
                animate();
                animationRunning = true;

                // Start the stars fade-in immediately
                starOpacity = 0.01;
                starFadeStartTime = Date.now();

                // Add a short delay for the rings with fade-in effect
                setTimeout(function() {
                    ringOpacity = 0.01;
                    ringFadeStartTime = Date.now();
                }, 1000);
            }
        });

        // Fade out animation when mouse leaves
        heroContent.addEventListener('mouseleave', function() {
            if (animationRunning) {
                // Fade out animation
                canvas.style.opacity = '0';
                quranText.classList.remove('glow');

                // Reset animation state after fade out
                setTimeout(function() {
                    // Cancel animation frame
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }

                    animationRunning = false;

                    // Reset opacities
                    ringOpacity = 0;
                    starOpacity = 0;
                }, 500);
            }
        });
    } else {
        // On smaller screens, hide the canvas completely
        canvas.style.display = 'none';
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (isLargeScreen()) {
            // If screen is large enough, show and update the animation
            canvas.style.display = 'block';
            resizeCanvas();
            initArabicLetters();

            // If animation was running, restart it to adjust to new size
            if (animationRunning) {
                // Cancel existing animation frame
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }

                // Restart animation
                animate();
            }
        } else {
            // If screen is too small, hide the animation
            canvas.style.display = 'none';
            quranText.classList.remove('glow');

            // Cancel any running animation
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            animationRunning = false;
        }
    });
}


// Initialize counter animations
function initCounterAnimation() {
    const counters = [
        { id: 'families-counter', target: 5000 },
        { id: 'students-counter', target: 12000 },
        { id: 'graduates-counter', target: 3500 },
        { id: 'countries-counter', target: 45 }
    ];

    // Counter animation function
    function animateCounter(element, target) {
        let current = 0;
        const increment = Math.ceil(target / 100); // Adjust speed
        const duration = 2000; // 2 seconds
        const interval = Math.floor(duration / (target / increment));

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = current.toLocaleString();
            }
        }, interval);
    }

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = counters.find(c => c.id === entry.target.id);
                if (counter) {
                    animateCounter(entry.target, counter.target);
                    counterObserver.unobserve(entry.target); // Only animate once
                }
            }
        });
    }, { threshold: 0.5 });

    // Set up observers for counters
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (element) {
            counterObserver.observe(element);
        }
    });
}

// Initialize testimonial slider
function initTestimonialSlider() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const dotButtons = document.querySelectorAll('.flex.justify-center.mt-8.space-x-2 button');
    let currentSlide = 0;
    let autoSlideInterval = null;

    // Skip if no testimonials found
    if (testimonialSlides.length === 0) return;

    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.add('hidden');
        });

        // Show the current slide
        testimonialSlides[index].classList.remove('hidden');

        // Update dots
        dotButtons.forEach((dot, i) => {
            if (i === index) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-primary-gold');
            } else {
                dot.classList.remove('bg-primary-gold');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    // Initialize first slide
    showSlide(currentSlide);

    // Next slide
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
            resetAutoSlide();
        });
    }

    // Previous slide
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
            resetAutoSlide();
        });
    }

    // Dot navigation
    dotButtons.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetAutoSlide();
        });
    });

    // Auto-advance slides every 5 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Reset auto slide timer when user interacts with slider
    function resetAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        startAutoSlide();
    }

    // Start auto slide
    startAutoSlide();
}

// Initialize form handling
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real implementation, you would send the form data to a server
            // For now, we'll just show an alert
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}