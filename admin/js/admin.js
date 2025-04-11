// Supabase Configuration
const SUPABASE_URL = 'https://xsqdxhopiuyukbqeyfzj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzcWR4aG9waXV5dWticWV5ZnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNjU3NzYsImV4cCI6MjA1Njg0MTc3Nn0.9R6l5jUMy41Z8OT7gKOmExpx37_j50lbbOJcWUaahOU';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Admin Registration Code (This would be securely stored and distributed in a real application)
const ADMIN_REGISTRATION_CODE = 'ELITE2023';

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the login page or dashboard
    const isLoginPage = document.querySelector('.form-container');
    const isDashboardPage = document.querySelector('.admin-dashboard');
    
    if (isLoginPage) {
        initializeLoginPage();
        initializeCarCarousel();
    } else if (isDashboardPage) {
        initializeDashboardPage();
    }
    
    // Initialize toast functionality
    initializeToasts();
});

// Login Page Initialization
function initializeLoginPage() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const passwordInput = document.getElementById('register-password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Check if user is already logged in
    checkAuthState(false);
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show corresponding tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabName}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Toggle password visibility
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            const icon = btn.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Password strength meter
    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const strength = calculatePasswordStrength(password);
            
            // Update strength bar
            strengthBar.style.width = `${strength.score * 25}%`;
            
            // Update color based on strength
            if (strength.score === 0) {
                strengthBar.style.backgroundColor = '#EF4444';
                strengthText.textContent = 'Very Weak';
            } else if (strength.score === 1) {
                strengthBar.style.backgroundColor = '#F59E0B';
                strengthText.textContent = 'Weak';
            } else if (strength.score === 2) {
                strengthBar.style.backgroundColor = '#10B981';
                strengthText.textContent = 'Medium';
            } else if (strength.score === 3) {
                strengthBar.style.backgroundColor = '#10B981';
                strengthText.textContent = 'Strong';
            } else {
                strengthBar.style.backgroundColor = '#10B981';
                strengthText.textContent = 'Very Strong';
            }
        });
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            try {
                showToast('Logging in...', 'info');
                
                // Sign in with Supabase
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                
                if (error) throw error;
                
                // Check if user is an admin
                const { data: adminData, error: adminError } = await supabase
                    .from('admins')
                    .select('*')
                    .eq('user_id', data.user.id)
                    .single();
                
                if (adminError || !adminData) {
                    await supabase.auth.signOut();
                    throw new Error('You do not have admin privileges');
                }
                
                // Store admin data in local storage
                localStorage.setItem('adminUser', JSON.stringify({
                    id: data.user.id,
                    email: data.user.email,
                    name: adminData.name
                }));
                
                showToast('Login successful! Redirecting...', 'success');
                
                // Redirect to admin dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
                
            } catch (error) {
                console.error('Login error:', error);
                showToast(error.message || 'Login failed. Please check your credentials.', 'error');
            }
        });
    }
    
    // Registration form submission
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const adminCode = document.getElementById('admin-code').value;
            const termsAccepted = document.getElementById('terms-checkbox').checked;
            
            try {
                // Validate inputs
                if (password !== confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                
                if (!termsAccepted) {
                    throw new Error('You must accept the terms and conditions');
                }
                
                if (adminCode !== ADMIN_REGISTRATION_CODE) {
                    throw new Error('Invalid admin registration code');
                }
                
                showToast('Creating your admin account...', 'info');
                
                // Register with Supabase
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            name
                        }
                    }
                });
                
                if (error) throw error;
                
                // Create admin record in the admins table
                const { error: adminError } = await supabase
                    .from('admins')
                    .insert([
                        {
                            user_id: data.user.id,
                            name,
                            email,
                            role: 'admin'
                        }
                    ]);
                
                if (adminError) throw adminError;
                
                showToast('Registration successful! Please check your email to confirm your account.', 'success');
                
                // Switch to login tab
                document.querySelector('.tab-btn[data-tab="login"]').click();
                
            } catch (error) {
                console.error('Registration error:', error);
                showToast(error.message || 'Registration failed. Please try again.', 'error');
            }
        });
    }
}

