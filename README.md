# 🍔 School Canteen Management (Frontend Task)

A modern React-based web application for managing a school canteen system.
Users can view snacks, place orders, manage students, and track spending.

---

## 🚀 Features

* 🍟 View all snacks with price & order count
* 🛒 Place orders (select student + quantity)
* 🎓 Manage students (list + search)
* 👤 Student details page with order history
* ➕ Register new students with auto referral code
* ⚡ Real-time UI updates using Zustand

---

## 🛠️ Tech Stack

* **React.js** – UI Library
* **React Router DOM** – Routing
* **Zustand** – State Management
* **Tailwind CSS** – Styling
* **Lucide React** – Icons
* **JSON Server** – Mock API

---

## 📦 Installation & Setup

### 1️⃣ Clone the project

```bash
git clone <your-repo-link>
cd school-canteen
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Install JSON Server

```bash
npm install -g json-server
```

### 4️⃣ Run Mock API

```bash
json-server --watch db.json --port 3000
```

### 5️⃣ Run React App

```bash
npm run dev
```

---

## 🌐 API Endpoints (Mocked)

* `GET /snacks`
* `GET /students`
* `GET /students/:id`
* `POST /students`
* `POST /orders`

---

## 🧠 Mock Data Approach

* Used **json-server** to simulate a REST API
* Data stored in `db.json`
* Includes:

  * Students
  * Snacks
  * Orders
* Supports full CRUD operations

---

## 📁 Project Structure

```
src/
 ├── pages/
 │   ├── Snacks.jsx
 │   ├── Students.jsx
 │   ├── StudentDetails.jsx
 │   ├── Register.jsx
 │
 ├── store/
 │   └── useStore.js
 │
 ├── api/
 │   └── api.js
 │
 ├── components/
 │   └── Navbar.jsx
```

---

## 💡 Key Highlights

* ⚡ Real-time state updates using Zustand
* 🛡️ Defensive coding to prevent runtime errors
* 📱 Fully responsive UI
* 🎯 Clean and modular component structure

---

## 📌 Future Improvements

* Charts & analytics dashboard
* Authentication system
* Backend integration (Node.js / Express)
* Image-based snack UI

---

## 👨‍💻 Author

**Ayush Gupta **
Frontend Developer
