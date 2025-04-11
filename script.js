// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(
  'https://xsqdxhopiuyukbqeyfzj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzcWR4aG9waXV5dWticWV5ZnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNjU3NzYsImV4cCI6MjA1Njg0MTc3Nn0.9R6l5jUMy41Z8OT7gKOmExpx37_j50lbbOJcWUaahOU'
);

/* 
  IMPORTANT: Before using this code:
  1. Create a Supabase project at https://supabase.com/
  2. Create OAuth credentials in Google Cloud Console
  3. Enable Google provider in Authentication → Providers with:
     - Client ID: Configure in environment variables
     - Client Secret: Configure in environment variables
  4. Enable Facebook provider in Authentication → Providers with:
     - App ID: Configure in environment variables
     - App Secret: Configure in environment variables
  5. Add site URL and redirect URLs in Authentication → URL Configuration
*/

// DOM Elements
const loginForm = document.getElementById('loginForm');
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.getElementById('password');
const loaderContainer = document.querySelector('.loader-container');
const errorModal = document.querySelector('.error-modal');

// Create a success modal for showing registration success message
const createSuccessModal = () => {
    // Create the modal element
    const successModal = document.createElement('div');
    successModal.className = 'modal success-modal';
    successModal.style.display = 'none';
    
    // Create the modal content
    successModal.innerHTML = `
        <div class="modal-content">
            <dotlottie-player 
                src="https://lottie.host/d074969e-37d0-4d27-b36c-027c7c2e9bba/Zv3HZazJh0.lottie" 
                background="transparent" 
                speed="1" 
                style="width: 300px; height: 300px" 
                loop 
                autoplay
            ></dotlottie-player>
            <h3>Registration Successful!</h3>
            <p>You've been registered with your social account.</p>
            <button class="modal-btn">Continue to Login</button>
        </div>
    `;
    
    // Add to the document
    document.body.appendChild(successModal);
    
    // Add event listener to the button
    successModal.querySelector('.modal-btn').addEventListener('click', () => {
        closeModal(successModal);
    });
    
    return successModal;
};

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
});

// Function to show/hide loader
const toggleLoader = (show) => {
    loaderContainer.style.display = show ? 'flex' : 'none';
};

// Function to show modal
const showModal = (modal) => {
    if (modal) {
        modal.style.display = 'flex';
        // Add click outside to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
};

// Function to close modal with animation
const closeModal = (modal) => {
    if (modal) {
        modal.classList.add('closing');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('closing');
        }, 300);
    }
};

// Prevent default error logging
window.addEventListener('unhandledrejection', function(event) {
    event.preventDefault();
});

// Function to force sign out (for development and testing)
async function forceSignOut() {
    try {
        await supabaseClient.auth.signOut();
        alert('Signed out successfully. Refresh the page to see the login form.');
        window.location.reload();
    } catch (error) {
        console.error('Error signing out:', error);
        alert('Error signing out: ' + error.message);
    }
}

// Check if user is already logged in
window.addEventListener('load', async () => {
    try {
        // First check if coming from registration
        const urlParams = new URLSearchParams(window.location.search);
        const isRegistration = urlParams.get('registration') === 'true';
        const forceLogin = urlParams.get('force_login') === 'true';
        
        if (isRegistration) {
            // This is a registration redirect - ensure user is signed out
            console.log('Registration redirect detected. Ensuring user is signed out...');
            await supabaseClient.auth.signOut();
            
            // Show registration success message
            const successModal = createSuccessModal();
            showModal(successModal);
            
            // Clean up the URL
            const newUrl = window.location.href.split('?')[0];
            window.history.replaceState({}, document.title, newUrl);
        } else if (forceLogin) {
            // Force login page, don't redirect even if session exists
            console.log('Force login parameter detected. Showing login page...');
        } else {
            // Normal login page load - check if already logged in
            console.log('Checking for existing session...');
            const { data: { session } } = await supabaseClient.auth.getSession();
            
            if (session) {
                console.log('Session found. Redirecting to dashboard...');
                window.location.href = 'dashboard/dashboard.html';
            } else {
                console.log('No session found. Ready for login.');
            }
        }
    } catch (error) {
        console.error('Error checking session:', error);
    }
});

// Handle login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    toggleLoader(true);

    // Silent error handling
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    }).catch(() => ({ data: null, error: true }));

    toggleLoader(false);

    if (error || !data?.user) {
        showModal(errorModal);
        return;
    }

    // If we get here, login was successful
    window.location.href = 'dashboard/dashboard.html';
});

// Social login handlers
document.querySelectorAll('.btn-social').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Show loader while processing
        toggleLoader(true);
        
        // Determine which provider was clicked
        const provider = btn.classList.contains('google') ? 'google' : 'facebook';
        console.log('Starting login with provider:', provider);
        
        try {
            // Get the base URL for redirects
            const currentUrl = window.location.href;
            const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
            
            // Try to sign in using OAuth - but don't redirect the browser yet
            const { data, error } = await supabaseClient.auth.signInWithOAuth({
                provider: provider,
                options: {
                    skipBrowserRedirect: true,
                }
            });
            
            // If there's an error or no URL to redirect to
            if (error || !data?.url) {
                toggleLoader(false);
                console.error('OAuth error:', error);
                showModal(errorModal);
                return;
            }
            
            // Store the URL in localStorage to retrieve after auth
            localStorage.setItem('oauth_provider', provider);
            localStorage.setItem('oauth_redirect_url', data.url);
            localStorage.setItem('oauth_final_destination', 'dashboard/dashboard.html');
            localStorage.setItem('oauth_source', 'login');
            
            // Redirect the browser
            window.location.href = data.url;
        } catch (error) {
            toggleLoader(false);
            console.error('OAuth error:', error);
            showModal(errorModal);
        }
    });
});

// Update click handlers to use new close function
document.querySelectorAll('.modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        if (modal) {
            closeModal(modal);
        }
    });
});

// Update modal click outside handler
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}); 