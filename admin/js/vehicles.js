// Vehicle Management Functions
let currentVehicles = [];
let isEditMode = false;

// Features management
let features = [];

// Additional images management
let additionalImages = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', async function() {
    // Load vehicles from Supabase
    await loadVehicles();
    
    // Form submission
    const vehicleForm = document.getElementById('vehicleForm');
    if (vehicleForm) {
        vehicleForm.addEventListener('submit', handleVehicleSubmit);
    }

    // Image upload handler
    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload) {
        imageUpload.addEventListener('change', handleImageUpload);
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == document.getElementById('vehicleModal')) {
            closeModal();
        }
    }
});

// Load vehicles from Supabase
async function loadVehicles() {
    const loadingElement = document.getElementById('vehiclesLoading');
    const vehiclesGrid = document.getElementById('vehiclesGrid');
    
    // Check if elements exist
    if (!vehiclesGrid) {
        console.error('Vehicles grid element not found');
        return;
    }
    
    try {
        // Show loading if element exists
        if (loadingElement) {
            loadingElement.style.display = 'flex';
        }
        
        // Initialize Supabase if needed
        if (!window.supabaseHelpers) {
            console.error('Supabase helpers not found. Make sure supabase-config.js is loaded correctly.');
            throw new Error('Supabase configuration not loaded');
        }
        
        // Get vehicles from Supabase
        const vehicles = await window.supabaseHelpers.getVehiclesFromSupabase();
        currentVehicles = vehicles || [];
        
        // Clear the grid
        vehiclesGrid.innerHTML = '';
        
        if (!vehicles || vehicles.length === 0) {
            // Show empty state
            vehiclesGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-car"></i>
                    <h3>No Vehicles Found</h3>
                    <p>You haven't added any vehicles yet. Click the button below to add your first vehicle.</p>
                    <button onclick="openAddVehicleModal()">
                        <i class="fas fa-plus"></i>
                        Add New Vehicle
                    </button>
                </div>
            `;
        } else {
            // Render vehicles
            vehicles.forEach(vehicle => {
                vehiclesGrid.appendChild(createVehicleCard(vehicle));
            });
        }
    } catch (error) {
        console.error('Error loading vehicles:', error);
        
        // Show error message if toast function exists
        if (typeof showToast === 'function') {
            showToast('Failed to load vehicles: ' + (error.message || 'Unknown error'), 'error');
        }
        
        // Show error state if grid exists
        if (vehiclesGrid) {
            vehiclesGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Error Loading Vehicles</h3>
                    <p>There was a problem loading the vehicles. Please try again later.</p>
                    <button onclick="loadVehicles()">
                        <i class="fas fa-sync"></i>
                        Try Again
                    </button>
                </div>
            `;
        }
    } finally {
        // Hide loading if element exists
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
}

// Create a vehicle card element
function createVehicleCard(vehicle) {
    const card = document.createElement('div');
    card.className = 'vehicle-card';
    
    // Determine status class
    let statusClass = 'status-available';
    if (vehicle.status === 'rented') {
        statusClass = 'status-rented';
    } else if (vehicle.status === 'maintenance') {
        statusClass = 'status-maintenance';
    }

    // Local data URI for placeholder
    const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTUwIDE1MCI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNmMGYwZjAiLz48dGV4dCB4PSI3NSIgeT0iNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIEVycm9yPC90ZXh0Pjwvc3ZnPg==';

    // Format features list
    const featuresList = Array.isArray(vehicle.features) 
        ? vehicle.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')
        : '';
    
    // Format additional images gallery with error handling
    const additionalImagesGallery = Array.isArray(vehicle.additional_images) && vehicle.additional_images.length > 0
        ? `<div class="vehicle-gallery">
            <div class="gallery-thumbnail active" onclick="switchMainImage('${vehicle.id}', '${vehicle.image_url}', 0)">
                <img src="${vehicle.image_url}" alt="Main Image" onerror="this.src='${placeholderImage}'; this.classList.add('image-load-error');">
            </div>
            ${vehicle.additional_images.map((img, index) => `
                <div class="gallery-thumbnail" onclick="switchMainImage('${vehicle.id}', '${img}', ${index + 1})">
                    <img src="${img}" alt="Additional Image ${index + 1}" onerror="this.src='${placeholderImage}'; this.classList.add('image-load-error');">
                </div>
            `).join('')}
           </div>`
        : '';
    
    card.innerHTML = `
        <div class="vehicle-image" id="main-image-${vehicle.id}">
            <img src="${vehicle.image_url}" alt="${vehicle.name}" 
                 onerror="this.src='${placeholderImage}'; this.parentElement.style.backgroundImage = 'url(${placeholderImage})'; this.classList.add('image-load-error');"
                 style="display: none;">
            <div class="vehicle-actions">
                <button class="vehicle-action-btn edit" onclick="openEditVehicleModal('${vehicle.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="vehicle-action-btn delete" onclick="showDeleteConfirmation('${vehicle.id}', '${vehicle.name}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <span class="vehicle-status ${statusClass}">
                ${vehicle.status === 'available' ? '<i class="fas fa-check-circle"></i>' :
                  vehicle.status === 'rented' ? '<i class="fas fa-user"></i>' :
                  '<i class="fas fa-tools"></i>'}
                ${vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
            </span>
        </div>
        ${additionalImagesGallery}
        <div class="vehicle-details">
            <div class="vehicle-header">
                <h3 class="vehicle-name">${vehicle.name}</h3>
                <div class="vehicle-brand">${vehicle.brand}</div>
            </div>
            
            <div class="vehicle-price-section">
                <div class="vehicle-price">₹${vehicle.price}/day</div>
                ${vehicle.is_new_arrival ? '<span class="badge new">New Arrival</span>' : ''}
                ${vehicle.is_ultra_exclusive ? '<span class="badge exclusive">Ultra Exclusive</span>' : ''}
            </div>

            <div class="vehicle-specs">
                <div class="spec-row">
                    <div class="spec-item">
                        <i class="fas fa-car"></i>
                        <span>${vehicle.category} - ${vehicle.type}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>${vehicle.speed}</span>
                    </div>
                </div>
                <div class="spec-row">
                    <div class="spec-item">
                        <i class="fas fa-gas-pump"></i>
                        <span>${vehicle.fuel}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-horse"></i>
                        <span>${vehicle.horsepower} HP</span>
                    </div>
                </div>
            </div>

            ${vehicle.description ? `
                <div class="vehicle-description" id="desc-${vehicle.id}">
                    <p>${vehicle.description}</p>
                    <div class="description-fade"></div>
                </div>
                <button class="read-more-btn" onclick="toggleDescription('desc-${vehicle.id}')">
                    <span class="read-more-text">Read More</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
            ` : ''}

            ${featuresList ? `
                <div class="vehicle-features">
                    <h4>Features</h4>
                    <div class="features-list">
                        ${featuresList}
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    // Set the background image after creation
    const mainImage = card.querySelector(`#main-image-${vehicle.id}`);
    mainImage.style.backgroundImage = `url('${vehicle.image_url}')`;
    
    return card;
}

function openAddVehicleModal() {
    isEditMode = false;
    document.getElementById('modalTitle').textContent = 'Add New Vehicle';
    document.getElementById('vehicleModal').style.display = 'block';
    document.getElementById('vehicleForm').reset();
    document.getElementById('vehicleId').value = '';
    document.getElementById('imagePreview').src = 'https://via.placeholder.com/300x200?text=Main+Image';
    document.getElementById('aiPromptContainer').style.display = 'none';
    document.getElementById('toggleAIBtn').innerHTML = '<i class="fas fa-magic"></i> AI Generate';
    features = [];
    additionalImages = [];
    updateFeaturesList();
    updateAdditionalImagesPreviews();
}

async function openEditVehicleModal(vehicleId) {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.id = 'editLoadingOverlay';  // Add ID for easier removal
    loadingOverlay.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    document.body.appendChild(loadingOverlay);

    try {
        // Fetch vehicle details
        const vehicle = await window.supabaseHelpers.getVehicleFromSupabase(vehicleId);
        
        if (!vehicle) {
            throw new Error('Vehicle not found');
        }

        // Set edit mode
        isEditMode = true;
        
        // Reset form and set modal title
        const form = document.getElementById('vehicleForm');
        form.reset();
        document.getElementById('modalTitle').textContent = 'Edit Vehicle';
        
        // Set vehicle ID
        document.getElementById('vehicleId').value = vehicle.id;
        
        // Populate form fields
        for (const [key, value] of Object.entries(vehicle)) {
            const input = form.elements[key];
            if (input && key !== 'image') { // Skip file input
                if (input.type === 'checkbox') {
                    input.checked = value;
                } else if (input.type !== 'file') { // Skip file inputs
                    input.value = value;
                }
            }
        }
        
        // Set image preview
        if (vehicle.image_url) {
            document.getElementById('imagePreview').src = vehicle.image_url;
        }
        
        // Set features
        features = Array.isArray(vehicle.features) ? vehicle.features : [];
        updateFeaturesList();
        
        // Set additional images - Parse from JSON if needed
        if (typeof vehicle.additional_images === 'string') {
            try {
                additionalImages = JSON.parse(vehicle.additional_images);
            } catch (e) {
                additionalImages = [];
                console.error('Error parsing additional images:', e);
            }
        } else {
            additionalImages = Array.isArray(vehicle.additional_images) ? vehicle.additional_images : [];
        }
        
        // Update additional images preview
        updateAdditionalImagesPreviews();
        
        // Show modal
        document.getElementById('vehicleModal').style.display = 'block';
        
    } catch (error) {
        console.error('Error loading vehicle:', error);
        showToast('Failed to load vehicle: ' + error.message, 'error');
    } finally {
        // Remove loading overlay using ID
        const overlay = document.getElementById('editLoadingOverlay');
        if (overlay) {
            overlay.remove();
        }
        
        // Double check for any other loading overlays that might exist
        const allOverlays = document.querySelectorAll('.loading-overlay');
        allOverlays.forEach(overlay => overlay.remove());
    }
}

function closeModal() {
    document.getElementById('vehicleModal').style.display = 'none';
}

async function handleVehicleSubmit(event) {
    event.preventDefault();
    
    try {
        // Show loading state
        const saveBtn = document.querySelector('.save-btn');
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        
        // Get form data
        const form = event.target;
        const formData = new FormData(form);
        const vehicleData = {};
        
        // Convert FormData to object and handle basic fields
        for (const [key, value] of formData.entries()) {
            if (key !== 'image' && key !== 'id') {
                vehicleData[key] = value;
            }
        }
        
        // Handle ID
        const vehicleId = document.getElementById('vehicleId').value;
        if (vehicleId && vehicleId.trim() !== '') {
            vehicleData.id = vehicleId;
        }
        
        // Handle main image
        const fileInput = document.getElementById('imageUpload');
        const imagePreview = document.getElementById('imagePreview');
        
        // Use the current preview image URL if no new file is selected
        if (fileInput.files.length > 0) {
            const mainImageUrl = await window.supabaseHelpers.uploadImageToSupabase(
                fileInput.files[0], 
                'vehicles'
            );
            vehicleData.image_url = mainImageUrl;
            vehicleData.image = mainImageUrl;
        } else if (imagePreview.src && !imagePreview.src.includes('placeholder')) {
            vehicleData.image_url = imagePreview.src;
            vehicleData.image = imagePreview.src;
        } else {
            throw new Error('Please upload or generate an image for the vehicle');
        }
        
        // Handle additional images - ensure they are all uploaded to Supabase
        const processedAdditionalImages = [];
        for (const imageUrl of additionalImages) {
            if (imageUrl.startsWith('blob:')) {
                try {
                    // Convert blob URL to file
                    const response = await fetch(imageUrl);
                    const blob = await response.blob();
                    const timestamp = Date.now();
                    const path = `vehicles/additional_${timestamp}_${Math.random().toString(36).substring(7)}.jpg`;
                    
                    // Upload to Supabase
                    const { data: uploadData, error: uploadError } = await window.supabase.storage
                        .from('vehicles')
                        .upload(path, blob, {
                            contentType: 'image/jpeg',
                            upsert: true
                        });

                    if (uploadError) throw uploadError;

                    // Get public URL
                    const { data: { publicUrl } } = window.supabase.storage
                        .from('vehicles')
                        .getPublicUrl(path);

                    processedAdditionalImages.push(publicUrl);
                    
                    // Clean up blob URL
                    URL.revokeObjectURL(imageUrl);
                } catch (error) {
                    console.error('Error processing additional image:', error);
                    showToast(`Failed to process additional image: ${error.message}`, 'error');
                }
            } else {
                // If it's already a Supabase URL, keep it
                processedAdditionalImages.push(imageUrl);
            }
        }
        
        // Update vehicleData with processed additional images
        vehicleData.additional_images = processedAdditionalImages;
        
        // Convert boolean fields
        const booleanFields = ['has_chauffeur', 'has_insurance', 'is_most_popular', 'is_new_arrival', 'is_ultra_exclusive'];
        booleanFields.forEach(field => {
            vehicleData[field] = formData.get(field) === 'on';
        });
        
        // Add features
        vehicleData.features = features;
        
        // Save to Supabase
        if (isEditMode) {
            await window.supabaseHelpers.updateVehicleInSupabase(vehicleId, vehicleData);
            showToast('Vehicle updated successfully!', 'success');
        } else {
            await window.supabaseHelpers.saveVehicleToSupabase(vehicleData);
            showToast('Vehicle added successfully!', 'success');
        }
        
        // Close modal and refresh vehicles
        closeModal();
        await loadVehicles();
    } catch (error) {
        console.error('Error in handleVehicleSubmit:', error);
        showToast('Failed to save vehicle: ' + error.message, 'error');
    } finally {
        const saveBtn = document.querySelector('.save-btn');
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = 'Save Vehicle';
        }
    }
}

