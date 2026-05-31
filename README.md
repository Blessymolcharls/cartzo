# Cartzo – MERN Stack E-Commerce Platform

![Cartzo Banner](./assets/banner.png)

![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)
![Express](https://img.shields.io/badge/Express.js-Backend-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## Overview
A modern full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform provides a seamless shopping experience for customers and a powerful admin dashboard for managing products and inventory.

## Key Highlights
- Full-stack MERN architecture with scalable API design
- JWT-based authentication and role-protected admin routes
- Admin dashboard for product and inventory management
- Responsive, modern UI with dark/light theme support

## Features

### Customer Features
- User Registration & Login
- JWT Authentication
- Browse Products
- Product Search & Filtering
- Product Categories
- Product Details Page
- Add to Cart
- Cart Management
- Responsive Design
- Dark/Light Theme Support
- Toast Notifications

### Admin Features
- Secure Admin Login
- Dashboard Analytics
- Add Products
- Edit Products
- Delete Products
- Inventory Management
- Product Image Upload
- Order Monitoring
- User Management
- Protected Admin Routes

## Tech Stack

### Frontend
- React.js
- React Router
- Context API / Redux
- Axios
- Tailwind CSS / CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js

## Project Structure

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   └── assets/
│
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
└── server.js

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

### Environment Variables

Create a .env file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Run Application

Backend:
```bash
npm run server
```

Frontend:
```bash
npm start
```

## Future Enhancements
- Payment Gateway Integration (Stripe/Razorpay)
- Wishlist Functionality
- Product Reviews & Ratings
- Order Tracking
- AI Product Recommendations
- Email Notifications
- Sales Analytics Dashboard

## Screenshots
Add screenshots of:
- Home Page
- Product Listing
- Product Details
- Cart Page
- Login Page
- Admin Dashboard



