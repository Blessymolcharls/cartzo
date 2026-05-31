# Cartzo Frontend

This is the Cartzo React frontend application. It is built with Create React App, Tailwind CSS, and Axios.

## Getting started

1. Copy `.env.example` to `.env.local`.
2. Fill in the backend API URL and Razorpay key.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the app:
   ```bash
   npm start
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

The frontend expects the following environment variables in `.env.local`:

- `REACT_APP_API_URL` - The backend API base URL, for example `http://localhost:5000/api`
- `REACT_APP_JWT_KEY` - Local storage key for the JWT token, default is `jwt_token`
- `REACT_APP_RAZORPAY_KEY` - Razorpay public key for payment checkout

## Available scripts

- `npm start` - Run the application in development mode.
- `npm run build` - Build the production bundle.
- `npm test` - Run the test runner.

## Frontend contract for backend

The frontend is wired to the following backend API contracts:

### Authentication
- `POST /auth/register` — register a new user
  - payload: `{ name, email, password }`
  - response: `{ user, token }`
- `POST /auth/login` — authenticate a user
  - payload: `{ email, password }`
  - response: `{ user, token }`
- `GET /auth/profile` — return authenticated user profile
- `PUT /auth/profile` — update authenticated user profile

### Products
- `GET /products` — list available products
- `GET /products/:id` — get product details
- `POST /products` — create product (admin)
- `PUT /products/:id` — update product (admin)
- `DELETE /products/:id` — delete product (admin)

### Orders
- `POST /orders` — create an order after successful payment
  - payload includes shipping address, cart items, total amount, currency, payment info, and status
- `GET /orders` — list user orders
- `GET /orders/:id` — get order details

### Payments
- `POST /payment/create-order` — create a Razorpay order on the server
  - payload: `{ amount }`
  - response must include `{ razorpayOrderId, amount, currency }`
- `POST /payment/verify` — verify Razorpay payment signature
  - payload: `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }`

## Backend handoff notes

- The frontend stores JWT tokens in local storage and sends `Authorization: Bearer <token>` headers automatically.
- The checkout flow first requests a Razorpay order, opens the Razorpay widget, verifies payment, then creates an order record.
- The admin UI supports create, edit, and delete product operations.

## Deployment

Build the app with:

```bash
npm run build
```

Then deploy the contents of the `build/` folder to a static host.