async function deleteVehicle(vehicleId) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
        try {
            await window.supabaseHelpers.deleteVehicleFromSupabase(vehicleId);
            showToast('Vehicle deleted successfully!', 'success');
            await loadVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            showToast('Failed to delete vehicle: ' + error.message, 'error');
        }
    }
}

// Image Upload Functions
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('imagePreview').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
}

// AI Image Generation Functions
function toggleAIPrompt() {
    const promptContainer = document.getElementById('aiPromptContainer');
    const toggleBtn = document.getElementById('toggleAIBtn');
    
    if (promptContainer.style.display === 'none') {
        promptContainer.style.display = 'block';
        toggleBtn.innerHTML = '<i class="fas fa-times"></i> Cancel AI';
        
        // Auto-populate the prompt with vehicle details
        const vehicleName = document.querySelector('input[name="name"]').value;
        const vehicleType = document.querySelector('select[name="type"]').value;
        const fuelType = document.querySelector('select[name="fuel"]').value;
        
        if (vehicleName || vehicleType) {
            let prompt = '';
            if (vehicleName) prompt += vehicleName + ' ';
            if (vehicleType) prompt += vehicleType + ' ';
            if (fuelType) prompt += fuelType + ' ';
            prompt += 'car in luxury showroom setting, professional photography, high quality';
            
            document.getElementById('aiPrompt').value = prompt.trim();
        }
    } else {
        promptContainer.style.display = 'none';
        toggleBtn.innerHTML = '<i class="fas fa-magic"></i> AI Generate';
    }
}

