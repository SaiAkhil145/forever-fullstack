# Forever - Full Stack E-Commerce Platform

A modern, full-featured e-commerce platform built using the MERN stack (MongoDB, Express.js, React, Node.js) with a responsive design and comprehensive admin panel.

🔗 **Live Demo**: [forever-fullstack-nu.vercel.app](https://forever-fullstack-nu.vercel.app)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Forever is a complete e-commerce solution that provides customers with an intuitive shopping experience while giving administrators powerful tools to manage products, orders, and users. The application features a clean, modern interface and robust backend functionality.

## ✨ Features

### Customer Features
- 🛍️ Browse and search products with advanced filtering
- 🔐 User authentication (Login/Register)
- 🛒 Shopping cart functionality
- 💳 Secure checkout process with order summary
- 📱 Fully responsive design for mobile and desktop
- 🔍 Product search, filter, and sorting options
- 👤 User profile and order history
- ⭐ Product reviews and ratings

### Admin Features
- 📊 Comprehensive dashboard for business insights
- ➕ Add, edit, and delete products
- 📦 Order management with status tracking
- 👥 User management
- 📈 Sales analytics and reporting
- 🖼️ Image upload and management via Cloudinary
- 📋 Inventory management

### Backend Features
- 🔒 Secure authentication using JWT
- 🗄️ RESTful API architecture
- 💾 MongoDB database integration
- ☁️ Cloud-based image storage (Cloudinary)
- 🔐 Password encryption and security
- 🚀 Optimized performance and scalability

## 🛠️ Tech Stack

### Frontend (Client)
- **React** - UI library for building interactive interfaces
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Router** - Navigation and routing
- **Axios** - HTTP client for API requests
- **Context API** - State management

### Admin Panel
- **React** - Admin dashboard interface
- **Tailwind CSS** - Consistent styling with the main app
- **Chart.js/Recharts** - Data visualization (optional)

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image hosting and management
- **Multer** - File upload handling

### Deployment
- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Database hosting
- **Cloudinary** - Media management

## 📁 Project Structure

```
forever-fullstack/
│
├── client/                 # Customer-facing frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context API for state management
│   │   ├── assets/        # Images, icons, etc.
│   │   └── App.jsx        # Main app component
│   └── package.json
│
├── admin/                  # Admin panel
│   ├── public/
│   ├── src/
│   │   ├── components/    # Admin UI components
│   │   ├── pages/         # Admin pages
│   │   ├── assets/        # Admin assets
│   │   └── App.jsx
│   └── package.json
│
├── backend/               # Backend API server
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── server.js         # Entry point
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary account** (for image uploads)

## 🔐 Environment Variables

You'll need to create `.env` files in the following directories:

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
```

### Client (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Admin (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📥 Installation

1. **Clone the repository**
```bash
git clone https://github.com/SaiAkhil145/forever-fullstack.git
cd forever-fullstack
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Client Dependencies**
```bash
cd ../client
npm install
```

4. **Install Admin Dependencies**
```bash
cd ../admin
npm install
```

## ▶️ Running the Application

### Development Mode

1. **Start the Backend Server**
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

2. **Start the Client Application**
```bash
cd client
npm start
# Client will run on http://localhost:3000
```

3. **Start the Admin Panel**
```bash
cd admin
npm start
# Admin panel will run on http://localhost:3001
```

### Production Build

1. **Build the Client**
```bash
cd client
npm run build
```

2. **Build the Admin Panel**
```bash
cd admin
npm run build
```

3. **Start the Backend**
```bash
cd backend
npm start
```

## 📡 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Order Endpoints
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (Admin)

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (Admin)

## 📸 Screenshots

*(Add screenshots of your application here)*

- Landing Page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e1d00e3b-03cc-4f06-95ff-71ef9b3c49a0" />

- Product Listing
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b5511bdb-281f-45b9-84c8-1aba85f3e5e4" />

- Product Details
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/36581ff8-cc8e-4cdc-b043-351b79e97667" />

- Shopping Cart
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2bc9dc31-2b91-4187-965e-4608c2a80c8d" />

- Checkout Page
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/9ab5482e-fe5c-4fe8-8c22-24b7aeb350df" />

-About Page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6fbd90c6-8b64-4712-88d8-b63db56fb69b" />

-Contact Page
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/df1e56f0-e95b-4124-af59-10f22649c3bd" />

- Admin (Add Product)
  <img width="1892" height="922" alt="image" src="https://github.com/user-attachments/assets/e010d133-98a4-446a-bb96-4fcbeae36399" />

- Product Management
  <img width="1893" height="917" alt="image" src="https://github.com/user-attachments/assets/8e8ef2b9-1234-4bfc-abd7-5670b62eea4e" />

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sai Akhil**
- GitHub: [@SaiAkhil145](https://github.com/SaiAkhil145)

## 🙏 Acknowledgments

- MongoDB for the database solution
- Cloudinary for image hosting
- Vercel for deployment
- All contributors and supporters

## 📞 Support

For support, email your-email@example.com or create an issue in the GitHub repository.

---

⭐ **Star this repository if you find it helpful!**
