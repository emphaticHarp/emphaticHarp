// Car data object with details for each car
const carData = {
    'Ferrari SF90 Stradale': {
        name: 'Ferrari SF90 Stradale',
        price: '₹1,50,000',
        reviews: 24,
        description: 'The Ferrari SF90 Stradale is Ferrari\'s first production plug-in hybrid supercar, representing a new chapter in Maranello\'s history. The car\'s name references 90 years of Scuderia Ferrari, the racing division of the Italian automotive manufacturer, and "Stradale" meaning "made for the road". \n\nIt features a revolutionary powertrain: a 4.0-liter twin-turbocharged V8 engine that generates 769 horsepower, combined with three electric motors that produce an additional 217 horsepower for a total of 986 horsepower. This makes it the most powerful Ferrari road car ever produced. \n\nThe SF90 Stradale can accelerate from 0-100 km/h in just 2.5 seconds and has a top speed of 340 km/h. The car also features an all-wheel-drive system, a first for a Ferrari sports car, and can travel up to 25 km on electric power alone. Its advanced aerodynamics generate 390 kg of downforce at 250 km/h, ensuring exceptional handling and stability.',
        mainImage: '../images/ferrari-sf90.jpg',
        gallery: [
            '../images/ferrari-sf90.jpg',
            '../images/car3.jpg',
            '../images/lamborghini-aventador.jpg',
            '../images/bugatti-chiron.jpg'
        ],
        specs: {
            engine: 'V8 Twin-Turbo + 3 Electric Motors',
            horsepower: '986 HP',
            acceleration: '2.5s 0-100 km/h',
            topSpeed: '340 km/h',
            transmission: '8-speed DCT',
            fuelType: 'Hybrid'
        },
        features: [
            'Hybrid Powertrain',
            'Carbon Fiber Body',
            'Active Aerodynamics',
            'Digital Dashboard',
            'Premium Sound System',
            'Climate Control',
            'Leather Interior',
            'Navigation System',
            'Bluetooth Connectivity',
            'Parking Sensors'
        ]
    },
    'Lamborghini Aventador SVJ': {
        name: 'Lamborghini Aventador SVJ',
        price: '₹1,75,000',
        reviews: 18,
        description: 'The Lamborghini Aventador SVJ (Super Veloce Jota) represents the pinnacle of Lamborghini\'s flagship supercar lineup. The "SVJ" designation stands for Super Veloce Jota, where "Super Veloce" means "super fast" and "Jota" refers to Appendix J of the FIA rulebook, historically used by Lamborghini to denote a car\'s track-focused nature.\n\nAt its heart is a naturally-aspirated 6.5-liter V12 engine producing an astonishing 770 horsepower and 720 Nm of torque, making it one of the most powerful naturally aspirated production cars ever created. This masterpiece of engineering can accelerate from 0-100 km/h in just 2.8 seconds and has a top speed exceeding 350 km/h.\n\nWhat truly sets the SVJ apart is Lamborghini\'s revolutionary ALA 2.0 (Aerodinamica Lamborghini Attiva) system, which provides active aerodynamics to improve downforce and reduce drag. This sophisticated system can direct airflow over each side of the car independently, creating an aerodynamic vectoring effect that enhances cornering capabilities. The SVJ famously held the Nürburgring Nordschleife lap record for production cars with an incredible time of 6:44.97, cementing its status as one of the most track-capable supercars ever produced.',
        mainImage: '../images/lamborghini-aventador.jpg',
        gallery: [
            '../images/lamborghini-aventador.jpg',
            '../images/car3.jpg',
            '../images/ferrari-sf90.jpg',
            '../images/bugatti-chiron.jpg'
        ],
        specs: {
            engine: 'V12 Naturally Aspirated',
            horsepower: '770 HP',
            acceleration: '2.8s 0-100 km/h',
            topSpeed: '350 km/h',
            transmission: '7-speed ISR',
            fuelType: 'Petrol'
        },
        features: [
            'Active Aerodynamics (ALA 2.0)',
            'Carbon Fiber Monocoque',
            'Scissor Doors',
            'Digital Dashboard',
            'Premium Sound System',
            'Climate Control',
            'Alcantara Interior',
            'Navigation System',
            'Bluetooth Connectivity',
            'Parking Sensors'
        ]
    },
    'McLaren 720S': {
        name: 'McLaren 720S',
        price: '₹1,45,000',
        reviews: 21,
        description: 'The McLaren 720S represents the perfect fusion of art and science in automotive engineering. As the second generation of McLaren\'s Super Series, this British masterpiece redefines what\'s possible in a modern supercar, combining breathtaking performance with daily usability.\n\nPowered by a revolutionary 4.0-liter twin-turbocharged V8 engine, the 720S produces an astonishing 720 PS (710 bhp) - hence its name - and 770 Nm of torque. This powerplant enables the car to accelerate from 0-100 km/h in just 2.9 seconds and reach a top speed of 341 km/h. Perhaps even more impressive is its 0-200 km/h time of just 7.8 seconds, demonstrating the relentless acceleration that defines the McLaren experience.\n\nThe 720S is built around McLaren\'s carbon fiber Monocage II chassis, which provides exceptional rigidity while keeping weight to a minimum. The distinctive dihedral doors are not just for show - they provide improved ingress and egress while contributing to the car\'s aerodynamic efficiency. The active aerodynamics system works in harmony with the sophisticated suspension to deliver both incredible high-speed stability and nimble handling characteristics.\n\nInside, the driver-focused cockpit features a unique folding digital instrument display and McLaren\'s intuitive infotainment system. Despite its performance credentials, the 720S offers surprising comfort and practicality, with excellent visibility and a generous luggage space, making it truly a supercar you can use every day.',
        mainImage: '../images/mclaren-720s.jpg',
        gallery: [
            '../images/mclaren-720s.jpg',
            '../images/car3.jpg',
            '../images/ferrari-sf90.jpg',
            '../images/bugatti-chiron.jpg'
        ],
        specs: {
            engine: 'V8 Twin-Turbo',
            horsepower: '720 HP',
            acceleration: '2.9s 0-100 km/h',
            topSpeed: '341 km/h',
            transmission: '7-speed SSG',
            fuelType: 'Petrol'
        },
        features: [
            'Dihedral Doors',
            'Carbon Fiber Monocage II',
            'Active Dynamics Panel',
            'Folding Driver Display',
            'Premium Sound System',
            'Climate Control',
            'Leather Interior',
            'Navigation System',
            'Bluetooth Connectivity',
            'Parking Sensors'
        ]
    },
    'Bugatti Chiron': {
        name: 'Bugatti Chiron',
        price: '₹2,00,000',
        reviews: 12,
        description: 'The Bugatti Chiron stands as one of the most extraordinary automotive achievements in history, representing the absolute pinnacle of automotive engineering, luxury, and performance. Named after the legendary Monegasque racing driver Louis Chiron, this hypercar continues Bugatti\'s legacy of creating vehicles that defy conventional limitations.\n\nAt the heart of the Chiron lies an engineering marvel: the 8.0-liter quad-turbocharged W16 engine producing an astounding 1,500 horsepower and 1,600 Nm of torque. This mechanical masterpiece propels the Chiron from 0-100 km/h in a mere 2.4 seconds, with acceleration continuing relentlessly to its electronically limited top speed of 420 km/h. In special editions, the Chiron has demonstrated capabilities exceeding 490 km/h, making it one of the fastest production cars ever created.\n\nEvery aspect of the Chiron is crafted with meticulous attention to detail. The monocoque chassis is made entirely of carbon fiber, providing exceptional rigidity while keeping weight manageable. The car\'s distinctive C-shaped profile is not merely aesthetic—it\'s functional, channeling air to cool the massive engine and generating the downforce necessary to keep this hypercar planted at extreme speeds.\n\nInside, the Chiron offers an unparalleled blend of luxury and technology. Hand-stitched leather, polished aluminum, and carbon fiber create an atmosphere of refined opulence. The minimalist dashboard features analog gauges alongside modern digital displays, reflecting Bugatti\'s philosophy of combining traditional craftsmanship with cutting-edge innovation.\n\nWith only 500 units planned for production, the Chiron represents not just a mode of transportation, but a masterpiece of automotive art and engineering—a testament to what is possible when no compromise is accepted.',
        mainImage: '../images/bugatti-chiron.jpg',
        gallery: [
            '../images/bugatti-chiron.jpg',
            '../images/car3.jpg',
            '../images/ferrari-sf90.jpg',
            '../images/lamborghini-aventador.jpg'
        ],
        specs: {
            engine: 'W16 Quad-Turbo',
            horsepower: '1500 HP',
            acceleration: '2.4s 0-100 km/h',
            topSpeed: '420 km/h',
            transmission: '7-speed DCT',
            fuelType: 'Petrol'
        },
        features: [
            'Carbon Fiber Body',
            'Active Aerodynamics',
            'Adaptive Chassis',
            'Digital Dashboard',
            'Premium Sound System',
            'Climate Control',
            'Leather Interior',
            'Navigation System',
            'Bluetooth Connectivity',
            'Parking Sensors'
        ]
    },
    'Porsche 918 Spyder': {
        name: 'Porsche 918 Spyder',
        price: '₹1,80,000',
        reviews: 15,
        description: 'The Porsche 918 Spyder is a limited-production mid-engine plug-in hybrid sports car manufactured by German automobile manufacturer Porsche. The 918 Spyder is powered by a naturally aspirated 4.6-liter V8 engine that produces 608 horsepower, with two electric motors delivering an additional 279 horsepower for a combined output of 887 horsepower.',
        mainImage: '../images/porsche-918.jpg',
        gallery: [
            '../images/porsche-918.jpg',
            '../images/car3.jpg',
            '../images/ferrari-sf90.jpg',
            '../images/bugatti-chiron.jpg'
        ],
        specs: {
            engine: 'V8 + 2 Electric Motors',
            horsepower: '887 HP',
            acceleration: '2.6s 0-100 km/h',
            topSpeed: '345 km/h',
            transmission: '7-speed PDK',
            fuelType: 'Hybrid'
        },
        features: [
            'Hybrid Powertrain',
            'Carbon Fiber Reinforced Plastic Monocoque',
            'Active Aerodynamics',
            'Digital Dashboard',
            'Premium Sound System',
            'Climate Control',
            'Leather Interior',
            'Navigation System',
            'Bluetooth Connectivity',
            'Parking Sensors'
        ]
    },
    'Rolls-Royce Phantom': {
        name: 'Rolls-Royce Phantom',
        price: '₹1,20,000',
        reviews: 19,
        description: 'The Rolls-Royce Phantom is a full-sized luxury saloon manufactured by Rolls-Royce Motor Cars. It is the eighth and current generation of the Rolls-Royce Phantom, and the second launched by Rolls-Royce under BMW ownership. It is offered in two wheelbase lengths.',
        mainImage: '../images/rolls-royce-phantom.jpg',
        gallery: [
            '../images/rolls-royce-phantom.jpg',
            '../images/car3.jpg',
            '../images/ferrari-sf90.jpg',
            '../images/bugatti-chiron.jpg'
        ],
        specs: {
            engine: 'V12 Twin-Turbo',
            horsepower: '563 HP',
            acceleration: '5.1s 0-100 km/h',
            topSpeed: '250 km/h',
            transmission: '8-speed Automatic',
            fuelType: 'Petrol'
        },
        features: [
            'Starlight Headliner',
            'Bespoke Audio System',
            'Rear Theater Configuration',
            'Picnic Tables',
            'Premium Sound System',
            'Climate Control',
            'Leather Interior',
            'Navigation System',
            'Bluetooth Connectivity',
            'Parking Sensors'
        ]
    },
    'Bentley Continental GT': {
        name: 'Bentley Continental GT',
        price: '₹95,000',
        reviews: 22,
        description: 'The Bentley Continental GT is a grand tourer manufactured and marketed by British automaker Bentley Motors since 2003. It was the first car released by Bentley under Volkswagen AG management, after the company\'s acquisition in 1998, and the first Bentley to employ mass production manufacturing techniques.',
        mainImage: '../images/bentley-continental.jpg',
        gallery: [
            '../images/bentley-continental.jpg',
            '../images/car3.jpg',
            '../images/ferrari-sf90.jpg',
            '../images/bugatti-chiron.jpg'
        ],
        specs: {
            engine: 'W12 Twin-Turbo',
            horsepower: '626 HP',
            acceleration: '3.6s 0-100 km/h',
            topSpeed: '333 km/h',
            transmission: '8-speed Dual-Clutch',
            fuelType: 'Petrol'
        },
        features: [
            'Rotating Dashboard Display',
            'Naim Audio System',
            'Active All-Wheel Drive',
            'Air Suspension',
            'Premium Sound System',
            'Climate Control',
            'Leather Interior',
            'Navigation System',
            'Bluetooth Connectivity',
            'Parking Sensors'
        ]
    },
    'Mercedes-Maybach S-Class': {
        name: 'Mercedes-Maybach S-Class',
        price: '₹75,000',
        reviews: 26,
        description: 'The Mercedes-Maybach S-Class is an ultra-luxury version of the Mercedes-Benz S-Class produced by Mercedes-Benz since 2015. The Maybach S-Class is a stretched version of the S-Class that is focused on rear-seat luxury and comfort.',
        mainImage: '../images/mercedes-maybach.jpg',
        gallery: [
            '../images/mercedes-maybach.jpg',
            '../images/car3.jpg',
            '../images/ferrari-sf90.jpg',
            '../images/bugatti-chiron.jpg'
        ],
        specs: {
            engine: 'V8 Biturbo',
            horsepower: '496 HP',
            acceleration: '4.8s 0-100 km/h',
            topSpeed: '250 km/h',
            transmission: '9-speed Automatic',
            fuelType: 'Petrol'
        },
        features: [
            'Executive Rear Seats',
            'Burmester 4D Surround Sound',
            'MBUX Infotainment System',
            'Rear Seat Entertainment',
            'Premium Sound System',
            'Climate Control',
            'Leather Interior',
            'Navigation System',
            'Bluetooth Connectivity',
            'Parking Sensors'
        ]
    }
};