async function generateFromPrompt() {
    // Get vehicle details from the form
    const vehicleName = document.querySelector('input[name="name"]').value;
    const brand = document.querySelector('input[name="brand"]').value;
    const category = document.querySelector('select[name="category"]').value;
    const type = document.querySelector('select[name="type"]').value;
    const engineType = document.querySelector('input[name="engine_type"]').value;

    // Base prompt using vehicle details
    let basePrompt = `${brand} ${vehicleName}, ${category} ${type} with ${engineType} engine`;

    // Different perspectives for the 3 images
    const perspectives = [
        "front 3/4 view in a luxury showroom with dramatic lighting, professional car photography, high end, 4k, detailed",
        "side profile on a scenic mountain road at sunset, cinematic lighting, automotive photography, 8k, detailed",
        "rear 3/4 view in an modern architectural setting, dramatic shadows, professional photography, high resolution, detailed"
    ];

    const previewImg = document.getElementById('imagePreview');
    const generateBtn = document.querySelector('.generate-btn');
    if (generateBtn) generateBtn.disabled = true;

    // Create and add loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.id = 'aiGenerationOverlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <i class="fas fa-spinner fa-spin"></i>
            <div id="generationStatus">Preparing to generate images...</div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);

    try {
        // Clear existing additional images
        additionalImages = [];

        // Generate and upload images
        for (let i = 0; i < perspectives.length; i++) {
            const prompt = `${basePrompt}, ${perspectives[i]}`;
            const statusElement = document.getElementById('generationStatus');
            if (statusElement) {
                statusElement.textContent = `Generating image ${i + 1} of 3...`;
            }

            const response = await generateImageWithHuggingFace(prompt);
            
            if (response.success) {
                try {
                    // Convert blob URL to blob
                    const blob = await fetch(response.imageUrl).then(r => r.blob());
                    
                    // Clean up blob URL immediately
                    URL.revokeObjectURL(response.imageUrl);
                    
                    // Create unique filename
                    const timestamp = Date.now();
                    const path = `vehicles/ai_generated_${timestamp}_${i}_${Math.random().toString(36).substring(7)}.jpg`;
                    
                    if (statusElement) {
                        statusElement.textContent = `Uploading image ${i + 1} of 3...`;
                    }

                    // Upload to Supabase
                    const { data: uploadData, error: uploadError } = await window.supabase.storage
                        .from('vehicles')
                        .upload(path, blob, {
                            contentType: 'image/jpeg',
                            upsert: true
                        });

                    if (uploadError) throw uploadError;

                    // Get public URL
                    const { data: { publicUrl } } = window.supabase.storage
                        .from('vehicles')
                        .getPublicUrl(path);

                    if (i === 0) {
                        // First image becomes the main image
                        previewImg.src = publicUrl;
                        document.getElementById('vehicleForm').dataset.generatedImage = publicUrl;
                    } else {
                        // Additional images
                        additionalImages.push(publicUrl);
                    }

                } catch (uploadError) {
                    console.error('Error uploading AI image:', uploadError);
                    showToast(`Failed to upload image ${i + 1}: ${uploadError.message}`, 'error');
                    continue;
                }
            } else {
                throw new Error(`Failed to generate image ${i + 1}: ${response.error}`);
            }
        }

        // Update the additional images preview
        updateAdditionalImagesPreviews();

        // Hide the AI prompt section after successful generation
        const promptContainer = document.getElementById('aiPromptContainer');
        if (promptContainer) promptContainer.style.display = 'none';
        
        const toggleBtn = document.getElementById('toggleAIBtn');
        if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-magic"></i> AI Generate';
        
        showToast('All images generated successfully!', 'success');

    } catch (error) {
        console.error('Image generation error:', error);
        showToast('Failed to generate images: ' + error.message, 'error');
    } finally {
        // Always clean up - remove loading overlay and re-enable button
        const overlay = document.getElementById('aiGenerationOverlay');
        if (overlay) overlay.remove();
        
        if (generateBtn) generateBtn.disabled = false;
    }
}

