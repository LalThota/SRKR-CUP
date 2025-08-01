# College Portal Backend

This is the backend for the SRKR College Portal application, providing API endpoints for various features including user authentication, marketplace, lost and found, notes sharing, and more.

## Features

- User authentication with OTP verification
- Admin dashboard and management
- Marketplace for buying and selling items
- Lost and found item reporting and claiming
- Notes sharing and management
- Notification system

## Tech Stack

- Node.js
- Express.js
- MongoDB (Database)
- JWT for authentication

## Project Structure

```
├── config/             # Database and other configuration
├── controllers/        # Request handlers
├── middleware/         # Custom middleware
├── models/             # Database models
├── public/             # Static files (HTML, CSS, JS)
├── routes/             # API routes
├── uploads/            # File uploads
├── utils/              # Utility functions
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies
├── server.js           # Entry point
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```
4. Start the server:
   ```
   npm start
   ```

## API Endpoints

- `/api/auth` - Authentication routes
- `/api/admin` - Admin routes
- `/api/user` - User routes
- `/api/marketplace` - Marketplace routes
- `/api/lostfound` - Lost and found routes
- `/api/notes` - Notes sharing routes
- `/api/notifications` - Notification routes

## License

This project is licensed under the MIT License.