// Function to open modal with car details
function openCarDetailsModal(carName) {
    console.log("Opening modal for:", carName);
    
    // Get the modal element
    const modal = document.getElementById('carDetailsModal');
    if (!modal) {
        console.error("Modal element not found!");
        return;
    }

    // Show loading state
    document.getElementById('carName').textContent = 'Loading...';
    document.getElementById('carDescription').textContent = 'Loading car description...';
    document.getElementById('carPrice').textContent = 'Loading...';
    document.getElementById('reviewCount').textContent = '(Loading...)';
    
    // Show the modal immediately
    modal.style.display = 'flex';
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // First try to get data from predefined carData
    if (carData[carName]) {
        console.log("Using predefined data for:", carName);
        populateModalWithCarData(carData[carName]);
        // Ensure the first thumbnail is active
        const firstThumbnail = modal.querySelector('.thumbnail');
        if (firstThumbnail) {
            firstThumbnail.classList.add('active');
        }
    } else {
        // If no predefined data, try to get data from the vehicle card
        console.log("No predefined data, looking for vehicle card data");
        const vehicleCard = Array.from(document.querySelectorAll('.vehicle-card'))
            .find(card => card.querySelector('.vehicle-name h3')?.textContent === carName);
        
        if (vehicleCard) {
            console.log("Found vehicle card for:", carName);
            
            try {
                const price = vehicleCard.querySelector('.price')?.textContent || "Price on request";
                const specs = vehicleCard.querySelectorAll('.spec');
                const horsepower = specs[0]?.querySelector('span')?.textContent || "N/A";
                const acceleration = specs[1]?.querySelector('span')?.textContent || "N/A";
                const fuelType = specs[2]?.querySelector('span')?.textContent || "Petrol";
                const cardImage = vehicleCard.querySelector('img')?.src || "../images/car3.jpg";
                
                const fallbackCarData = {
                    name: carName,
                    price: price,
                    reviews: "N/A",
                    description: `The ${carName} is a premium luxury vehicle offering exceptional performance and comfort. Please contact our sales team for more detailed information about this exclusive model.`,
                    mainImage: cardImage,
                    gallery: [cardImage, "../images/car3.jpg", "../images/ferrari-sf90.jpg", "../images/bugatti-chiron.jpg"],
                    specs: {
                        engine: "Premium Engine",
                        horsepower: horsepower,
                        acceleration: acceleration,
                        topSpeed: "300+ km/h",
                        transmission: "Automatic",
                        fuelType: fuelType
                    },
                    features: [
                        'Premium Sound System',
                        'Climate Control',
                        'Leather Interior',
                        'Navigation System',
                        'Bluetooth Connectivity',
                        'Parking Sensors'
                    ]
                };
                
                populateModalWithCarData(fallbackCarData);
                // Ensure the first thumbnail is active
                const firstThumbnail = modal.querySelector('.thumbnail');
                if (firstThumbnail) {
                    firstThumbnail.classList.add('active');
                }
            } catch (e) {
                console.error("Error extracting data from card:", e);
                alert("Error loading car details. Please try again.");
            }
        } else {
            console.error("Vehicle card not found for:", carName);
            alert("Car details not available.");
        }
    }
}

