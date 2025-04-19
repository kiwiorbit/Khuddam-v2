// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar scroll behavior
    initNavbar();

    // Initialize pagination
    initPagination();

    // Initialize modal functionality
    initModal();
});

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    // Navbar scroll behavior
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-primary-black');
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('bg-primary-black');
            navbar.classList.remove('shadow-lg');
        }
    });

    // Mobile menu toggle
    if (menuToggle && closeMenu && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.style.display = 'block';
            // Add a small delay before adding opacity for smooth transition
            setTimeout(() => {
                mobileMenu.style.opacity = '1';
            }, 10);
            document.body.style.overflow = 'hidden';
        });

        closeMenu.addEventListener('click', function() {
            mobileMenu.style.opacity = '0';
            // Wait for transition to complete before hiding the menu
            setTimeout(() => {
                mobileMenu.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        });
    }
}

function initPagination() {
    const updateCards = document.querySelectorAll('.update-card');
    const paginationButtons = document.querySelectorAll('.pagination-button');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const postsPerPage = window.innerWidth < 768 ? 6 : 9; // Show 6 on mobile, 9 on larger screens
    let currentPage = 1;
    const totalPages = Math.ceil(updateCards.length / postsPerPage);

    // Initial page setup
    updatePagination();

    // Add event listeners to pagination buttons
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.classList.contains('prev-button') && !this.classList.contains('next-button')) {
                currentPage = parseInt(this.textContent);
                updatePagination();
            }
        });
    });

    // Previous button functionality
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
            }
        });
    }

    // Next button functionality
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
            }
        });
    }

    // Handle window resize to adjust posts per page
    window.addEventListener('resize', function() {
        const newPostsPerPage = window.innerWidth < 768 ? 6 : 9;
        if (newPostsPerPage !== postsPerPage) {
            // Reset to page 1 if the layout changes
            currentPage = 1;
            updatePagination();
        }
    });

    function updatePagination() {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        // Update visibility of update cards
        updateCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block';

            } else {
                card.style.display = 'none';
            }
        });

        // Update active state of pagination buttons
        paginationButtons.forEach(button => {
            if (!button.classList.contains('prev-button') && !button.classList.contains('next-button')) {
                const pageNum = parseInt(button.textContent);
                if (pageNum === currentPage) {
                    button.classList.add('bg-primary-gold', 'text-white');
                    button.classList.remove('bg-gray-200', 'hover:bg-primary-gold', 'hover:text-white');
                } else {
                    button.classList.remove('bg-primary-gold', 'text-white');
                    button.classList.add('bg-gray-200', 'hover:bg-primary-gold', 'hover:text-white');
                }
            }
        });

        // Scroll to top of updates section
        const updatesSection = document.querySelector('.updates-section');
        if (updatesSection) {
            window.scrollTo({
                top: updatesSection.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }
}

function initModal() {
    const modal = document.getElementById('update-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDate = document.getElementById('modal-date');
    const modalImage = document.getElementById('modal-image');
    const modalContent = document.getElementById('modal-content');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalContainer = document.querySelector('.modal-container');
    const openButtons = document.querySelectorAll('.open-modal-btn');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Function to open modal with specific update data
    function openModal(updateCard) {
        // Get data from the update card
        const title = updateCard.dataset.title;
        const date = updateCard.dataset.date;
        const image = updateCard.dataset.image;
        const content = updateCard.dataset.content;

        // Populate modal with data
        modalTitle.textContent = title;
        modalDate.textContent = date;
        modalImage.src = image;
        modalImage.alt = title;
        modalContent.innerHTML = content;

        // Show modal with animation
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling

        // Add animation classes
        setTimeout(() => {
            modalBackdrop.classList.add('opacity-100');
            modalContainer.classList.add('scale-100', 'opacity-100');
            modalContainer.classList.remove('scale-95', 'opacity-0');
        }, 10);

        // Set focus to the modal for accessibility
        modalContainer.focus();
    }

    // Function to close modal
    function closeModal() {
        // Add animation classes for closing
        modalBackdrop.classList.remove('opacity-100');
        modalContainer.classList.remove('scale-100', 'opacity-100');
        modalContainer.classList.add('scale-95', 'opacity-0');

        // Hide modal after animation completes
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }, 300);
    }

    // Add click event listeners to open buttons
    openButtons.forEach(button => {
        button.addEventListener('click', function() {
            const updateCard = this.closest('.update-card');
            openModal(updateCard);
        });
    });

    // Add click event listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close modal when clicking outside the modal content
    modalBackdrop.addEventListener('click', function(e) {
        if (e.target === modalBackdrop) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}