function usePromptSuggestion(element) {
    const vehicleName = document.querySelector('input[name="name"]').value;
    const brand = document.querySelector('input[name="brand"]').value;
    const type = document.querySelector('select[name="type"]').value;
    
    if (!vehicleName || !brand || !type) {
        showToast('Please fill in the vehicle name, brand, and type first', 'error');
        return;
    }
    
    // Auto-generate after selecting a suggestion
    generateFromPrompt();
}

// Function to generate image using Hugging Face API
async function generateImageWithHuggingFace(prompt) {
    try {
        const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";
        const API_TOKEN = process.env.HUGGING_FACE_API_TOKEN || '';

        if (!API_TOKEN) {
            console.error("Hugging Face API token not found in environment variables");
            return await generateImageFallback(prompt);
        }

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    negative_prompt: "blurry, low quality, distorted, deformed, bad anatomy, watermark, signature, logo",
                    num_inference_steps: 50,
                    guidance_scale: 7.5,
                    width: 1024,
                    height: 768
                }
            })
        });

        if (!response.ok) {
            console.error("API Error:", response.status, response.statusText);
            const errorText = await response.text();
            console.error("Error details:", errorText);
            
            // If API fails, use fallback
            console.log("API request failed, using fallback...");
            return await generateImageFallback(prompt);
        }

        // The response will be a blob (binary data)
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        return {
            success: true,
            imageUrl: imageUrl
        };
    } catch (error) {
        console.error("Image generation error:", error);
        // Use fallback on error
        return await generateImageFallback(prompt);
    }
}