// Helper function to populate modal with car data
function populateModalWithCarData(car) {
    console.log("Populating modal with data:", car);
    
    try {
        // Set car name
        const nameElement = document.getElementById('carName');
        if (nameElement) {
            nameElement.textContent = car.name;
            console.log("Set car name:", car.name);
        }
        
        // Set reviews
        const reviewElement = document.getElementById('reviewCount');
        if (reviewElement) {
            reviewElement.textContent = typeof car.reviews === 'number' ? `(${car.reviews} reviews)` : car.reviews;
            console.log("Set reviews:", car.reviews);
        }
        
        // Set price
        const priceElement = document.getElementById('carPrice');
        if (priceElement) {
            priceElement.textContent = car.price;
            console.log("Set price:", car.price);
        }
        
        // Set description
        const descriptionElement = document.getElementById('carDescription');
        if (descriptionElement) {
            descriptionElement.textContent = car.description;
            console.log("Set description");
        }
        
        // Set specifications
        const specs = {
            'engineSpec': car.specs.engine,
            'horsepowerSpec': car.specs.horsepower,
            'accelerationSpec': car.specs.acceleration,
            'topSpeedSpec': car.specs.topSpeed,
            'transmissionSpec': car.specs.transmission,
            'fuelTypeSpec': car.specs.fuelType
        };
        
        Object.entries(specs).forEach(([elementId, value]) => {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = value;
                console.log(`Set ${elementId}:`, value);
            }
        });
        
        // Set features
        const featuresList = document.getElementById('featuresList');
        if (featuresList && Array.isArray(car.features)) {
            featuresList.innerHTML = '';
            car.features.forEach(feature => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check"></i> ${feature}`;
                featuresList.appendChild(li);
            });
            console.log("Set features list");
        }
        
        // Set main image
        const mainImage = document.getElementById('carMainImage');
        if (mainImage) {
            mainImage.src = car.mainImage;
            mainImage.alt = car.name;
            console.log("Set main image");
        }
        
        // Set gallery thumbnails
        const thumbnails = document.querySelectorAll('.thumbnail');
        if (thumbnails.length > 0 && Array.isArray(car.gallery)) {
            thumbnails.forEach((thumbnail, index) => {
                if (index < car.gallery.length) {
                    const img = thumbnail.querySelector('img');
                    if (img) {
                        img.src = car.gallery[index];
                        img.alt = `${car.name} View ${index + 1}`;
                    }
                    thumbnail.dataset.src = car.gallery[index];
                    thumbnail.style.display = 'block';
                } else {
                    thumbnail.style.display = 'none';
                }
            });
            console.log("Set gallery thumbnails");
        }
        
        // Set data attributes for buttons
        const rentNowBtn = document.querySelector('.rent-now-btn');
        const buyNowBtn = document.querySelector('.buy-now-btn');
        
        if (rentNowBtn) rentNowBtn.setAttribute('data-vehicle-name', car.name);
        if (buyNowBtn) buyNowBtn.setAttribute('data-vehicle-name', car.name);
        
        console.log("Modal population completed successfully");
    } catch (e) {
        console.error("Error populating modal:", e);
        alert("There was an error displaying car details. Please try again.");
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    
    // Initialize car details modal
    initializeCarDetailsModal();
    
    // Initialize other functionality
    initializeFilters();
    initializeBookingModal();
    initializeFavorites();
    setupHeroVideo();
    initializeNotifications();
    
    // Initialize navbar if available
    if (typeof window.initNavbar === 'function') {
        window.initNavbar();
    }
});

