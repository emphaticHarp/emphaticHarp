# Elite Hub: Car Rental Website

A comprehensive Car Rental Management System with fleet management, user authentication, and admin dashboard.

## Author

**Soumyajyoti Banik**
- LinkedIn: [Soumyajyoti Banik](https://www.linkedin.com/in/soumyajyoti-banik-b9a345313)
- Email: soumyajyotibanik07@gmail.com

## Features

- **User Interface**
  - Vehicle browsing and booking
  - User registration and authentication
  - OAuth integration
  - Booking management
  - Profile management

- **Admin Dashboard**
  - Fleet management
  - Vehicle tracking
  - Booking management
  - User management
  - Analytics and reporting

## Tech Stack

- **Frontend**: 
  - HTML5
  - CSS3
  - JavaScript
  - Bootstrap Icons
  - Swiper.js

- **Backend**: 
  - PHP
  - MySQL

## Project Structure

```
elite-hub/
├── admin/
│   ├── js/          # Admin JavaScript files
│   ├── css/         # Admin stylesheets
│   ├── dashboard.html
│   ├── vehicles.html
│   └── login.html
├── dashboard/
│   ├── fleet.js     # Fleet management
│   ├── fleet.html
│   ├── dashboard.html
│   ├── dashboard.css
│   ├── dashboard.js
│   └── fleet.css
├── images/          # Assets
├── oauth-callback.html
├── register.js
├── script.js
├── index.html
├── register.html
├── styles.css
├── register-styles.css
└── common.css
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/emphaticHarp/Elite-Hub.git
```

2. Set up the database:
   - Import the provided SQL file
   - Configure database connection in the admin panel

3. Configure OAuth:
   - Set up OAuth credentials
   - Update callback URLs

4. Set up local server:
   - Use XAMPP, WAMP, or any PHP-compatible server
   - Place the project in the server's root directory

## Environment Variables

Create a `.env` file with the following variables:
```
# OAuth Credentials
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here

# API Keys
HUGGING_FACE_API_TOKEN=your_hugging_face_api_token_here
```

## Usage

1. **Customer Access**
   - Browse available vehicles
   - Register/Login
   - Make bookings
   - Manage profile
   - View booking history

2. **Admin Access**
   - Manage fleet
   - Track vehicles
   - Handle bookings
   - Manage users
   - View analytics

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License.

## Contact

Soumyajyoti Banik - [GitHub Profile](https://github.com/emphaticHarp) 