// Fallback function using Unsplash for testing
async function generateImageFallback(prompt) {
    console.log("Using fallback image generation with Unsplash");
    return new Promise((resolve) => {
        setTimeout(() => {
            // Use Unsplash random car images as fallback
            const keywords = prompt.split(' ').slice(0, 3).join(',');
            resolve({
                success: true,
                imageUrl: `https://source.unsplash.com/featured/1024x768/?car,${encodeURIComponent(keywords)}&random=${Date.now()}`
            });
        }, 1500);
    });
}

// Add toast styles
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    .toast {
        position: fixed;
        bottom: 30px;
        right: 30px;
        padding: 16px 22px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        min-width: 300px;
        max-width: 450px;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .toast.show {
        transform: translateY(0);
        opacity: 1;
    }

    .toast-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    .toast i {
        font-size: 24px;
        flex-shrink: 0;
    }

    .toast span {
        font-size: 14px;
        font-weight: 500;
        color: #333;
        line-height: 1.5;
    }

    .toast.success {
        background: linear-gradient(135deg, rgba(40, 167, 69, 0.95), rgba(40, 167, 69, 0.8));
        border-color: rgba(40, 167, 69, 0.3);
    }
    .toast.success i,
    .toast.success span {
        color: white;
    }

    .toast.error {
        background: linear-gradient(135deg, rgba(220, 53, 69, 0.95), rgba(220, 53, 69, 0.8));
        border-color: rgba(220, 53, 69, 0.3);
    }
    .toast.error i,
    .toast.error span {
        color: white;
    }

    .toast.warning {
        background: linear-gradient(135deg, rgba(255, 193, 7, 0.95), rgba(255, 193, 7, 0.8));
        border-color: rgba(255, 193, 7, 0.3);
    }
    .toast.warning i,
    .toast.warning span {
        color: #333;
    }

    .toast.info {
        background: linear-gradient(135deg, rgba(23, 162, 184, 0.95), rgba(23, 162, 184, 0.8));
        border-color: rgba(23, 162, 184, 0.3);
    }
    .toast.info i,
    .toast.info span {
        color: white;
    }

    @keyframes slideIn {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }

    .toast.show {
        animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    .toast.hide {
        animation: slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @media (max-width: 768px) {
        .toast {
            bottom: 20px;
            right: 20px;
            left: 20px;
            min-width: auto;
            max-width: none;
        }
    }
`;
document.head.appendChild(toastStyles);

function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(t => t.remove());

    // Create toast element
    const toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
    
    // Create toast content with icon
    const icon = type === 'success' ? 'fa-check-circle' :
                type === 'error' ? 'fa-exclamation-circle' :
                type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
    
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Set toast style and show
    toast.className = 'toast ' + type;
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.add('hide');
        toast.classList.remove('show');
        // Remove toast after animation
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 400);
    }, 3000);
}

function populateForm(vehicle) {
    const form = document.getElementById('vehicleForm');
    
    // Set form values
    document.getElementById('vehicleId').value = vehicle.id;
    
    for (const [key, value] of Object.entries(vehicle)) {
        const input = form.elements[key];
        if (input && key !== 'id') {
            input.value = value;
        }
    }
    
    // Set image preview
    if (vehicle.image_url) {
        document.getElementById('imagePreview').src = vehicle.image_url;
    }
}

// Update testFileUpload function
async function testFileUpload() {
    try {
        console.log('Testing file upload to Supabase...');
        
        const blob = new Blob(['Test file content'], { type: 'text/plain' });
        const testFile = new File([blob], 'test-file.txt', { type: 'text/plain' });
        
        console.log('Test file created:', testFile);
        
        const imageUrl = await window.supabaseHelpers.uploadImageToSupabase(
            testFile,
            'test-uploads'
        );
        
        console.log('Test file uploaded successfully, URL:', imageUrl);
        showToast('Test file uploaded successfully!', 'success');
        return true;
    } catch (error) {
        console.error('Test file upload failed:', error);
        showToast('Test file upload failed: ' + error.message, 'error');
        return false;
    }
}

// Update form submission handler
document.getElementById('vehicleForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Get checkbox values
    const checkboxFields = ['has_chauffeur', 'has_insurance', 'is_most_popular', 'is_new_arrival', 'is_ultra_exclusive'];
    checkboxFields.forEach(field => {
        formData.set(field, form.querySelector(`[name="${field}"]`).checked);
    });
    
    // Add features and additional images
    formData.set('features', JSON.stringify(features));
    formData.set('additional_images', JSON.stringify(additionalImages));
    
    // Convert FormData to object
    const vehicleData = Object.fromEntries(formData.entries());
    
    try {
        const imageFile = form.querySelector('[name="image"]').files[0];
        if (imageFile) {
            const path = `vehicles/${Date.now()}_${imageFile.name}`;
            const { data: uploadData, error: uploadError } = await window.supabase.storage
                .from('vehicles')
                .upload(path, imageFile);
            
            if (uploadError) throw uploadError;
            
            const { data: { publicUrl } } = window.supabase.storage
                .from('vehicles')
                .getPublicUrl(path);
            
            vehicleData.image_url = publicUrl;
        }
        
        // Save to database
        if (vehicleData.id) {
            // Update existing vehicle
            const { data, error } = await window.supabaseHelpers.updateVehicleInSupabase(
                vehicleData.id,
                vehicleData
            );
            if (error) throw error;
            showToast('Vehicle updated successfully!', 'success');
        } else {
            // Create new vehicle
            const { data, error } = await window.supabaseHelpers.saveVehicleToSupabase(vehicleData);
            if (error) throw error;
            showToast('Vehicle added successfully!', 'success');
        }
        
        closeModal();
        loadVehicles(); // Refresh the list
        
    } catch (error) {
        console.error('Error saving vehicle:', error);
        showToast('Failed to save vehicle: ' + error.message, 'error');
    }
});

// Update additional images upload handler
document.getElementById('additionalImageUpload').addEventListener('change', async function(e) {
    const files = Array.from(e.target.files);
    const container = document.getElementById('additionalImages');
    
    for (const file of files) {
        try {
            // Upload to Supabase
            const path = `vehicles/${Date.now()}_${file.name}`