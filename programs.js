// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true
    });

    // Ensure external links work correctly
    // Make sure logo links work
    // const logoLink = document.getElementById('logo-link');
    // if (logoLink) {
    //     logoLink.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         window.location.href = 'index.html';
    //     });
    // }

    // const footerLogoLink = document.getElementById('footer-logo-link');
    // if (footerLogoLink) {
    //     footerLogoLink.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         window.location.href = 'index.html';
    //     });
    // }

    // // Make sure contact links work
    // const desktopContactLink = document.getElementById('desktop-contact-link');
    // if (desktopContactLink) {
    //     desktopContactLink.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         window.location.href = 'index.html#contact';
    //     });
    // }

    // const mobileContactLink = document.getElementById('mobile-contact-link');
    // if (mobileContactLink) {
    //     mobileContactLink.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         window.location.href = 'index.html#contact';
    //     });
    // }

    // // Handle footer contact link
    // const footerContactLink = document.getElementById('footer-contact-link');
    // if (footerContactLink) {
    //     footerContactLink.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         window.location.href = 'index.html#contact';
    //     });
    // }

    // // Handle CTA contact link
    // const ctaContactLink = document.getElementById('cta-contact-link');
    // if (ctaContactLink) {
    //     ctaContactLink.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         window.location.href = 'index.html#contact';
    //     });
    // }

    // Also handle any other contact links
    const otherContactLinks = document.querySelectorAll('a[href="index.html#contact"]:not(#desktop-contact-link):not(#mobile-contact-link):not(#footer-contact-link):not(#cta-contact-link)');
    otherContactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html#contact';
        });
    });

    // Navbar functionality
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

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

    // Mobile menu toggle
    if (menuToggle && mobileMenu) {
        // Ensure the menu toggle is always visible and accessible
        menuToggle.style.zIndex = '9000';

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
    }

    // Add event listener to document to handle clicks outside the menu
    document.addEventListener('click', function(e) {
        // Check if the mobile menu is open and the click is outside the menu and the toggle button
        if (mobileMenu && mobileMenu.style.display === 'block' &&
            !mobileMenu.contains(e.target) &&
            e.target !== menuToggle &&
            !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu when clicking the X button
    const closeMenu = document.getElementById('close-menu');
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            closeMobileMenu();
        });
    }

    // Handle mobile menu closing when clicking on navigation links
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a[href^="#"]');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Gallery Filter Functionality
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            galleryFilterBtns.forEach(b => {
                b.classList.remove('active', 'bg-primary-gold', 'text-white');
                b.classList.add('bg-gray-100');
            });

            // Add active class to clicked button
            btn.classList.add('active', 'bg-primary-gold', 'text-white');
            btn.classList.remove('bg-gray-100');

            const filter = btn.getAttribute('data-filter');

            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    // Add a small delay for a staggered animation effect
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Testimonial Carousel
    const testimonials = document.querySelectorAll('.conference-testimonials > div');
    const testimonialDots = document.querySelectorAll('.flex.justify-center.mt-6.space-x-2 button');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(t => t.classList.add('hidden'));

        // Show the selected testimonial
        testimonials[index].classList.remove('hidden');

        // Update dots
        testimonialDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-primary-gold');
            } else {
                dot.classList.remove('bg-primary-gold');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    // Add click event to dots
    testimonialDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentTestimonial = i;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Arabic Grammar Testimonial Slider
    const arabicSlides = document.querySelectorAll('.testimonial-slide');
    const arabicDots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        arabicSlides.forEach(slide => slide.classList.add('hidden'));
        arabicSlides.forEach(slide => slide.classList.remove('active'));

        // Show the selected slide
        arabicSlides[index].classList.remove('hidden');
        arabicSlides[index].classList.add('active');

        // Update dots
        arabicDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-primary-gold', 'active');
            } else {
                dot.classList.remove('bg-primary-gold', 'active');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    // Add click events to dots
    arabicDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
        });
    });

    // Add click events to navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + arabicSlides.length) % arabicSlides.length;
            showSlide(currentSlide);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % arabicSlides.length;
            showSlide(currentSlide);
        });
    }

    // Auto-rotate Arabic testimonials
    setInterval(() => {
        currentSlide = (currentSlide + 1) % arabicSlides.length;
        showSlide(currentSlide);
    }, 6000);
});