// Initialize Car Carousel
function initializeCarCarousel() {
    const carImages = document.querySelectorAll('.car-image');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let interval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and indicators
        carImages.forEach(image => image.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        carImages[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // Update current index
        currentIndex = index;
    }
    
    // Function to show next slide
    function nextSlide() {
        let nextIndex = (currentIndex + 1) % carImages.length;
        showSlide(nextIndex);
    }
    
    // Add click event to indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-index'));
            showSlide(index);
            
            // Reset interval
            clearInterval(interval);
            interval = setInterval(nextSlide, 5000);
        });
    });
    
    // Start automatic slideshow
    interval = setInterval(nextSlide, 5000);
    
    // Pause slideshow on hover
    const carousel = document.querySelector('.car-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            interval = setInterval(nextSlide, 5000);
        });
    }
}

// Dashboard Page Initialization
function initializeDashboardPage() {
    const logoutBtn = document.getElementById('logoutBtn');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const navItems = document.querySelectorAll('.nav-item a');
    const adminName = document.getElementById('adminName');
    const adminEmail = document.getElementById('adminEmail');
    const welcomeAdminName = document.getElementById('welcomeAdminName');
    
    // Check if user is authenticated
    checkAuthState(true);
    
    // Load admin data
    loadAdminData();
    
    // Sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            document.querySelector('.admin-sidebar').classList.toggle('expanded');
        });
    }
    
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            const sectionName = item.getAttribute('data-section');
            
            // Update active nav item
            navItems.forEach(navItem => {
                navItem.parentElement.classList.remove('active');
            });
            item.parentElement.classList.add('active');
            
            // Show corresponding section
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(`${sectionName}-section`).classList.add('active');
        });
    });
    
    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await supabase.auth.signOut();
                localStorage.removeItem('adminUser');
                window.location.href = 'login.html';
            } catch (error) {
                console.error('Logout error:', error);
                showToast('Failed to log out. Please try again.', 'error');
            }
        });
    }
}

// Check Authentication State
async function checkAuthState(requireAuth) {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        const adminData = localStorage.getItem('adminUser');
        
        // If on login page and user is authenticated, redirect to dashboard
        if (!requireAuth && session && adminData) {
            window.location.href = 'dashboard.html';
            return;
        }
        
        // If on dashboard page and user is not authenticated, redirect to login
        if (requireAuth && (!session || !adminData)) {
            localStorage.removeItem('adminUser'); // Clear any stale data
            window.location.href = 'login.html';
            return;
        }
    } catch (error) {
        console.error('Auth check error:', error);
        if (requireAuth) {
            // If there's an error checking auth on a protected page, redirect to login
            localStorage.removeItem('adminUser');
            window.location.href = 'login.html';
        }
    }
}

// Load Admin Data
function loadAdminData() {
    try {
        const adminData = JSON.parse(localStorage.getItem('adminUser'));
        
        if (adminData) {
            // Update admin name and email in the sidebar
            const adminNameEl = document.getElementById('adminName');
            const adminEmailEl = document.getElementById('adminEmail');
            const welcomeAdminNameEl = document.getElementById('welcomeAdminName');
            
            if (adminNameEl) adminNameEl.textContent = adminData.name;
            if (adminEmailEl) adminEmailEl.textContent = adminData.email;
            if (welcomeAdminNameEl) welcomeAdminNameEl.textContent = adminData.name;
        } else {
            // If no admin data is found, redirect to login
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Error loading admin data:', error);
        window.location.href = 'login.html';
    }
}

// Password Strength Calculator
function calculatePasswordStrength(password) {
    let score = 0;
    
    // Length check
    if (password.length > 6) score++;
    if (password.length > 10) score++;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    return {
        score: Math.min(4, score)
    };
}

// Toast Notifications
function initializeToasts() {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Set icon based on type
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';
    
    // Create toast content
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${icon}"></i></div>
        <div class="toast-message">${message}</div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Add close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
    
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 5000);
} 