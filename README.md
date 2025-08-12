# E-Commerce Store

A modern, full-stack e-commerce application built with Next.js, TypeScript, Tailwind CSS, and MongoDB.

## Features

### User Features
- **Browse Products**: Paginated product listing with search functionality
- **Product Details**: Detailed product pages with images, descriptions, and pricing
- **Shopping Cart**: Add/remove products, update quantities with local storage persistence
- **Authentication**: 
  - Password-based login/registration
  - OTP-based login via email/phone
- **Checkout**: Complete order placement with email confirmation
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Features
- **Product Management**: Create, read, update, and delete products
- **Inventory Control**: Manage stock levels, pricing, and product offers
- **Order Management**: View and manage customer orders
- **Admin Dashboard**: Comprehensive interface for store management

### Technical Features
- **Modern Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Database**: MongoDB with connection pooling
- **Authentication**: JWT-based with secure password hashing
- **API Design**: RESTful API endpoints with proper error handling
- **State Management**: React Context for cart and authentication
- **Responsive UI**: Mobile-first design with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT, bcryptjs
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form (optional)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local.example` to `.env.local` and update the values:
   ```bash
   cp .env.local.example .env.local
   ```

   Update the following variables in `.env.local`:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017
   MONGODB_DB=ecommerce_db

   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NEXTAUTH_SECRET=your-nextauth-secret-change-this-in-production

   # App URL
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

### Database Setup

The application will automatically create the necessary collections in MongoDB:
- `users` - User accounts and authentication
- `products` - Product catalog
- `orders` - Customer orders
- `otps` - OTP verification codes

### Creating an Admin User

To create an admin user, register normally through the UI, then manually update the user role in MongoDB:

```javascript
// In MongoDB shell or GUI
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/send-otp` - Send OTP for verification
- `POST /api/auth/verify-otp` - Verify OTP and login
- `GET /api/auth/verify` - Verify JWT token

### Products
- `GET /api/products` - List products (with pagination, search, filters)
- `POST /api/products` - Create product (admin only)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product (admin only)
- `DELETE /api/products/[id]` - Delete product (admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - List orders (admin or user's orders)

## Testing the API

### Create a Product (Admin)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sample Product",
    "description": "This is a sample product description",
    "price": 99.99,
    "stock": 50,
    "featured": true
  }'
```

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Send OTP
```bash
curl -X POST http://localhost:3000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{
    "contact": "user@example.com",
    "type": "email"
  }'
```

### Place an Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "items": [
      {
        "id": "product-id",
        "title": "Product Name",
        "price": 99.99,
        "quantity": 2
      }
    ]
  }'
```

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── admin/                   # Admin dashboard
│   ├── api/                     # API routes
│   │   ├── auth/               # Authentication endpoints
│   │   ├── products/           # Product CRUD endpoints
│   │   └── orders/             # Order management endpoints
│   ├── auth/                   # Authentication pages
│   ├── checkout/               # Checkout process
│   ├── orders/                 # Order confirmation
│   └── products/               # Product listing and details
├── components/                  # Reusable React components
│   ├── admin/                  # Admin-specific components
│   ├── cart/                   # Shopping cart components
│   ├── layout/                 # Layout components
│   ├── products/               # Product-related components
│   └── ui/                     # Basic UI components
├── context/                    # React Context providers
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
└── types/                      # TypeScript type definitions
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `MONGODB_DB` | MongoDB database name | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth (if used) | No |
| `NEXT_PUBLIC_BASE_URL` | Base URL for the application | Yes |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## License

This project is licensed under the MIT License.
