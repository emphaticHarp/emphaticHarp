// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(
    'https://xsqdxhopiuyukbqeyfzj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzcWR4aG9waXV5dWticWV5ZnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNjU3NzYsImV4cCI6MjA1Njg0MTc3Nn0.9R6l5jUMy41Z8OT7gKOmExpx37_j50lbbOJcWUaahOU'
);

// Check authentication status
window.addEventListener('load', async () => {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    
    if (error || !session) {
        window.location.href = '../index.html';
        return;
    }

    // Update profile information
    const user = session.user;
    const profileName = document.getElementById('profileName');
    const welcomeName = document.getElementById('welcomeName');
    const profileImage = document.getElementById('profileImage');

    if (user.user_metadata?.full_name) {
        profileName.textContent = user.user_metadata.full_name;
        welcomeName.textContent = user.user_metadata.full_name.split(' ')[0];
    }
    
    profileImage.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.full_name || 'User')}&background=C41E3A&color=fff`;
    
    // Initialize navbar functionality
    initNavbar();
});

// Initialize navbar functionality
function initNavbar() {
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    function performSearch(query) {
        if (query.trim() !== '') {
            // In a real application, this would redirect to search results
            alert(`Searching for: ${query}`);
            // Clear the search input
            searchInput.value = '';
        }
    }
    
    // Language selector functionality
    const languageSelector = document.querySelector('.language-selector');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLang = document.querySelector('.current-lang');
    
    if (langOptions.length > 0) {
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all options
                langOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                option.classList.add('active');
                
                // Update current language display
                const langCode = option.textContent.trim().substring(0, 2).toUpperCase();
                currentLang.innerHTML = `<i class="fas fa-globe"></i> <span>${langCode}</span>`;
                
                // In a real application, this would change the language
                // For demo purposes, just show an alert
                alert(`Language changed to: ${option.textContent.trim()}`);
            });
        });
    }
    
    // Notification functionality
    const notificationBell = document.querySelector('.notification-bell');
    const notificationItems = document.querySelectorAll('.notification-item');
    const markAllAsRead = document.querySelector('.notification-header a');
    const notificationBadge = document.querySelector('.notification-badge');
    
    if (markAllAsRead) {
        markAllAsRead.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Mark all notifications as read
            notificationItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            // Update badge
            notificationBadge.style.display = 'none';
        });
    }
    
    if (notificationItems.length > 0) {
        notificationItems.forEach(item => {
            item.addEventListener('click', () => {
                // Mark notification as read
                item.classList.remove('unread');
                
                // Update badge count
                const unreadCount = document.querySelectorAll('.notification-item.unread').length;
                if (unreadCount > 0) {
                    notificationBadge.textContent = unreadCount;
                } else {
                    notificationBadge.style.display = 'none';
                }
            });
        });
    }
    
    // Mobile navigation
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    
    if (window.innerWidth <= 768 && navDropdowns.length > 0) {
        navDropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.nav-link');
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Toggle dropdown content
                const dropdownContent = dropdown.querySelector('.nav-dropdown-content');
                
                if (dropdownContent.style.maxHeight === '300px') {
                    dropdownContent.style.maxHeight = '0';
                } else {
                    dropdownContent.style.maxHeight = '300px';
                }
            });
        });
    }
    
    // Sticky navbar effect
    const navbar = document.querySelector('.navbar');
    const navbarTop = document.querySelector('.navbar-top');
    const navbarBottom = document.querySelector('.navbar-bottom');
    
    if (navbar && navbarTop && navbarBottom) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
                navbarTop.style.display = 'none';
                navbarBottom.classList.add('navbar-bottom-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
                navbarTop.style.display = 'block';
                navbarBottom.classList.remove('navbar-bottom-scrolled');
            }
        });
    }
}

// Toggle dropdown menu
const profileMenu = document.getElementById('profileMenu');
const dropdownMenu = document.getElementById('dropdownMenu');

if (profileMenu && dropdownMenu) {
    profileMenu.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (profileMenu && !profileMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
}

// Handle logout
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        await supabaseClient.auth.signOut();
        window.location.href = '../index.html';
    });
}

// Banner Slider functionality
const sliderTrack = document.querySelector('.banner-slider .slider-track');
const slides = document.querySelectorAll('.banner-slider .slide');
const prevBtn = document.querySelector('.banner-slider .prev');
const nextBtn = document.querySelector('.banner-slider .next');
const dotsContainer = document.querySelector('.banner-slider .slider-dots');
const dots = document.querySelectorAll('.banner-slider .dot');

let currentSlide = 0;
const slideCount = slides.length;

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
    });
    updateDots();
    updateSlides();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    goToSlide(currentSlide);
}

// Initialize slider positions
slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
});

// Add event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Auto slide
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto slide on hover
sliderTrack.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

sliderTrack.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Car Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Get carousel elements
    const carCarousel = document.getElementById('carCarousel');
    const carCards = document.querySelectorAll('.car-card');
    
    // Clone cards for infinite loop effect
    function setupInfiniteCarousel() {
        // Clone the cards to create the infinite loop effect
        const originalCards = Array.from(carCards);
        
        // Clone cards and append to carousel
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            carCarousel.appendChild(clone);
        });
        
        // Calculate the total width and set animation duration
        const totalWidth = carCarousel.scrollWidth / 2; // Half because we duplicated the content
        const duration = totalWidth / 40; // Speed adjustment
        
        // Apply the animation using style property
        carCarousel.style.animationDuration = `${duration}s`;
        carCarousel.style.transform = 'translateX(0)';
        
        // Create and apply the animation
        const keyframes = `
            @keyframes carouselSlide {
                from { transform: translateX(0); }
                to { transform: translateX(-${totalWidth}px); }
            }
        `;
        
        // Add keyframes using a style tag instead of insertRule
        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        
        // Apply the animation to the carousel
        carCarousel.style.animation = `carouselSlide ${duration}s linear infinite`;
    }
    
    // Initialize infinite carousel
    setupInfiniteCarousel();
    
    // Optional: Pause animation on hover
    carCarousel.addEventListener('mouseenter', () => {
        carCarousel.style.animationPlayState = 'paused';
    });
    
    carCarousel.addEventListener('mouseleave', () => {
        carCarousel.style.animationPlayState = 'running';
    });
    
    // Customization Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the tab to show
            const tabToShow = button.getAttribute('data-tab');
            
            // Show the corresponding tab pane
            document.getElementById(tabToShow).classList.add('active');
        });
    });
    
    // Book Now Buttons Functionality
    const bookButtons = document.querySelectorAll('.book-btn, .tier-btn, .tuning-btn');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', () => {
            // In a real application, this would open a booking modal or redirect to a booking page
            alert('Booking functionality would be implemented here!');
        });
    });
    
    // Discount and Offer Buttons
    const offerButtons = document.querySelectorAll('.discount-btn');
    
    offerButtons.forEach(button => {
        button.addEventListener('click', () => {
            // In a real application, this would apply the discount or redirect to details
            alert('Discount application functionality would be implemented here!');
        });
    });
    
    // Service Links
    const serviceLinks = document.querySelectorAll('.service-link');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real application, this would redirect to service details
            alert('Service details would be shown here!');
        });
    });
    
    // View All Tour Packages Button
    const viewAllToursBtn = document.querySelector('.view-all-btn');
    
    if (viewAllToursBtn) {
        viewAllToursBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real application, this would redirect to all tours page
            alert('All tour packages would be shown here!');
        });
    }
}); 