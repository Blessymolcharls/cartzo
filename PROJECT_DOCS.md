# 📦 Cartzo — Full Technical Documentation

> A complete reference for every file, component, function, and module in the Cartzo e-commerce application.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [Tech Stack](#3-tech-stack)
4. [Environment Variables](#4-environment-variables)
5. [Backend — Deep Dive](#5-backend--deep-dive)
   - [Entry Point — server.js](#51-entry-point--serverjs)
   - [Database Config — config/db.js](#52-database-config--configdbjs)
   - [Models](#53-models)
   - [Controllers](#54-controllers)
   - [Routes](#55-routes)
   - [Middlewares](#56-middlewares)
   - [Utilities](#57-utilities)
   - [Seeders](#58-seeders)
6. [Frontend — Deep Dive](#6-frontend--deep-dive)
   - [Entry Point — index.js & App.jsx](#61-entry-point--indexjs--appjsx)
   - [Context (Global State)](#62-context-global-state)
   - [Pages](#63-pages)
   - [Components](#64-components)
   - [Services (API Layer)](#65-services-api-layer)
   - [Custom Hooks](#66-custom-hooks)
   - [Utilities](#67-utilities)
7. [API Reference](#7-api-reference)
8. [Data Flow Diagrams](#8-data-flow-diagrams)

---

## 1. Project Overview

**Cartzo** is a full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). It supports:

- User registration, login, and profile management
- Product browsing with search, filter, and pagination
- Shopping cart with live animations
- Address management and checkout flow
- Razorpay payment gateway integration
- Admin panel for managing products and viewing orders
- Auto-seeding of products on first startup

---

## 2. Project Structure

```
cartzo/
├── backend/                  # Node.js + Express REST API
│   ├── config/
│   │   └── db.js             # MongoDB connection helper
│   ├── controllers/          # Business logic functions
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── middlewares/          # Express middleware
│   │   ├── adminMiddleware.js
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/               # Mongoose schemas/models
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── activity.js
│   ├── routes/               # Express route definitions
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── productRoutes.js
│   │   └── uploadRoutes.js
│   ├── seeder/               # Sample product data
│   │   └── products.js
│   ├── utils/
│   │   └── generateToken.js  # JWT token generator
│   ├── seedAdmin.js          # Script to create admin user
│   ├── server.js             # App entry point
│   ├── .env                  # Secret environment variables (not committed)
│   └── .env.example          # Template for env vars
│
└── frontend/                 # React single-page application
    └── src/
        ├── App.jsx           # Root component with all routes
        ├── index.js          # ReactDOM render entry point
        ├── context/          # React Context (global state)
        │   ├── AuthContext.jsx
        │   ├── CartContext.jsx
        │   ├── NotificationContext.jsx
        │   └── OrderContext.jsx
        ├── pages/            # Full page views
        │   ├── LandingPage.jsx
        │   ├── Home.jsx
        │   ├── NotFound.jsx
        │   ├── Auth/         # Login, Register, Profile
        │   ├── Products/     # ProductList, ProductDetail
        │   ├── Cart/         # Cart page
        │   ├── Checkout/     # Checkout, OrderConfirmation
        │   ├── Orders/       # OrderList, OrderDetail
        │   └── Admin/        # Admin dashboard, product management
        ├── components/       # Reusable UI components
        │   ├── Admin/        # Admin-specific UI
        │   ├── Auth/         # Auth forms, guards
        │   ├── Cart/         # Cart items, summary
        │   ├── Checkout/     # Checkout steps
        │   ├── Common/       # Shared UI (Navbar, Footer, Loading, etc.)
        │   ├── Layout/       # Page layout wrappers
        │   └── Product/      # Product cards and filters
        ├── services/         # Axios API calls to backend
        │   ├── apiService.js
        │   ├── authService.js
        │   ├── cartService.js
        │   ├── orderService.js
        │   ├── paymentService.js
        │   └── productService.js
        ├── hooks/            # Custom React hooks
        │   ├── useAuth.js
        │   ├── useCart.js
        │   └── useFetch.js
        └── utils/            # Helper functions & constants
            ├── animations.js
            ├── constants.js
            ├── formatters.js
            ├── priceCalculator.js
            ├── sampleData.js
            └── validators.js
```

---

## 3. Tech Stack

### Backend

| Package | Version | Purpose |
|---|---|---|
| `express` | ^5.2.1 | Web framework for building the REST API |
| `mongoose` | ^9.6.3 | MongoDB ODM — schema definition and querying |
| `jsonwebtoken` | ^9.0.3 | Signing and verifying JWT auth tokens |
| `bcryptjs` | ^3.0.3 | Hashing user passwords securely |
| `dotenv` | ^17.4.2 | Loading environment variables from `.env` |
| `cors` | ^2.8.6 | Allowing cross-origin requests from the frontend |
| `multer` | ^2.1.1 | Handling multipart/form-data for image uploads |
| `razorpay` | ^2.9.6 | Creating and verifying Razorpay payment orders |
| `express-async-handler` | ^1.2.0 | Wrapping async route handlers to catch errors |
| `nodemon` | ^3.1.14 | Auto-restarting the server during development |

### Frontend

| Package | Purpose |
|---|---|
| `react` | Core UI library |
| `react-dom` | Rendering React to the browser DOM |
| `react-router-dom` | Client-side routing and navigation |
| `axios` | HTTP requests to the backend API |
| `react-scripts` | CRA build toolchain (webpack, Babel, etc.) |

---

## 4. Environment Variables

### Backend — `backend/.env`

```env
NODE_ENV=development          # 'development' or 'production'
PORT=5000                     # Port the Express server listens on
MONGO_URI=mongodb://127.0.0.1:27017/cartzo   # MongoDB connection string
JWT_SECRET=your_secret_key    # Secret key used to sign JWT tokens
RAZORPAY_KEY_ID=rzp_test_xxx  # Razorpay API Key ID (from dashboard)
RAZORPAY_KEY_SECRET=xxx       # Razorpay API Key Secret (from dashboard)
```

### Frontend — `frontend/.env` (optional)

```env
REACT_APP_API_URL=http://localhost:5000/api    # Base URL for API calls
REACT_APP_RAZORPAY_KEY=rzp_test_xxx           # Public Razorpay key for checkout UI
```

> **⚠️ Important:** Never commit `.env` to Git. Only commit `.env.example` which has keys but no values.

---

## 5. Backend — Deep Dive

### 5.1 Entry Point — `server.js`

The main entry point for the Express application. It:

1. Imports all dependencies (express, mongoose, cors, dotenv, etc.)
2. Calls `dotenv.config()` to load `.env` variables
3. Sets DNS servers to `8.8.8.8` (Google) to fix potential DNS resolution issues in some environments
4. Creates the Express app and applies `express.json()` and `cors()` middleware globally
5. Connects to MongoDB using `MONGO_URI`
6. On first connection, checks if any products exist — if not, auto-seeds 20 products from `seeder/products.js`
7. Mounts all route modules under their respective paths
8. Serves the `uploads/` folder as static files (for product images)
9. Registers `notFound` and `errorHandler` middleware at the end
10. Starts listening on `PORT` (default: 5000)

**Key Routes Mounted:**
| Path | Module |
|---|---|
| `/api/auth` | authRoutes |
| `/api/products` | productRoutes |
| `/api/cart` | cartRoutes |
| `/api/orders` | orderRoutes |
| `/api/upload` | uploadRoutes |
| `/api/payment` | paymentRoutes |

---

### 5.2 Database Config — `config/db.js`

```js
connectDB()
```
An async function that connects to MongoDB using `mongoose.connect()`. If the connection fails, it logs the error and calls `process.exit(1)` to stop the server. This module is available as a helper but the main connection is handled directly in `server.js`.

---

### 5.3 Models

Mongoose models define the shape of documents stored in MongoDB collections.

#### `models/User.js`

Represents a registered user in the system.

**Fields:**
| Field | Type | Description |
|---|---|---|
| `name` | String | Full name of the user |
| `email` | String | Unique email address (used for login) |
| `password` | String | Bcrypt-hashed password |
| `isAdmin` | Boolean | `true` for admin users, `false` for regular users |
| `addresses` | Array | Array of saved shipping addresses |
| `createdAt` / `updatedAt` | Date | Auto-managed timestamps |

**Embedded Schema — `addressSchema`:**
Each address has: `street`, `city`, `state`, `zipCode`, `country`, `isDefault`

**Instance Methods:**
- `matchPassword(enteredPassword)` — Compares a plain text password against the stored bcrypt hash. Returns `true` if they match.

**Pre-save Hook:**
Before saving a user document, if the `password` field was modified, it automatically hashes it using `bcrypt.genSalt(10)` and `bcrypt.hash()`.

---

#### `models/Product.js`

Represents a product in the store.

**Fields:**
| Field | Type | Description |
|---|---|---|
| `name` | String | Product display name |
| `slug` | String | URL-friendly unique identifier (e.g., `nike-air-max`) |
| `description` | String | Product description |
| `category` | String | Top-level category (e.g., "Electronics") |
| `subcategory` | String | Sub-category (optional) |
| `brand` | String | Brand name |
| `price` | Number | Current selling price |
| `originalPrice` | Number | Original price before discount |
| `discountPercentage` | Number | Discount % shown on card |
| `stock` | Number | Available units in inventory |
| `rating` | Number | Average rating (0–5) |
| `numReviews` | Number | Total number of reviews |
| `image` | String | Main image URL |
| `gallery` | Array | Additional image URLs |
| `featured` | Boolean | Shown in "Featured" section on homepage |
| `bestseller` | Boolean | Shown in "Bestsellers" section |
| `newArrival` | Boolean | Shown in "New Arrivals" section |
| `specifications` | Map | Key-value pairs (e.g., `{RAM: "16GB"}`) |
| `tags` | Array | Searchable tags |

---

#### `models/Order.js`

Represents a placed order.

**Fields:**
| Field | Type | Description |
|---|---|---|
| `user` | ObjectId (ref: User) | The user who placed the order |
| `orderItems` | Array | List of ordered products (embedded) |
| `shippingAddress` | Object | Delivery address (street, city, state, zipCode, country) |
| `totalPrice` | Number | Final amount charged |
| `orderStatus` | String | Enum: `Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled` |

**Embedded `orderItemSchema`:**
Each order item has: `name`, `qty`, `image`, `price`, `product` (ref to Product)

---

#### `models/Cart.js`

Represents a user's shopping cart (persistent on the server).

**Fields:**
| Field | Type | Description |
|---|---|---|
| `user` | ObjectId (ref: User) | Owner of the cart |
| `items` | Array | Cart items (product reference + quantity) |

**Embedded `cartItemSchema`:**
Each item has: `product` (ObjectId ref), `quantity` (min: 1)

---

#### `models/activity.js`

A lightweight schema used to log user or admin activity events (e.g., logins, product updates). Minimal fields — primarily used for audit trail purposes.

---

### 5.4 Controllers

Controllers contain the actual business logic for each route. They use `express-async-handler` to automatically forward errors to the global error handler.

#### `controllers/authController.js`

| Function | Route | Access | Description |
|---|---|---|---|
| `authUser` | `POST /api/auth/login` | Public | Finds user by email, verifies password with `matchPassword()`, returns JWT + user info |
| `adminLogin` | `POST /api/auth/admin/login` | Public | Same as `authUser` but also checks `isAdmin === true`. Throws 401 if not an admin |
| `registerUser` | `POST /api/auth/register` | Public | Checks if email already exists, creates new User, returns JWT + user info |
| `getUserProfile` | `GET /api/auth/profile` | Private | Fetches authenticated user's data using `req.user._id` (set by auth middleware) |
| `updateUserProfile` | `PUT /api/auth/profile` | Private | Updates name, email, password, and/or addresses of logged-in user |
| `getUsers` | `GET /api/auth/users` | Admin | Returns all users from DB, excluding passwords |

---

#### `controllers/productController.js`

| Function | Route | Access | Description |
|---|---|---|---|
| `getProducts` | `GET /api/products` | Public | Fetches paginated list. Supports query params: `keyword`, `category`, `minPrice`, `maxPrice`, `sortBy`, `pageNumber`, `pageSize` |
| `getProductById` | `GET /api/products/:id` | Public | Finds product by MongoDB `_id` or by `slug`. Returns 404 if not found |
| `getFeaturedProducts` | `GET /api/products/featured` | Public | Returns up to 5 products where `featured === true` |
| `getBestsellerProducts` | `GET /api/products/bestsellers` | Public | Returns up to 5 products where `bestseller === true` |
| `getNewArrivalProducts` | `GET /api/products/new-arrivals` | Public | Returns up to 5 products where `newArrival === true`, sorted newest first |
| `createProduct` | `POST /api/products` | Admin | Creates a new product from request body data |
| `updateProduct` | `PUT /api/products/:id` | Admin | Partially updates a product (only provided fields are changed) |
| `deleteProduct` | `DELETE /api/products/:id` | Admin | Removes a product by ID using `deleteOne()` |

---

#### `controllers/cartController.js`

| Function | Route | Access | Description |
|---|---|---|---|
| `getCart` | `GET /api/cart` | Private | Fetches the logged-in user's cart. Populates product details. Returns empty `{items:[]}` if no cart exists |
| `syncCart` | `POST /api/cart/sync` | Private | Overwrites the server cart with the frontend cart items. Creates cart if it doesn't exist |
| `updateCartItem` | `PUT /api/cart/update` | Private | Updates the quantity of a specific product in the cart. If `quantity <= 0`, removes the item |
| `clearCart` | `DELETE /api/cart/clear` | Private | Sets `cart.items = []` and saves |

---

#### `controllers/orderController.js`

| Function | Route | Access | Description |
|---|---|---|---|
| `addOrderItems` | `POST /api/orders` | Private | Creates a new order. Before saving, checks stock for each item and deducts from inventory |
| `getMyOrders` | `GET /api/orders/myorders` | Private | Returns all orders placed by the logged-in user, sorted newest first |
| `getOrderById` | `GET /api/orders/:id` | Private | Returns a single order. Only accessible by the order owner or an admin |
| `getOrders` | `GET /api/orders` | Admin | Returns all orders in the system with populated user info |
| `updateOrderStatus` | `PUT /api/orders/:id/status` | Admin | Updates the `orderStatus` field of an order |

---

### 5.5 Routes

Route files map HTTP method + URL paths to controller functions. They also apply middleware as needed.

| File | Base Path | Key Routes |
|---|---|---|
| `authRoutes.js` | `/api/auth` | `POST /login`, `POST /register`, `GET /profile` (protected), `PUT /profile` (protected), `POST /admin/login` |
| `productRoutes.js` | `/api/products` | `GET /`, `GET /featured`, `GET /bestsellers`, `GET /new-arrivals`, `GET /:id`, `POST /` (admin), `PUT /:id` (admin), `DELETE /:id` (admin) |
| `cartRoutes.js` | `/api/cart` | `GET /` (protected), `POST /sync` (protected), `PUT /update` (protected), `DELETE /clear` (protected) |
| `orderRoutes.js` | `/api/orders` | `POST /` (protected), `GET /myorders` (protected), `GET /:id` (protected), `GET /` (admin), `PUT /:id/status` (admin) |
| `uploadRoutes.js` | `/api/upload` | `POST /` — accepts single image file, saves to `uploads/` folder, returns the file path |
| `paymentRoutes.js` | `/api/payment` | `POST /create-order` (protected) — creates a Razorpay order; `POST /verify` (protected) — verifies payment signature |

#### `routes/uploadRoutes.js` — How image upload works

Uses **Multer** with `diskStorage`:
- `destination`: saves files to the `uploads/` directory
- `filename`: names the file as `fieldname-timestamp.extension`
- `checkFileType()`: only allows `.jpg`, `.jpeg`, `.png`, `.webp`
- After upload, the route returns the normalized file path (with forward slashes for URL usage)

#### `routes/paymentRoutes.js` — Razorpay Integration

- **`POST /api/payment/create-order`**: Converts the amount (in INR) to paise (×100), creates a Razorpay order via the SDK, returns `razorpayOrderId`
- **`POST /api/payment/verify`**: Validates the payment using HMAC-SHA256 signature. Generates `order_id|payment_id` hash using `RAZORPAY_KEY_SECRET` and compares with the received signature. Returns success/failure

---

### 5.6 Middlewares

#### `middlewares/authMiddleware.js`

**`protect`** — A middleware function that:
1. Checks for `Authorization: Bearer <token>` in the request header
2. Verifies the token using `jwt.verify()` and `JWT_SECRET`
3. Fetches the user from DB (excluding password) and attaches to `req.user`
4. Calls `next()` if valid, throws 401 if token is missing or invalid

#### `middlewares/adminMiddleware.js`

**`admin`** — Checks if `req.user.isAdmin === true`. Throws 401 if not. Applied after `protect`.

#### `middlewares/errorMiddleware.js`

Two middleware functions registered at the very end of `server.js`:

- **`notFound`**: Catches any request that didn't match a route. Sets status 404 and creates an error with the URL
- **`errorHandler`**: Global error handler. Returns status code + `message` as JSON. In development, also returns the stack trace. In production, stack trace is hidden

---

### 5.7 Utilities

#### `utils/generateToken.js`

```js
generateToken(id) → JWT string
```
Signs a JWT token containing `{ id }` as payload, using `JWT_SECRET` from env. Token expires in **30 days**.

---

### 5.8 Seeders

#### `seedAdmin.js`

A **one-time script** (run manually with `node seedAdmin.js`) that:
1. Connects to MongoDB
2. Checks if a user with `admin@cartzo.com` already exists
3. If yes — ensures `isAdmin = true` and re-hashes the password if needed
4. If no — creates a new admin user with:
   - **Email:** `admin@cartzo.com`
   - **Password:** `admin123`
   - **isAdmin:** `true`

> Run with: `node seedAdmin.js` from the `backend/` directory

#### `seeder/products.js`

Contains a hardcoded array of 20 sample products. Auto-inserted into MongoDB by `server.js` when the database is empty on first startup.

---

## 6. Frontend — Deep Dive

### 6.1 Entry Point — `index.js` & `App.jsx`

#### `index.js`
Mounts the React application to `<div id="root">` in the HTML. Wraps the `<App />` component with `React.StrictMode`.

#### `App.jsx`

The root component. Wraps everything in:
- `<NotificationProvider>` — global toast/modal notifications
- `<AuthProvider>` — user authentication state
- `<CartProvider>` — shopping cart state + animations

**All Routes:**

| Path | Component | Access |
|---|---|---|
| `/` | `LandingPage` | Public |
| `/shop` | `ProductList` | Public |
| `/products` | `ProductList` | Public |
| `/products/:id` | `ProductDetail` | Public |
| `/login` | `Login` | Public |
| `/register` | `Register` | Public |
| `/profile` | `Profile` | Public |
| `/cart` | `Cart` | Public |
| `/checkout` | `Checkout` | Protected (login required) |
| `/checkout/success` | `OrderConfirmation` | Protected |
| `/orders` | `OrderList` | Protected |
| `/orders/:id` | `OrderDetail` | Protected |
| `/admin/login` | `AdminLogin` | Public |
| `/admin/dashboard` | `AdminDashboard` | Admin |
| `/admin/products` | `AdminProducts` | Admin |
| `/admin/products/new` | `AdminProductForm` | Admin |
| `/admin/products/:id/edit` | `AdminProductForm` | Admin |

---

### 6.2 Context (Global State)

React Context is used to share state across components without prop drilling.

#### `context/AuthContext.jsx`

Manages authentication state for the entire app.

**State:**
- `user` — Current logged-in user object (or `null`)
- `loading` — Boolean, true while checking auth status
- `error` — Error message from login/register

**Functions exposed via context:**
| Function | Description |
|---|---|
| `register(email, password, name)` | Calls `authService.register()`, saves JWT to localStorage, sets user state |
| `login(email, password)` | Calls `authService.login()`, saves JWT to localStorage, sets user state |
| `logout()` | Calls `authService.logout()`, clears JWT from localStorage, resets user to null |
| `updateProfile(data)` | Calls `authService.updateProfile()`, updates user state |

**Computed Values:**
- `isAuthenticated` — `true` if `user !== null`
- `isAdmin` — `true` if `user.role === 'admin'`

**On mount (`useEffect`):** Reads JWT from localStorage and calls `authService.getProfile()` to restore session.

---

#### `context/CartContext.jsx`

Manages the shopping cart state. Cart is persisted to `localStorage` automatically.

**State:**
- `cartItems` — Array of cart items (`{...productData, quantity}`)

**Functions exposed via context:**
| Function | Description |
|---|---|
| `addToCart(product, event)` | Adds product to cart (or increments quantity if already present). Also triggers the fly-to-cart animation and shows the success modal |
| `removeFromCart(productId)` | Removes item from cart by product ID |
| `updateQuantity(productId, quantity)` | Sets a specific quantity. If `quantity === 0`, item is removed |
| `clearCart()` | Empties the entire cart |
| `getTotalItems()` | Returns total count of all items (sum of quantities) |
| `getTotalPrice()` | Returns total cost (sum of `price × quantity`) |

**Internal `CartSuccessModal` component:**
An animated modal that appears for 2 seconds when a product is added to cart. Shows the product image and "Added to Cart" confirmation. Auto-dismisses with fade out.

**`useEffect` — localStorage sync:**
Saves `cartItems` to `localStorage` every time the cart state changes.

---

#### `context/NotificationContext.jsx`

Provides a global notification/toast system.

**State:**
- `message` — Current notification text
- `type` — `'success'` | `'error'` | `'warning'` | `'info'`
- `isVisible` — Controls fade in/out animation

**Function:**
| Function | Description |
|---|---|
| `showNotification(content, variant)` | Displays a centered modal toast with an icon and auto-dismisses after 3 seconds |

The toast renders directly in the provider JSX and uses animated icons based on the `type` prop (green checkmark for success, red X for error, yellow warning, blue info).

---

#### `context/OrderContext.jsx`

A minimal context for sharing order-related state between checkout and confirmation pages (order ID, status, etc.).

---

### 6.3 Pages

#### `pages/LandingPage.jsx`

The homepage. Features:
- Hero section with CTA buttons
- Featured products section (fetches from API)
- Bestsellers section
- New Arrivals section
- Category showcase

#### `pages/Auth/Login.jsx`

Login form page. Validates email and password inputs, calls `login()` from `AuthContext`, and redirects to home on success.

#### `pages/Auth/Register.jsx`

Registration form. Validates name, email, password. Calls `register()` from `AuthContext`. Redirects to home on success.

#### `pages/Auth/Profile.jsx`

Shows the logged-in user's profile info (name, email, saved addresses). Allows updating name, email, and password via `updateProfile()`.

#### `pages/Products/ProductList.jsx`

Displays all products in a grid. Features:
- Search bar (keyword)
- Category filter
- Price range filter
- Sort options (price, rating, newest)
- Pagination

#### `pages/Products/ProductDetail.jsx`

Shows detailed view of a single product. Includes:
- Product image
- Name, brand, price, rating
- Stock status
- Add to Cart button (with fly animation)
- Specifications table

#### `pages/Cart/Cart.jsx`

The full cart page. Shows `CartItem` components, `CartSummary`, and `EmptyCart` if cart is empty.

#### `pages/Checkout/Checkout.jsx`

Multi-step checkout process:
1. Address selection/entry (`CheckoutForm`, `ManageAddresses`)
2. Order review (`OrderReview`, `PaymentSummary`)
3. Payment (`PaymentWidget` triggers Razorpay)

#### `pages/Checkout/OrderConfirmation.jsx`

Success page shown after a successful payment + order creation.

#### `pages/Orders/OrderList.jsx`

Lists all orders placed by the logged-in user. Each row shows order ID, date, total, and status badge.

#### `pages/Orders/OrderDetail.jsx`

Shows full details of a single order including all ordered items, shipping address, and status.

#### `pages/Admin/AdminLogin.jsx`

Admin-only login page. Uses `POST /api/auth/admin/login` endpoint which verifies `isAdmin === true`.

#### `pages/Admin/AdminDashboard.jsx`

Admin control panel homepage. Shows summary stats (total orders, products, revenue, users), recent orders, and quick links.

#### `pages/Admin/AdminProducts.jsx`

Lists all products in a table with Edit and Delete actions.

#### `pages/Admin/AdminProductForm.jsx`

Create/Edit product form. Has fields for all product properties including image upload (calls `/api/upload`). Used for both creating new products and editing existing ones (determined by route param `:id`).

---

### 6.4 Components

#### Layout Components (`components/Layout/`)

| Component | Purpose |
|---|---|
| `MainLayout.jsx` | Wraps all customer-facing pages. Renders `<Navbar>` at top, `<Outlet>` for page content, `<Footer>` at bottom |
| `AdminLayout.jsx` | Wraps all admin pages. Includes `<Sidebar>` for navigation and `<Outlet>` for content. Protects routes from non-admin access |
| `Sidebar.jsx` | Admin sidebar with navigation links: Dashboard, Products, Orders, Users, Settings |

#### Common Components (`components/Common/`)

| Component | Purpose |
|---|---|
| `Navbar.jsx` | Top navigation bar. Shows logo, navigation links, cart icon (with item count badge), and user menu (login/register or profile/logout). Cart icon has `id="navbar-cart-icon"` used by fly-to-cart animation |
| `Footer.jsx` | Simple full-width footer at the bottom of every page |
| `Loading.jsx` | Full-page or inline loading spinner shown during API calls |
| `ErrorMessage.jsx` | Displays error messages in a styled box |

#### Auth Components (`components/Auth/`)

| Component | Purpose |
|---|---|
| `LoginForm.jsx` | Reusable login form UI (email + password inputs + submit button) |
| `RegisterForm.jsx` | Reusable registration form UI (name + email + password + confirm) |
| `ProtectedRoute.jsx` | Route wrapper: if user is not logged in, redirects to `/login`. Otherwise renders the child component |
| `UserMenu.jsx` | Dropdown menu in the navbar showing user options (Profile, Orders, Logout) |

#### Product Components (`components/Product/`)

| Component | Purpose |
|---|---|
| `ProductCard.jsx` | A single product card shown in grids. Displays image, name, price, rating, discount badge, and "Add to Cart" button. Clicking triggers the fly animation |
| `ProductFilter.jsx` | Filter sidebar/controls with category, price range, and sort options |
| `ProductGrid.jsx` | Wrapper that arranges `ProductCard` components in a responsive grid layout |

#### Cart Components (`components/Cart/`)

| Component | Purpose |
|---|---|
| `CartItem.jsx` | A single row in the cart page. Shows product image, name, price, quantity controls (+/−), and remove button |
| `CartSummary.jsx` | Right sidebar in the cart showing subtotal, shipping, and total with "Proceed to Checkout" button |
| `EmptyCart.jsx` | Shown when the cart has no items. Has a "Continue Shopping" button |

#### Checkout Components (`components/Checkout/`)

| Component | Purpose |
|---|---|
| `CheckoutForm.jsx` | Address input form for entering a new shipping address during checkout |
| `ManageAddresses.jsx` | Displays saved addresses and allows selecting one for delivery |
| `OrderReview.jsx` | Shows the list of items being ordered before payment |
| `PaymentSummary.jsx` | Shows price breakdown (subtotal, shipping, total) on the checkout page |
| `PaymentWidget.jsx` | Button that triggers the Razorpay checkout popup |
| `SuccessMessage.jsx` | Small inline success indicator component |

#### Admin Components (`components/Admin/`)

| Component | Purpose |
|---|---|
| `ProductForm.jsx` | Reusable form fields used inside `AdminProductForm` page |
| `ProductTable.jsx` | Tabular list of products with action buttons (edit, delete) used on the admin products page |
| `OrderOverview.jsx` | Summary widget shown on the admin dashboard |

---

### 6.5 Services (API Layer)

All services use a shared `apiService` Axios instance. They abstract API URLs away from components.

#### `services/apiService.js`

Creates a configured Axios instance:
- `baseURL`: `REACT_APP_API_URL` env var or `http://localhost:5000/api`
- `timeout`: 10 seconds

**Request Interceptor:** Automatically attaches the JWT token from `localStorage` to every request as `Authorization: Bearer <token>`

**Response Interceptor:** If any request gets a `401 Unauthorized` response, it clears the stored token and redirects to `/login`

---

#### `services/authService.js`

| Method | API Call | Description |
|---|---|---|
| `register(data)` | `POST /auth/register` | Register a new user |
| `login(data)` | `POST /auth/login` | Login and get JWT |
| `logout()` | (client-side only) | Clears JWT from localStorage |
| `getProfile()` | `GET /auth/profile` | Get current user's profile |
| `updateProfile(data)` | `PUT /auth/profile` | Update user profile |

---

#### `services/productService.js`

| Method | Description |
|---|---|
| `getAll(params)` | Fetch all products with filters/pagination |
| `getFeatured()` | Fetch featured products |
| `getBestsellers()` | Fetch bestseller products |
| `getNewArrivals()` | Fetch new arrivals |
| `getById(id)` | Fetch single product by ID or slug |
| `create(data)` | Admin: create a new product |
| `update(id, data)` | Admin: update a product |
| `delete(id)` | Admin: delete a product |

**Offline Fallback Pattern (`fallbackIfOffline`):** If the API call fails due to network error (no `error.response`), it falls back to `sampleData.js` local data. This keeps the UI working even if the backend is down.

---

#### `services/cartService.js`

| Method | API Call | Description |
|---|---|---|
| `getCart()` | `GET /cart` | Fetch user's server-side cart |
| `saveCart(cartData)` | `POST /cart` | Save cart to server |
| `clearCart()` | `DELETE /cart` | Clear server cart |

---

#### `services/orderService.js`

| Method | API Call | Description |
|---|---|---|
| `create(orderData)` | `POST /orders` | Place a new order |
| `getAll()` | `GET /orders` | Get all orders (admin) |
| `getById(id)` | `GET /orders/:id` | Get a single order |
| `cancel(id)` | `DELETE /orders/:id` | Cancel an order |

---

#### `services/paymentService.js`

| Method | Description |
|---|---|
| `createOrder(amount)` | Calls `/payment/create-order` to generate a Razorpay order ID |
| `verifyPayment(paymentData)` | Calls `/payment/verify` with payment IDs and signature |
| `openRazorpay(orderData)` | Opens the Razorpay checkout popup. Handles the success callback which triggers `verifyPayment`. Returns a Promise that resolves on successful payment |

---

### 6.6 Custom Hooks

#### `hooks/useFetch.js`

```js
const { data, loading, error } = useFetch(fetchFn, [dependencies])
```

A generic data fetching hook. Takes any async function that returns `{ data }`. Manages `loading`, `error`, and `data` state. Prevents state updates on unmounted components using an `isMounted` flag (avoids memory leaks).

---

#### `hooks/useAuth.js`

```js
const auth = useAuth()
```

A simple re-export of the `useAuth` hook from `AuthContext`. Provides: `user`, `login`, `logout`, `register`, `isAuthenticated`, `loading`, `error`.

---

#### `hooks/useCart.js`

```js
const cart = useCart()
```

A simple re-export of the `useCart` hook from `CartContext`. Provides: `cartItems`, `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `getTotalItems`, `getTotalPrice`.

---

### 6.7 Utilities

#### `utils/constants.js`

Central location for all app-wide constants:

| Constant | Value | Purpose |
|---|---|---|
| `API_BASE_URL` | `http://localhost:5000/api` | Base URL for all API calls |
| `CURRENCY` | `₹` | Currency symbol used in formatters |
| `FREE_SHIPPING_THRESHOLD` | `500` | Orders above ₹500 get free shipping |
| `STANDARD_SHIPPING` | `50` | Shipping cost below threshold |
| `TAX_RATE` | `0` | Tax rate (currently 0%) |
| `STORAGE_KEYS` | Object | Keys used for `localStorage` items |
| `ROLES` | Object | User role constants |
| `ORDER_STATUS` | Object | Possible order status values |
| `PAYMENT_STATUS` | Object | Possible payment status values |
| `VALIDATION_RULES` | Object | Regex patterns and length limits |

---

#### `utils/formatters.js`

| Function | Purpose |
|---|---|
| `formatPrice(price)` | Converts a number to `₹1,234` format using `en-IN` locale |
| `formatDate(date)` | Converts a Date/string to `"1 Jun 2025"` format |
| `formatDateTime(date)` | Same as above but includes time (e.g., `"1 Jun 2025, 10:30 AM"`) |
| `capitalize(str)` | Capitalizes first letter (e.g., `"hello"` → `"Hello"`) |
| `truncate(text, length)` | Truncates text to `length` chars and adds `"..."` |
| `formatOrderStatus(status)` | Maps status codes to display labels (`placed` → `"Order Placed"`) |
| `getStatusColor(status)` | Returns CSS class names for colored status badges |

---

#### `utils/validators.js`

| Function | Purpose |
|---|---|
| `validateEmail(email)` | Checks email format using regex |
| `validatePassword(password)` | Checks minimum length (6 characters) |
| `validatePhone(phone)` | Validates 10-digit Indian phone number |
| `validateZipCode(zipCode)` | Validates 6-digit Indian postal code |
| `validateRequired(value)` | Checks if value is non-empty (handles strings and other types) |
| `validateForm(data, rules)` | Generic form validator. Takes a data object and rules config, returns an `errors` object |

---

#### `utils/priceCalculator.js`

| Function | Purpose |
|---|---|
| `calculateSubtotal(items)` | Sums `price × quantity` for all cart items |
| `calculateTax(subtotal, rate)` | Applies tax rate (currently 0%) |
| `calculateShipping(subtotal)` | Returns ₹50 shipping, or ₹0 if above ₹500 |
| `calculateTotal(items)` | Returns full breakdown: `{subtotal, tax, shipping, total}` |
| `isFreeShippingAvailable(subtotal)` | Returns `true` if order qualifies for free shipping |
| `getRemainingForFreeShipping(subtotal)` | Returns how much more needs to be spent to unlock free shipping |

---

#### `utils/animations.js`

| Function | Purpose |
|---|---|
| `triggerFlyToCart(event, imageSrc)` | Creates a floating product image element at the click position and animates it flying toward the cart icon in the navbar. After 800ms, removes the image and pulses the cart icon |

**How it works:**
1. Gets the `(x, y)` coordinates from the click `event`
2. Finds the cart icon element by `id="navbar-cart-icon"`
3. Creates an `<img>` element, positions it absolutely at the click point
4. Uses CSS transition to move it to the cart icon's location and scale it down to `0.1`
5. After 800ms, removes the floating image and briefly scales up the cart icon

---

#### `utils/sampleData.js`

Contains a small array of sample product objects used as a fallback when the API is unavailable (offline mode). Used by `productService.js`.

---

## 7. API Reference

### Auth Endpoints

| Method | URL | Body | Auth | Response |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | `{name, email, password}` | None | `{token, user}` |
| `POST` | `/api/auth/login` | `{email, password}` | None | `{token, user}` |
| `POST` | `/api/auth/admin/login` | `{email, password}` | None | `{token, user}` |
| `GET` | `/api/auth/profile` | — | Bearer | `{user}` |
| `PUT` | `/api/auth/profile` | `{name?, email?, password?, addresses?}` | Bearer | `{user}` |

### Product Endpoints

| Method | URL | Query Params | Auth | Response |
|---|---|---|---|---|
| `GET` | `/api/products` | `keyword, category, minPrice, maxPrice, sortBy, pageNumber, pageSize` | None | `{products, page, pages, count}` |
| `GET` | `/api/products/featured` | — | None | `[products]` |
| `GET` | `/api/products/bestsellers` | — | None | `[products]` |
| `GET` | `/api/products/new-arrivals` | — | None | `[products]` |
| `GET` | `/api/products/:id` | — | None | `{product}` |
| `POST` | `/api/products` | — | Admin | `{product}` |
| `PUT` | `/api/products/:id` | — | Admin | `{product}` |
| `DELETE` | `/api/products/:id` | — | Admin | `{message}` |

### Cart Endpoints

| Method | URL | Body | Auth | Response |
|---|---|---|---|---|
| `GET` | `/api/cart` | — | Bearer | `{user, items[]}` |
| `POST` | `/api/cart/sync` | `{items[]}` | Bearer | `{cart}` |
| `PUT` | `/api/cart/update` | `{productId, quantity}` | Bearer | `{cart}` |
| `DELETE` | `/api/cart/clear` | — | Bearer | `{message}` |

### Order Endpoints

| Method | URL | Body | Auth | Response |
|---|---|---|---|---|
| `POST` | `/api/orders` | `{orderItems, shippingAddress, totalPrice}` | Bearer | `{order}` |
| `GET` | `/api/orders/myorders` | — | Bearer | `[orders]` |
| `GET` | `/api/orders/:id` | — | Bearer | `{order}` |
| `GET` | `/api/orders` | — | Admin | `[orders]` |
| `PUT` | `/api/orders/:id/status` | `{status}` | Admin | `{order}` |

### Payment Endpoints

| Method | URL | Body | Auth | Response |
|---|---|---|---|---|
| `POST` | `/api/payment/create-order` | `{amount}` | Bearer | `{razorpayOrderId, amount, currency}` |
| `POST` | `/api/payment/verify` | `{razorpay_order_id, razorpay_payment_id, razorpay_signature}` | Bearer | `{success, message}` |

### Upload Endpoints

| Method | URL | Body | Auth | Response |
|---|---|---|---|---|
| `POST` | `/api/upload` | `form-data: image` | None | `/uploads/image-filename.jpg` |

---

## 8. Data Flow Diagrams

### User Login Flow

```
User enters email + password
       ↓
LoginForm.jsx → authService.login()
       ↓
POST /api/auth/login
       ↓
authController.authUser()
  → User.findOne({ email })
  → user.matchPassword(password)  [bcrypt compare]
  → generateToken(user._id)       [JWT sign]
       ↓
Response: { token, user }
       ↓
AuthContext.login()
  → localStorage.setItem('jwt_token', token)
  → setUser(user)
       ↓
Redirect to home page
```

### Add to Cart Flow

```
User clicks "Add to Cart" on ProductCard
       ↓
CartContext.addToCart(product, clickEvent)
  → Updates cartItems state
  → Saves to localStorage
  → triggerFlyToCart(event, image) [animations.js]
    → Creates floating img element
    → Animates it toward cart icon
    → Pulses cart icon on arrival
  → Shows CartSuccessModal for 2 seconds
       ↓
Navbar cart badge updates (getTotalItems())
```

### Checkout & Payment Flow

```
User goes to /checkout
       ↓
Checkout.jsx loads
  → CheckoutForm / ManageAddresses (select delivery address)
  → OrderReview (confirm items)
  → PaymentSummary (confirm total)
       ↓
User clicks "Pay Now"
  → PaymentWidget.jsx
  → paymentService.createOrder(total)
     → POST /api/payment/create-order
     → Razorpay creates order, returns razorpayOrderId
       ↓
  → paymentService.openRazorpay({ razorpayOrderId, amount })
     → Razorpay checkout popup opens
     → User enters card/UPI/wallet details
     → Razorpay calls handler with payment IDs + signature
       ↓
  → paymentService.verifyPayment({ order_id, payment_id, signature })
     → POST /api/payment/verify
     → HMAC-SHA256 signature verified on server
       ↓
  → orderService.create({ orderItems, shippingAddress, totalPrice })
     → POST /api/orders
     → Stock deducted from each product
     → Order saved to MongoDB
       ↓
  → CartContext.clearCart()
  → Navigate to /checkout/success
```

---

*Last updated: June 2026 | Cartzo v1.0*
