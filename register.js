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
const registerForm = document.getElementById('registerForm');
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.getElementById('password');
const loaderContainer = document.querySelector('.loader-container');
const successModal = document.querySelector('.success-modal');
const errorModal = document.querySelector('.error-modal');
const cooldownModal = document.querySelector('.cooldown-modal');
const invalidEmailModal = document.querySelector('.invalid-email-modal');

// Check and clear any existing session on page load
window.addEventListener('load', async () => {
    // Check if there's an existing session
    const { data: { session } } = await supabaseClient.auth.getSession();
    
    // If there's a session on the registration page, sign out
    if (session) {
        console.log('Existing session found on registration page. Signing out...');
        await supabaseClient.auth.signOut();
    }
    
    // Check if user was redirected here because they don't have an account
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('new_oauth_user') === 'true') {
        // Create an alert-style message at the top of the form
        const formContainer = document.querySelector('.form-container');
        const form = document.getElementById('registerForm');
        
        const alertMessage = document.createElement('div');
        alertMessage.style.backgroundColor = '#ff9800';
        alertMessage.style.color = 'white';
        alertMessage.style.padding = '12px';
        alertMessage.style.borderRadius = '4px';
        alertMessage.style.marginBottom = '20px';
        alertMessage.style.textAlign = 'center';
        alertMessage.style.fontSize = '14px';
        alertMessage.innerHTML = '<strong>Account not found!</strong> Please complete registration to create your account.';
        
        formContainer.insertBefore(alertMessage, form);
        
        // Remove the parameter from URL
        const newUrl = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, newUrl);
        
        // Auto-focus on first form field
        setTimeout(() => {
            document.getElementById('fullName').focus();
        }, 500);
    }
});

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
    modal.style.display = 'flex';
};

// Handle registration
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    try {
        toggleLoader(true);

        // Try to register the user
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    phone: phone
                }
            }
        });

        toggleLoader(false);

        // Handle specific error cases
        if (error) {
            if (error.message.includes('already registered') || error.message.includes('already exists')) {
                showModal(errorModal);
            } else if (error.message.includes('security purposes')) {
                showModal(cooldownModal);
            } else if (error.message.includes('invalid') || error.code === 'email_address_invalid') {
                showModal(invalidEmailModal);
            } else {
                showModal(errorModal);
            }
            return;
        }

        // Check if user was created successfully
        if (data?.user) {
            // Sign out the user to ensure they have to log in manually
            await supabaseClient.auth.signOut();
            
            showModal(successModal);
            setTimeout(() => {
                window.location.href = 'index.html?force_login=true';
            }, 3000);
        } else {
            showModal(errorModal);
        }

    } catch (error) {
        toggleLoader(false);
        showModal(errorModal);
    }
});

// Social login handlers
document.querySelectorAll('.btn-social').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Show loader
        toggleLoader(true);
        
        // Determine which provider was clicked
        const provider = btn.classList.contains('google') ? 'google' : 'facebook';
        
        try {
            // Before redirecting for OAuth, explicitly sign out any existing session
            await supabaseClient.auth.signOut();
            
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
            localStorage.setItem('oauth_final_destination', 'index.html');
            localStorage.setItem('oauth_source', 'register');
            
            // Redirect the browser
            window.location.href = data.url;
        } catch (error) {
            toggleLoader(false);
            console.error('OAuth error:', error);
            showModal(errorModal);
        }
    });
}); 