// Modern Clean Admin Login JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase client
    const SUPABASE_URL = 'https://xsqdxhopiuyukbqeyfzj.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzcWR4aG9waXV5dWticWV5ZnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNjU3NzYsImV4cCI6MjA1Njg0MTc3Nn0.9R6l5jUMy41Z8OT7gKOmExpx37_j50lbbOJcWUaahOU';
    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // Add a function to clear localStorage for testing purposes
    window.clearAdminUsers = function() {
        localStorage.removeItem('registeredAdmins');
        localStorage.removeItem('adminUser');
        console.log('Cleared admin users from localStorage');
        showToast('Cleared admin users from localStorage', 'info');
    };

    // Create admin_users table if it doesn't exist
    async function createAdminUsersTable() {
        try {
            // Try to create the table using SQL
            const { error } = await supabaseClient.rpc('create_admin_users_table');
            
            if (error) {
                console.warn('Error creating admin_users table:', error);
                
                // If the RPC function doesn't exist, we'll use localStorage as fallback
                console.log('Using localStorage for admin users as fallback');
            } else {
                console.log('admin_users table created or already exists');
            }
        } catch (error) {
            console.warn('Error creating admin_users table:', error);
        }
    }

    // Call this function when the page loads
    createAdminUsersTable();

    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    function switchTab(targetId) {
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to target tab and content
        const targetTab = document.querySelector(`.tab[data-target="${targetId}"]`);
        const targetContent = document.getElementById(targetId);
        
        if (targetTab && targetContent) {
            targetTab.classList.add('active');
            targetContent.classList.add('active');
        }
    }
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.target;
            switchTab(targetId);
        });
    });
    
    // Switch between login and register forms using buttons
    const switchToRegisterBtn = document.getElementById('switchToRegister');
    const switchToLoginBtn = document.getElementById('switchToLogin');
    
    if (switchToRegisterBtn) {
        switchToRegisterBtn.addEventListener('click', () => {
            switchTab('register-content');
        });
    }
    
    if (switchToLoginBtn) {
        switchToLoginBtn.addEventListener('click', () => {
            switchTab('login-content');
        });
    }
    
    // Car Slider functionality
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.car-slide');
    let currentSlide = 0;
    let slideInterval;
    
    // Function to change slide
    function changeSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Click event for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            changeSlide(index);
            resetSlideInterval();
        });
    });
    
    // Auto slide functionality
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            let nextSlide = (currentSlide + 1) % slides.length;
            changeSlide(nextSlide);
        }, 5000); // Change slide every 5 seconds
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Start auto slide
    if (slides.length > 0) {
        startSlideInterval();
    }
    
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordField = this.previousElementSibling;
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            
            // Toggle icon
            this.innerHTML = type === 'password' ? 
                '<i class="fas fa-eye"></i>' : 
                '<i class="fas fa-eye-slash"></i>';
        });
    });
    
    // Password strength meter
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        if (input.id.includes('password')) {
            input.addEventListener('input', function() {
                const password = this.value;
                const strengthBar = this.parentElement.nextElementSibling?.querySelector('.strength-bar');
                const strengthText = this.parentElement.nextElementSibling?.querySelector('.strength-text');
                
                if (!strengthBar || !strengthText) return;
                
                if (password.length === 0) {
                    strengthBar.style.width = '0';
                    strengthBar.style.backgroundColor = '#e2e8f0';
                    strengthText.textContent = '';
                    return;
                }
                
                // Calculate password strength
                let strength = 0;
                
                // Length check
                if (password.length > 6) strength += 1;
                if (password.length > 10) strength += 1;
                
                // Character type checks
                if (/[A-Z]/.test(password)) strength += 1;
                if (/[0-9]/.test(password)) strength += 1;
                if (/[^A-Za-z0-9]/.test(password)) strength += 1;
                
                // Update UI based on strength
                let percentage = (strength / 5) * 100;
                strengthBar.style.width = `${percentage}%`;
                
                if (strength < 2) {
                    strengthBar.style.backgroundColor = '#EF4444';
                    strengthText.textContent = 'Weak';
                } else if (strength < 4) {
                    strengthBar.style.backgroundColor = '#F59E0B';
                    strengthText.textContent = 'Medium';
                } else {
                    strengthBar.style.backgroundColor = '#10B981';
                    strengthText.textContent = 'Strong';
                }
            });
        }
    });
    
    // Form validation
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            if (!email || !password) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            // Login with database
            await loginWithDatabase(email, password);
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[id="register-name"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[id="register-password"]').value;
            const confirmPassword = this.querySelector('input[id="confirm-password"]').value;
            const adminCode = this.querySelector('input[id="admin-code"]').value;
            const termsChecked = this.querySelector('input[type="checkbox"]').checked;
            
            if (!name || !email || !password || !confirmPassword || !adminCode) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }
            
            if (!termsChecked) {
                showToast('Please accept the terms and conditions', 'warning');
                return;
            }
            
            // Validate admin code and register with database
            if (adminCode === 'ELITE2023') {
                await registerWithDatabase(name, email, password);
            } else {
                showToast('Invalid admin code', 'error');
            }
        });
    }
    
    // Simple password hashing function (for demo purposes only)
    // In a real application, use a proper hashing library
    function hashPassword(password) {
        // This is NOT secure, just for demo
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString(16);
    }
    
    // Database authentication functions
    async function loginWithDatabase(email, password) {
        showToast('Signing in...', 'info');
        
        try {
            console.log('Attempting to sign in:', email);
            
            // First try to find user in localStorage (for testing)
            const registeredUsers = JSON.parse(localStorage.getItem('registeredAdmins') || '[]');
            const localUser = registeredUsers.find(user => user.email === email);
            
            if (localUser) {
                console.log('Found user in local storage:', localUser);
                
                // For testing purposes, allow login with the admin code as password
                if (password === 'ELITE2023' || hashPassword(password) === localUser.password) {
                    showToast('Login successful (local mode)! Redirecting to dashboard...', 'success');
                    
                    // Store user session
                    localStorage.setItem('adminUser', JSON.stringify(localUser));
                    
                    // Redirect to dashboard after a delay
                    setTimeout(() => {
                        // Check if dashboard.html exists, if not redirect to index.html or another page
                        const dashboardPath = 'dashboard.html';
                        fetch(dashboardPath)
                            .then(response => {
                                if (response.ok) {
                                    window.location.href = dashboardPath;
                                } else {
                                    console.log('Dashboard page not found, redirecting to index.html');
                                    window.location.href = '../index.html';
                                }
                            })
                            .catch(error => {
                                console.error('Error checking dashboard page:', error);
                                window.location.href = '../index.html';
                            });
                    }, 1500);
                    return;
                }
            }
            
            // If not found in localStorage, try database
            try {
                // Hash the password (simple hash for demo)
                const hashedPassword = hashPassword(password);
                
                // Check if user exists in admin_users table
                const { data, error } = await supabaseClient
                    .from('admin_users')
                    .select('*')
                    .eq('email', email)
                    .single();
                
                console.log('Database login response:', data, error);
                
                if (error) {
                    if (error.code === '42P01') {
                        // Table doesn't exist, throw error to be caught by outer try/catch
                        throw new Error('Database not set up. Please contact administrator.');
                    } else {
                        throw error;
                    }
                }
                
                if (!data) {
                    throw new Error('Invalid email or password');
                }
                
                // Verify password
                if (data.password !== hashedPassword) {
                    // For demo purposes, also allow login with admin code
                    if (password === 'ELITE2023') {
                        console.log('Login with admin code override');
                    } else {
                        throw new Error('Invalid password');
                    }
                }
                
                showToast('Login successful! Redirecting to dashboard...', 'success');
                
                // Store user session
                localStorage.setItem('adminUser', JSON.stringify({
                    id: data.id,
                    email: data.email,
                    name: data.name,
                    role: 'admin'
                }));
                
                // Redirect to dashboard after a delay
                setTimeout(() => {
                    // Check if dashboard.html exists, if not redirect to index.html or another page
                    const dashboardPath = 'dashboard.html';
                    fetch(dashboardPath)
                        .then(response => {
                            if (response.ok) {
                                window.location.href = dashboardPath;
                            } else {
                                console.log('Dashboard page not found, redirecting to index.html');
                                window.location.href = '../index.html';
                            }
                        })
                        .catch(error => {
                            console.error('Error checking dashboard page:', error);
                            window.location.href = '../index.html';
                        });
                }, 1500);
                
            } catch (dbError) {
                console.error('Database error:', dbError);
                
                // If we have a local user but password didn't match earlier
                if (localUser) {
                    throw new Error('Invalid password');
                } else {
                    throw dbError;
                }
            }
            
        } catch (error) {
            console.error('Error signing in:', error);
            showToast(error.message || 'Invalid email or password', 'error');
        }
    }
    
    async function registerWithDatabase(name, email, password) {
        showToast('Creating your account...', 'info');
        
        try {
            console.log('Attempting to register user:', { name, email });
            
            // Hash the password (simple hash for demo)
            const hashedPassword = hashPassword(password);
            
            // First check if user already exists in localStorage
            const registeredUsers = JSON.parse(localStorage.getItem('registeredAdmins') || '[]');
            const existingLocalUser = registeredUsers.find(user => user.email === email);
            
            // If user exists in localStorage, ask if they want to overwrite
            if (existingLocalUser) {
                // For simplicity, we'll just overwrite the existing user in localStorage
                console.log('User exists in localStorage, overwriting:', email);
                
                // Remove the existing user
                const updatedUsers = registeredUsers.filter(user => user.email !== email);
                localStorage.setItem('registeredAdmins', JSON.stringify(updatedUsers));
            }
            
            try {
                // Try to insert into database
                // Check if user already exists
                const { data: existingUser, error: checkError } = await supabaseClient
                    .from('admin_users')
                    .select('*')
                    .eq('email', email)
                    .single();
                    
                if (existingUser) {
                    throw new Error('User with this email already exists in database');
                }
                
                // Insert user into admin_users table
                const { data, error } = await supabaseClient
                    .from('admin_users')
                    .insert([
                        {
                            name: name,
                            email: email,
                            password: hashedPassword,
                            role: 'admin',
                            created_at: new Date().toISOString()
                        }
                    ])
                    .select();
                    
                console.log('Database registration response:', data, error);
                
                if (error) {
                    throw error;
                }
                
                if (!data || data.length === 0) {
                    throw new Error('Registration failed - no data returned');
                }
                
                console.log('User registered successfully in database:', data[0]);
                
                // Also store in localStorage as backup
                storeUserInLocalStorage(name, email, hashedPassword);
                
                showToast('Registration successful! Please log in.', 'success');
                
                // Switch to login tab after successful registration
                setTimeout(() => {
                    switchTab('login-content');
                }, 1500);
                
            } catch (dbError) {
                console.error('Database error:', dbError);
                
                // If there's a database error, store in localStorage
                storeUserInLocalStorage(name, email, hashedPassword);
                showToast('Registration successful (local mode)! Please log in.', 'success');
                
                // Switch to login tab after successful registration
                setTimeout(() => {
                    switchTab('login-content');
                }, 1500);
            }
            
        } catch (error) {
            console.error('Error registering:', error);
            showToast(error.message || 'Registration failed. Please try again.', 'error');
        }
    }
    
    function storeUserInLocalStorage(name, email, hashedPassword) {
        // Store the registration in localStorage as a backup
        const registeredUsers = JSON.parse(localStorage.getItem('registeredAdmins') || '[]');
        registeredUsers.push({
            id: Date.now().toString(),
            email: email,
            name: name,
            password: hashedPassword,
            role: 'admin',
            registeredAt: new Date().toISOString()
        });
        localStorage.setItem('registeredAdmins', JSON.stringify(registeredUsers));
        console.log('User stored in localStorage:', email);
    }
    
    // Toast notification system
    window.showToast = function(message, type = 'info') {
        const toastContainer = document.querySelector('.toast-container');
        
        if (!toastContainer) {
            const container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = '';
        switch (type) {
            case 'success':
                icon = '<i class="fas fa-check-circle toast-icon"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-times-circle toast-icon"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle toast-icon"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle toast-icon"></i>';
        }
        
        toast.innerHTML = `
            ${icon}
            <div class="toast-message">${message}</div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        
        document.querySelector('.toast-container').appendChild(toast);
        
        // Show toast with animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Auto-remove toast after 5 seconds
        const timeout = setTimeout(() => {
            removeToast(toast);
        }, 5000);
        
        // Close button functionality
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(timeout);
            removeToast(toast);
        });
    };
    
    function removeToast(toast) {
        toast.classList.remove('show');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            toast.remove();
        }, 300);
    }
}); 