function initializeFilters() {
    const vehicles = document.querySelectorAll('.vehicle-card');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const featureCheckboxes = document.querySelectorAll('.filter-checkboxes input[type="checkbox"]');
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    
    // Price range filter
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
            const value = e.target.value;
            priceValue.textContent = `₹${Number(value).toLocaleString('en-IN')}`;
        });
    }
    
    // Apply all filters
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            const selectedCategory = categoryFilter.value;
            const selectedBrand = brandFilter.value;
            const maxPrice = Number(priceRange.value);
            const selectedFeatures = Array.from(featureCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);
            
            vehicles.forEach(vehicle => {
                const vehicleCategory = vehicle.getAttribute('data-category');
                const vehicleBrand = vehicle.getAttribute('data-brand');
                const vehiclePriceText = vehicle.querySelector('.vehicle-price .price').textContent;
                const vehiclePrice = Number(vehiclePriceText.replace(/[^\d]/g, ''));
                
                const categoryMatch = selectedCategory === 'all' || vehicleCategory === selectedCategory;
                const brandMatch = selectedBrand === 'all' || vehicleBrand === selectedBrand;
                const priceMatch = vehiclePrice <= maxPrice;
                
                // Feature matching logic - if any features are selected, the vehicle should have at least one of them
                let featureMatch = true;
                if (selectedFeatures.length > 0) {
                    // This is a simplified approach - in a real app, you'd have feature data for each vehicle
                    // For now, we'll assume all vehicles match the selected features
                    featureMatch = true;
                }
                
                if (categoryMatch && brandMatch && priceMatch && featureMatch) {
                    vehicle.style.display = 'block';
                } else {
                    vehicle.style.display = 'none';
                }
            });
            
            // Check if any vehicles are visible after filtering
            const visibleVehicles = document.querySelectorAll('.vehicle-card[style="display: block;"]');
            if (visibleVehicles.length === 0) {
                showToast('No vehicles match your filter criteria. Try adjusting your filters.', 'warning');
            } else {
                showToast(`Showing ${visibleVehicles.length} vehicles that match your criteria.`, 'success');
            }
        });
    }
    
    // Reset filters button
    const resetBtn = document.createElement('button');
    resetBtn.className = 'reset-filters-btn';
    resetBtn.textContent = 'Reset Filters';
    resetBtn.style.marginLeft = '10px';
    
    // Insert reset button after apply button
    if (applyFiltersBtn) {
        applyFiltersBtn.parentNode.insertBefore(resetBtn, applyFiltersBtn.nextSibling);
        
        resetBtn.addEventListener('click', () => {
            // Reset all filters to default values
            categoryFilter.value = 'all';
            brandFilter.value = 'all';
            priceRange.value = priceRange.max;
            priceValue.textContent = `₹${Number(priceRange.max).toLocaleString('en-IN')}`;
            
            featureCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Show all vehicles
            vehicles.forEach(vehicle => {
                vehicle.style.display = 'block';
            });
            
            showToast('Filters have been reset.', 'info');
        });
    }
}

