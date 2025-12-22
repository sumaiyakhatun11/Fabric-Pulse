

# 🧵 FabricPulse – Garments Order & Production Tracker System

**FabricPulse** is a full-stack web application designed to manage garment orders and monitor production progress in real time. The system supports role-based access for **Buyers**, **Managers**, and **Admins**, enabling smooth order handling, approvals, and production tracking from placement to delivery.

---

## 🚀 Key Features

### 👤 Authentication & Security

* Firebase Authentication (Email/Password)
* JWT-protected backend routes
* Role-based access control
* User status management (Pending / Approved / Suspended)

---

### 🛒 Buyer Features

* Browse garment products
* Place orders securely
* Online payment via **Stripe**
* View personal order history
* Track production progress through a timeline
* Manage profile (name & photo)

---

### 🧑‍💼 Manager / Admin Features

* View and manage all orders
* Approve or reject orders
* Add production & shipment tracking updates
* Monitor approved orders
* Manage products
* Manage users (roles & statuses)

---

### 📍 Production & Order Tracking

* Step-by-step tracking timeline
* Production stages (e.g. Cutting, Sewing, Quality Check, Packing, Shipping)
* Optional notes and location per update
* Latest status highlighted
* Secure, role-restricted updates

---

## 🧱 Technology Stack

### Frontend

* React
* React Router
* Tailwind CSS / DaisyUI
* Axios
* Firebase Authentication

### Backend

* Node.js
* Express.js
* MongoDB
* Firebase Admin SDK
* Stripe Payment Gateway

---

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── Pages/
│   │   ├── Components/
│   │   ├── Hooks/
│   │   ├── Provider/
│   │   ├── Routes/
│   │   └── Shared/
│
├── server/
│   ├── index.js
│   ├── .env
│   └── package.json
```

---

## 🔐 Environment Variables

### Backend (`.env`)

```
PORT=3000
MONGODB_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret_key
FB_SERVICE_KEY=base64_encoded_firebase_service_account
SITE_DOMAIN=http://localhost:5173
```

### Frontend (`.env`)

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/fabricpulse.git
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔗 Important API Endpoints

### Users

* `GET /users`
* `PUT /users/role/:id`
* `PUT /users/status/:id`

### Orders

* `POST /orders`
* `GET /orders/:email`
* `PUT /orders/approve/:id`
* `PUT /orders/reject/:id`

### Tracking

* `POST /tracking`
* `GET /view-tracking/:order_id`

---

## 🧪 Roles & Access Levels

| Role    | Capabilities                 |
| ------- | ---------------------------- |
| Buyer   | Place & track orders         |
| Manager | Approve orders, add tracking |
| Admin   | Full system access           |

---

## 📌 Future Enhancements

* Real-time order notifications
* Production analytics dashboard
* File/image upload for tracking stages
* Advanced order filtering & search
* Mobile-responsive admin dashboard

---

## 👨‍💻 Author

**Your Name**
Sumaiya Khatun


