# Cartify - E-commerce Web App

Cartify is a full-stack e-commerce web application built with the **PERN Stack** (PostgreSQL, Express.js, React.js, Node.js). The app features a seamless shopping experience with user authentication, search functionalities, product browsing and cart management.

---

## Table of Contents  
1. [Introduction](#introduction)
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Prerequisites](#prerequisites)
5. [Installation](#installation) 
6. [Database Setup](#database-setup)   
7. [Scripts](#scripts)  
8. [Project Structure](#project-structure)
9. [Contributing](#contributing)
10. [Acknowledgements](#acknowledgments)

---
## Introduction  

Cartiy is a full-stack e-commerce application built using the PERN stack (PostgreSQL, Express.js, React.js, Node.js). This project focuses on implementing CRUD operations to manage products, users, and orders efficiently. It leverages React.js for building dynamic and responsive user interfaces while utilizing state management with hooks to ensure a seamless user experience. On the backend, the application is powered by Express.js and Node.js, with PostgreSQL handling data storage and retrieval. Security is a key aspect, with JWT-based authentication ensuring secure user sessions. Cartiy demonstrates the integration of frontend and backend technologies to build a scalable and robust web application.

## Features

### Client-Side
- **Product Browsing**: Shop page to explore available products.
- **Search Functionality**: Search bar for quick product lookups.
- **JWT Authentication**: Secure login and signup with JSON Web Tokens.
- **User Profile Management**: Manage account details and address book.
- **Shopping Cart**: Add, update, and remove items in the cart.
- **Private Routes**: Secure routes for authenticated users only.
- **Responsive Design**: Mobile-first design with an intuitive user interface.

### Server-Side
- **RESTful API**: APIs for authentication, product, and cart management.
- **Database Integration**: PostgreSQL database for data storage.
- **Middleware**: Validation and token-based authentication.
- **Modular Codebase**: Organized into controllers, routes, and middleware for scalability.

---

## Tech Stack  

### Frontend  
- **React.js**: For building dynamic user interfaces.  
- **CSS**: For responsive styling.  

### Backend  
- **Node.js**: JavaScript runtime environment.  
- **Express.js**: Framework for building RESTful APIs.  

### Database  
- **PostgreSQL**: Relational database for storing application data.  

### Tools & Libraries  
- **JWT**: For secure authentication.  
- **Bcrypt.js**: For password hashing.  
- **Axios**: For making HTTP requests.  
- **dotenv**: For environment variable management.  

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**
- **npm** (Node package manager)
- **PostgreSQL** 
- **Git**
---
## Installation

### Clone the Repository
```bash
git clone https://github.com/routh-vishal/cartify-app.git
cd cartify-app
```

### Client Setup
1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   - Rename `.env.example` to `.env`.

### Server Setup
1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables:
   - Rename `.env.example` to `.env`.
   - Add your database credentials and secret keys.

---

## Database Setup

1. **Create a PostgreSQL database**:
   ```bash
   createdb -U your_username cartify_db
   ```

2. **Set up the database schema**:
   - Use the provided SQL scripts to create the necessary tables and relationships in your database.
     ```bash
     psql -U your_username -d cartify_db -f schema.sql
     ```
3. Set up the environment variables:
   - Rename `.env.example` to `.env`.
   - Fill in your database and other environment variables.
---
## Scripts
1. **Start the server**:
   ```bash
   cd server
   ```

   ```bash
   node index.js
   ```
2. **Run the React Application**
   ```bash
   cd client
   ```

   ```bash
   npm start
   ```
3. Visit `http://localhost:3000` to access the client.
4. The server will run at `http://localhost:5000`.
5. Sign up or log in to explore the application.

---

## Project Structure
```
cartify-app/
├── client/                    # Frontend application
│   ├── node_modules/          # Node.js dependencies for the client
│   ├── public/                # Public assets (e.g., index.html, static files)
│   ├── src/                   # Source code for the client
│       ├── assets/            # Images, SVGs, and other static assets
│       ├── components/        # Reusable React components
│       │   ├── auth/          # Authentication-related components
│       │   ├── Footer/        # Footer section components
│       │   ├── Header/        # Header and navigation components
│       │   ├── home/          # Components for the homepage
│       ├── pages/             # Page components
│       │   ├── Admin/         # User dashboard components
│       │   ├── Shop/          # Shop and product-related components
│       │   ├── About.jsx      # About page
│       │   ├── Contact.jsx    # Contact page
│       │   ├── ItemDetail.jsx # Product details page
│       │   ├── Logo.jsx       # Logo component
│       │   ├── NotFound.jsx   # 404 Not Found page
│       │   ├── pages.css      # Styles for pages
│       ├── App.jsx            # Main application component
│       ├── index.js           # Application entry point
│   ├── .env.example           # Environment variable example file
│   ├── .gitignore             # Git ignore rules for client
│   ├── package-lock.json      # Dependency lock file
│   ├── package.json           # Client dependencies and scripts
├── server/                    # Backend application
│   ├── config/                # Configuration files (e.g., database setup)
│   │   ├── db.js              # Database connection setup
│   ├── controllers/           # Controllers for handling API logic
│   │   ├── authController.js  # Authentication logic
│   │   ├── cartController.js  # Cart management logic
│   │   ├── itemController.js  # Product management logic
│   │   ├── userController.js  # User management logic
│   ├── middleware/            # Custom middleware functions
│   │   ├── validation.js      # Input validation logic
│   │   ├── verification.js    # JWT token verification logic
│   ├── routes/                # API routes
│   │   ├── authRoutes.js      # Authentication routes
│   │   ├── products.js        # Product routes
│   │   ├── userRoutes.js      # User-related routes
│   ├── .env.example           # Environment variable example file
│   ├── .gitignore             # Git ignore rules for server
│   ├── index.js               # Server entry point
│   ├── package-lock.json      # Dependency lock file
│   ├── package.json           # Server dependencies and scripts
├── README.md                  # Project documentation
```  


---

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-name`).
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.


---

## Acknowledgments
- React.js for the frontend.
- Node.js and Express.js for the backend.
- PostgreSQL for the database.
- Open-source community for the libraries and resources.