function initializeBookingModal() {
    const bookBtns = document.querySelectorAll('.book-now-btn');
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');
    
    bookBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle form submission
            alert('Booking submitted successfully!');
            modal.classList.remove('show');
        });
    }
}

function initializeFavorites() {
    const favoriteBtns = document.querySelectorAll('.action-btn:nth-child(2)');
    
    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                icon.classList.remove('fa-heart');
                icon.classList.add('fa-heart-broken');
                icon.style.color = 'var(--primary)';
            } else {
                icon.classList.remove('fa-heart-broken');
                icon.classList.add('fa-heart');
                icon.style.color = 'var(--light)';
            }
        });
    });
}

// Function to handle hero video setup
function setupHeroVideo() {
    const video = document.getElementById('heroVideo');
    
    if (video) {
        // Set video attributes directly
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('loop', '');
        video.muted = true; // Explicitly set muted property
        video.playsInline = true; // Add playsinline for mobile
        
        // Force video to be visible with inline style
        video.style.opacity = '1';
        video.style.display = 'block';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        
        // Add event listeners for video
        video.addEventListener('loadeddata', () => {
            console.log('Video loaded successfully');
            video.play().catch(e => console.log('Auto-play prevented after load'));
        });
        
        video.addEventListener('error', (e) => {
            console.error('Video error:', e);
            // Error loading video, switch to fallback background
            const videoBackground = document.querySelector('.video-background');
            if (videoBackground) {
                videoBackground.style.backgroundImage = 'url("../images/car3.jpg")';
                videoBackground.style.backgroundSize = 'cover';
                videoBackground.style.backgroundPosition = 'center';
            }
        });
        
        // Try to play immediately without creating a play button
        video.play().catch(error => {
            console.log('Auto-play prevented, using background image as fallback');
            const videoBackground = document.querySelector('.video-background');
            if (videoBackground) {
                videoBackground.style.backgroundImage = 'url("../images/car3.jpg")';
                videoBackground.style.backgroundSize = 'cover';
                videoBackground.style.backgroundPosition = 'center';
            }
        });
    }
}

