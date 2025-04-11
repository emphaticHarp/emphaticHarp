// Supabase Configuration
const SUPABASE_URL = 'https://xsqdxhopiuyukbqeyfzj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzcWR4aG9waXV5dWticWV5ZnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNjU3NzYsImV4cCI6MjA1Njg0MTc3Nn0.9R6l5jUMy41Z8OT7gKOmExpx37_j50lbbOJcWUaahOU';

// Initialize the Supabase client
const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// Make supabase available globally
window.supabase = supabase;

// Helper functions for vehicle management
window.supabaseHelpers = {
    // Create vehicles table if it doesn't exist
    async createVehiclesTable() {
        const { error } = await supabase.rpc('create_vehicles_table', {
            sql: `
                CREATE TABLE IF NOT EXISTS vehicles (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    name TEXT NOT NULL,
                    brand TEXT NOT NULL,
                    category TEXT NOT NULL,
                    type TEXT NOT NULL,
                    horsepower INTEGER NOT NULL,
                    acceleration TEXT NOT NULL,
                    top_speed TEXT NOT NULL,
                    engine_type TEXT NOT NULL,
                    price DECIMAL(10,2) NOT NULL,
                    status TEXT NOT NULL,
                    description TEXT,
                    features JSONB DEFAULT '[]',
                    additional_images JSONB DEFAULT '[]',
                    image_url TEXT NOT NULL,
                    has_chauffeur BOOLEAN DEFAULT false,
                    has_insurance BOOLEAN DEFAULT false,
                    is_most_popular BOOLEAN DEFAULT false,
                    is_new_arrival BOOLEAN DEFAULT false,
                    is_ultra_exclusive BOOLEAN DEFAULT false,
                    created_at TIMESTAMPTZ DEFAULT NOW()
                );
            `
        });
        
        if (error) {
            console.error('Error creating vehicles table:', error);
            throw error;
        }
    },
    
    // Save a new vehicle
    async saveVehicleToSupabase(vehicleData) {
        // Parse JSON fields
        if (typeof vehicleData.features === 'string') {
            vehicleData.features = JSON.parse(vehicleData.features);
        }
        if (typeof vehicleData.additional_images === 'string') {
            vehicleData.additional_images = JSON.parse(vehicleData.additional_images);
        }
        
        // Convert boolean strings to actual booleans
        const booleanFields = ['has_chauffeur', 'has_insurance', 'is_most_popular', 'is_new_arrival', 'is_ultra_exclusive'];
        booleanFields.forEach(field => {
            vehicleData[field] = vehicleData[field] === 'true' || vehicleData[field] === true;
        });
        
        // Convert price to number
        vehicleData.price = parseFloat(vehicleData.price);
        vehicleData.horsepower = parseInt(vehicleData.horsepower);
        
        const { data, error } = await supabase
            .from('vehicles')
            .insert([vehicleData])
            .select();
        
        if (error) {
            console.error('Error saving vehicle:', error);
            throw error;
        }
        
        return { data: data[0] };
    },
    
    // Update an existing vehicle
    async updateVehicleInSupabase(id, vehicleData) {
        // Parse JSON fields
        if (typeof vehicleData.features === 'string') {
            vehicleData.features = JSON.parse(vehicleData.features);
        }
        if (typeof vehicleData.additional_images === 'string') {
            vehicleData.additional_images = JSON.parse(vehicleData.additional_images);
        }
        
        // Convert boolean strings to actual booleans
        const booleanFields = ['has_chauffeur', 'has_insurance', 'is_most_popular', 'is_new_arrival', 'is_ultra_exclusive'];
        booleanFields.forEach(field => {
            vehicleData[field] = vehicleData[field] === 'true' || vehicleData[field] === true;
        });
        
        // Convert price to number
        vehicleData.price = parseFloat(vehicleData.price);
        vehicleData.horsepower = parseInt(vehicleData.horsepower);
        
        // Remove id from update data
        delete vehicleData.id;
        
        const { data, error } = await supabase
            .from('vehicles')
            .update(vehicleData)
            .eq('id', id)
            .select();
        
        if (error) {
            console.error('Error updating vehicle:', error);
            throw error;
        }
        
        return { data: data[0] };
    },
    
    // Get all vehicles
    async getVehiclesFromSupabase() {
        const { data, error } = await supabase
            .from('vehicles')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Error getting vehicles:', error);
            throw error;
        }
        
        return { data };
    },
    
    // Get a single vehicle by ID
    async getVehicleFromSupabase(id) {
        const { data, error } = await supabase
            .from('vehicles')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) {
            console.error('Error getting vehicle:', error);
            throw error;
        }
        
        return { data };
    },
    
    // Delete a vehicle
    async deleteVehicleFromSupabase(id) {
        const { error } = await supabase
            .from('vehicles')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('Error deleting vehicle:', error);
            throw error;
        }
        
        return { error: null };
    }
};

// Initialize the vehicles table when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await window.supabaseHelpers.createVehiclesTable();
        console.log('Vehicles table initialized successfully');
    } catch (error) {
        console.error('Error initializing vehicles table:', error);
    }
});

// Helper function to load scripts dynamically
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Supabase Storage Functions
async function uploadImageToSupabase(file, path) {
    try {
        const supabase = await initSupabase();
        
        if (!file) {
            throw new Error('No file provided for upload');
        }
        
        // Generate a unique file name
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${path}/${fileName}`;
        
        console.log(`Uploading file to ${filePath}...`);
        console.log(`File details: name=${file.name}, type=${file.type}, size=${file.size} bytes`);
        
        // Check if the bucket exists
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
        if (bucketsError) {
            console.error('Error listing buckets:', bucketsError);
            throw new Error(`Failed to list storage buckets: ${bucketsError.message}`);
        }
        
        const vehiclesBucketExists = buckets.some(bucket => bucket.name === 'vehicles');
        if (!vehiclesBucketExists) {
            console.error('Vehicles bucket does not exist');
            throw new Error('Storage bucket "vehicles" does not exist. Please create it in your Supabase dashboard.');
        }
        
        // Upload the file
        const { data, error } = await supabase.storage
            .from('vehicles')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true // Changed to true to overwrite if file exists
            });
        
        if (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
        
        console.log('File uploaded successfully, getting public URL...');
        
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
            .from('vehicles')
            .getPublicUrl(filePath);
        
        console.log('File public URL:', publicUrl);
        return publicUrl;
    } catch (error) {
        console.error('Error in uploadImageToSupabase:', error);
        throw error;
    }
}

// Upload a base64 image to Supabase storage
async function uploadBase64ImageToSupabase(base64String, path) {
    try {
        if (!base64String) {
            throw new Error('No base64 string provided for upload');
        }
        
        console.log('Converting base64 to blob...');
        
        // Convert base64 to blob
        const fetchResponse = await fetch(base64String);
        const blob = await fetchResponse.blob();
        
        console.log(`Blob created: type=${blob.type}, size=${blob.size} bytes`);
        
        // Create a file from the blob
        const file = new File([blob], `image_${Date.now()}.png`, { type: 'image/png' });
        
        console.log(`File created from blob: name=${file.name}, type=${file.type}, size=${file.size} bytes`);
        
        // Upload the file
        return uploadImageToSupabase(file, path);
    } catch (error) {
        console.error('Error in uploadBase64ImageToSupabase:', error);
        throw error;
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Supabase config loaded');
    // Don't auto-initialize to avoid race conditions
    // Let the main page control when to initialize
}); 