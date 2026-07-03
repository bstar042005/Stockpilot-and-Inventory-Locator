# StockPilot – AI Powered Inventory Management System

StockPilot is a modern AI-powered warehouse management system that simplifies inventory tracking, warehouse organization, and stock management through an intelligent dashboard, real-time inventory updates, QR code generation, warehouse location mapping, and an AI warehouse assistant.

Designed for warehouses, retailers, and distributors, StockPilot helps reduce manual work, improve inventory visibility, and speed up product management.

---

# Features

##  Authentication
- Secure User Registration & Login
- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes

---

## Smart Dashboard

The dashboard provides a quick overview of the warehouse.

Features include:

-  Total Products
-  Total Inventory Value
-  Low Stock Products
-  Recently Added Products
-  Quick Navigation Cards
-  Integrated AI Warehouse Assistant

---

## Inventory Management

Manage products with complete CRUD functionality.

- Add Products
- Update Products
- Delete Products
- Search Products
- Category Management
- Quantity Tracking
- Shelf/Rack Allocation
- Product Pricing

---

## AI Warehouse Assistant

Powered by **Groq LLM**, the AI assistant can answer warehouse-related queries such as:

- Product lookup
- Inventory information
- Stock-related questions
- Warehouse assistance
- General inventory guidance

---

## Warehouse Locator

Locate products instantly inside the warehouse.

Features:

- Visual Shelf Mapping
- Rack-wise Organization
- Easy Product Location
- Organized Storage Layout

---

## QR Code Integration

Every product automatically receives its own QR Code.

- Generate QR Codes
- Download QR Codes
- Print QR Codes
- Quick Product Identification

---

## Low Stock Monitoring

Automatically detects products running low on inventory.

- Low Stock Alerts
- Dashboard Warning Cards
- Easy Inventory Monitoring

---

## Modern UI

- Responsive Design
- Clean Dashboard
- Interactive Cards
- Professional Interface
- Mobile Friendly

---

# Tech Stack

## Frontend

- React.js
- Vite
- React Router
- Axios
- CSS3
- React Icons

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB Atlas
- Mongoose

---

## Authentication

- JWT
- bcryptjs

---

## AI Integration

- Groq API

---

## Other Libraries

- QRCode
- Lucide React

---

# System Architecture

```text
              React + Vite Frontend
                      │
                      ▼
              Express.js REST API
                      │
      ┌───────────────┴───────────────┐
      ▼                               ▼
 MongoDB Atlas                  Groq AI API
      │                               │
      └───────────────┬───────────────┘
                      ▼
           StockPilot Warehouse System
```

---

# Project Structure

```text
StockPilot-and-Inventory-Locator/

├── frontend/
│
│   ├── src/
│   │
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
│
├── backend/
│
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/reocodes-51/Stockpilot-and-Inventory-Locator.git

cd Stockpilot-and-Inventory-Locator
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

GROQ_API_KEY=your_groq_api_key
```

Run backend

```bash
npm start
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

---

# Deployment

## Frontend

- Vercel

## Backend

- Render

## Database

- MongoDB Atlas

---

# Application Modules

### Dashboard

- Warehouse Overview
- Inventory Summary
- Recent Products
- Inventory Value
- Low Stock Alerts
- AI Assistant

---

### Inventory

- Product CRUD
- Search
- Product Details
- Categories
- QR Generation

---

###  Warehouse Locator

- Shelf Mapping
- Product Locations
- Rack Navigation

---

### AI Assistant

- Chat Interface
- Inventory Questions
- Warehouse Guidance
- AI Responses

---

#  Use Cases

- Warehouses
- Retail Stores
- Distribution Centers
- Manufacturing Units
- Logistics Companies
- Inventory Management

---

#  Developed By

- Rajyavardhan Singh Rathore
- Bhavya Vaish

---

# If you like this project

Please consider giving this repository a ⭐ on GitHub.