// Function to handle notifications
function initializeNotifications() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    const rentButtons = document.querySelectorAll('.rent-btn');
    const notificationBadge = document.querySelector('.notification-badge');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    // Function to add a new notification
    function addNotification(action, vehicleName) {
        // Increment notification count
        let currentCount = parseInt(notificationBadge.textContent);
        notificationBadge.textContent = currentCount + 1;
        
        // Make notification badge visible and add pulse animation
        notificationBadge.style.display = 'flex';
        notificationBadge.classList.add('pulse');
        
        // Create new notification item
        const notificationItem = document.createElement('div');
        notificationItem.className = 'notification-item unread';
        
        // Set icon based on action
        const iconClass = action === 'buy' ? 'fa-shopping-cart' : 'fa-calendar-check';
        
        // Set message based on action
        const message = action === 'buy' 
            ? `${vehicleName} added to cart. Proceed to checkout?`
            : `Rental request for ${vehicleName} initiated. Complete booking?`;
        
        // Create notification content
        notificationItem.innerHTML = `
            <div class="notification-icon"><i class="fas ${iconClass}"></i></div>
            <div class="notification-content">
                <p>${message}</p>
                <span class="notification-time">Just now</span>
            </div>
        `;
        
        // Insert at the top of the notification list
        const firstNotification = notificationDropdown.querySelector('.notification-item');
        if (firstNotification) {
            notificationDropdown.insertBefore(notificationItem, firstNotification);
        } else {
            // If no notifications exist yet, append after the header
            const header = notificationDropdown.querySelector('.notification-header');
            if (header) {
                header.after(notificationItem);
            }
        }
        
        // Remove pulse animation after a delay
        setTimeout(() => {
            notificationBadge.classList.remove('pulse');
        }, 2000);
    }
    
    // Add event listeners to Buy buttons
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const vehicleName = button.getAttribute('data-vehicle-name');
            addNotification('buy', vehicleName);
            
            // Show confirmation toast
            showToast(`${vehicleName} added to cart`, 'success');
        });
    });
    
    // Add event listeners to Rent buttons
    rentButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const vehicleName = button.getAttribute('data-vehicle-name');
            addNotification('rent', vehicleName);
            
            // Show confirmation toast
            showToast(`Rental request initiated for ${vehicleName}`, 'success');
        });
    });
    
    // Add functionality to "Mark all as read" button
    const markAllReadBtn = document.querySelector('.notification-header a');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove unread class from all notifications
            const unreadNotifications = document.querySelectorAll('.notification-item.unread');
            unreadNotifications.forEach(notification => {
                notification.classList.remove('unread');
            });
            
            // Reset notification count
            notificationBadge.textContent = '0';
            notificationBadge.style.display = 'none';
        });
    }
}

