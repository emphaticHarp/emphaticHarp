// Authentication check function
function checkAuth() {
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
    if (!adminUser.id || !adminUser.email) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Run auth check immediately
if (!checkAuth()) {
    throw new Error('Not authenticated');
}

// Function to fetch and display vehicle count
async function updateVehicleCount() {
    try {
        const { data, error } = await window.supabase
            .from('vehicles')
            .select('id', { count: 'exact' });

        if (error) {
            console.error('Error fetching vehicle count:', error);
            document.getElementById('vehicleCount').innerHTML = '<span style="color: #ff4444;">Error</span>';
            return;
        }

        const count = data.length;
        document.getElementById('vehicleCount').textContent = count;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('vehicleCount').innerHTML = '<span style="color: #ff4444;">Error</span>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) return;
    
    // Display user name
    const adminUser = JSON.parse(localStorage.getItem('adminUser'));
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = adminUser.name || adminUser.email;
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('adminUser');
            window.location.href = 'login.html';
        });
    }

    // Update vehicle count
    updateVehicleCount();

    // Add active class to current nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Initialize user growth chart
    const ctx = document.getElementById('userGrowthChart').getContext('2d');
    const userGrowthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'New Users',
                data: [12, 19, 15, 28, 25, 32, 40, 45, 56, 68, 76, 85],
                backgroundColor: 'rgba(196, 30, 58, 0.1)',
                borderColor: '#C41E3A',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#C41E3A',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // Graph filter functionality
    const graphFilters = document.querySelectorAll('.graph-filter');
    graphFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            graphFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Simulate data change based on filter
            let newData;
            if (this.textContent === 'Week') {
                newData = [5, 8, 12, 15, 10, 7, 9];
                userGrowthChart.data.labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            } else if (this.textContent === 'Month') {
                newData = [12, 19, 15, 28, 25, 32, 40, 45, 56, 68, 76, 85, 92, 88, 95, 102, 110, 115, 108, 120, 125, 118, 130, 135, 142, 148, 155, 160, 165, 170];
                userGrowthChart.data.labels = Array.from({length: 30}, (_, i) => i + 1);
            } else {
                newData = [12, 19, 15, 28, 25, 32, 40, 45, 56, 68, 76, 85];
                userGrowthChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            }
            
            userGrowthChart.data.datasets[0].data = newData;
            userGrowthChart.update();
        });
    });
});