// Function to show toast notifications
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
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Show toast with animation
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
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 5000);
}

// Add this function to initialize the car details modal
function initializeCarDetailsModal() {
    console.log("Initializing car details modal");
    
    // Get all the detail buttons
    const detailsBtns = document.querySelectorAll('.details-btn');
    console.log(`Found ${detailsBtns.length} detail buttons`);
    
    // Get the modal element
    const modal = document.getElementById('carDetailsModal');
    if (!modal) {
        console.error("Modal element not found!");
        return;
    }
    
    // Add click event to all detail buttons
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log("Details button clicked");
            e.preventDefault();
            e.stopPropagation();
            
            // Get car name from the closest vehicle card
            const vehicleCard = btn.closest('.vehicle-card');
            if (vehicleCard) {
                const nameElement = vehicleCard.querySelector('.vehicle-name h3');
                if (nameElement) {
                    const vehicleName = nameElement.textContent;
                    console.log("Opening details for:", vehicleName);
                    openCarDetailsModal(vehicleName);
                }
            }
        });
    });
    
    // Setup thumbnail gallery functionality
    const thumbnails = modal.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('carMainImage');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const src = thumbnail.dataset.src;
            if (src && mainImage) {
                thumbnails.forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
                mainImage.src = src;
            }
        });
    });
    
    // Setup close button functionality
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Setup action buttons
    const rentNowBtn = modal.querySelector('.rent-now-btn');
    const buyNowBtn = modal.querySelector('.buy-now-btn');
    
    if (rentNowBtn) {
        rentNowBtn.addEventListener('click', () => {
            const vehicleName = rentNowBtn.getAttribute('data-vehicle-name');
            if (vehicleName) {
                addNotification('rent', vehicleName);
                showToast(`Rental request initiated for ${vehicleName}`, 'success');
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const vehicleName = buyNowBtn.getAttribute('data-vehicle-name');
            if (vehicleName) {
                addNotification('buy', vehicleName);
                showToast(`${vehicleName} added to cart`, 'success');
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
}

// Function to open the new car details modal
function openNewCarModal(carName) {
    console.log("Opening new modal for:", carName);
    
    const modal = document.getElementById('newCarModal');
    if (!modal) {
        console.error("New modal not found!");
        return;
    }

    // Get car data
    const car = carData[carName];
    if (!car) {
        console.error("Car data not found for:", carName);
        return;
    }

    // Set modal content
    document.getElementById('newCarName').textContent = car.name;
    document.getElementById('newPrice').textContent = car.price;
    document.getElementById('newReviewCount').textContent = `(${car.reviews} reviews)`;
    document.getElementById('newDescription').textContent = car.description;
    
    // Set specifications
    document.getElementById('newEngineSpec').textContent = car.specs.engine;
    document.getElementById('newHorsepowerSpec').textContent = car.specs.horsepower;
    document.getElementById('newAccelerationSpec').textContent = car.specs.acceleration;
    document.getElementById('newTopSpeedSpec').textContent = car.specs.topSpeed;

    // Set main image
    const mainImage = document.getElementById('newMainImage');
    mainImage.src = car.mainImage;
    mainImage.alt = car.name;

    // Set thumbnails
    const thumbnails = document.querySelectorAll('.new-thumb');
    thumbnails.forEach((thumb, index) => {
        if (index < car.gallery.length) {
            thumb.src = car.gallery[index];
            thumb.alt = `${car.name} View ${index + 1}`;
            thumb.style.display = 'block';
        } else {
            thumb.style.display = 'none';
        }
    });

    // Set features
    const featuresList = document.getElementById('newFeaturesList');
    featuresList.innerHTML = car.features
        .map(feature => `<li><i class="fas fa-check"></i>${feature}</li>`)
        .join('');

    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Initialize new car modal functionality
function initializeNewCarModal() {
    const modal = document.getElementById('newCarModal');
    const closeBtn = modal.querySelector('.new-close-btn');
    const thumbnails = modal.querySelectorAll('.new-thumb');
    const mainImage = document.getElementById('newMainImage');
    const rentBtn = modal.querySelector('.new-rent-btn');
    const buyBtn = modal.querySelector('.new-buy-btn');

    // Setup close button
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Setup thumbnails
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImage.src = thumb.src;
        });
    });

    // Setup action buttons
    rentBtn.addEventListener('click', () => {
        const carName = document.getElementById('newCarName').textContent;
        showToast(`Rental request initiated for ${carName}`, 'success');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });

    buyBtn.addEventListener('click', () => {
        const carName = document.getElementById('newCarName').textContent;
        showToast(`${carName} added to cart`, 'success');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });
}

// Update the click handlers for detail buttons
document.addEventListener('DOMContentLoaded', () => {
    const detailBtns = document.querySelectorAll('.details-btn');
    
    detailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const vehicleCard = btn.closest('.vehicle-card');
            const nameElement = vehicleCard.querySelector('.vehicle-name h3');
            if (nameElement) {
                openNewCarModal(nameElement.textContent);
            }
        });
    });

    // Initialize the new modal
    initializeNewCarModal();
}); 