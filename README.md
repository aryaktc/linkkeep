# LinkKeep - Personal Bookmark Manager

# 🌐 LinkKeep — Personal Bookmark Manager

A modern, full-stack **web app** to save, organize, and search your favorite links — built with **React**, **Node.js/Express**, and **MongoDB**.  
It features **authentication**, **JWT security**, **CRUD bookmarks**, **search & filtering**, and a **beautiful animated dashboard**.

---

## 🚀 Live Demo (if applicable)
linkkeep-bookmark.vercel.app


---

## ✨ Features

### 🧭 Core
- 🔐 **JWT Authentication** (Register / Login / Logout)
- 📁 **CRUD Bookmarks** (add, edit, delete)
- 🏷️ **Tag-based filtering** and **search**
- 👤 **Profile Dashboard** (fetch/update user info)
- 🧾 **Form validation** (client + server)

### 💎 UI Enhancements
- 🎨 **Responsive TailwindCSS** design
- ⚡ **Framer Motion** page transitions
- 🔔 **React Hot Toast** notifications
- 🌗 **Light/Dark theme** toggle
- 🌀 **Loading skeletons & spinners** for smooth UX
- 🧩 **Animated bookmark cards** and hover effects

---

## 🧱 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React 18, TailwindCSS, Framer Motion, React Router, React Hot Toast |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Auth** | JWT + bcrypt |
| **UI Icons** | Lucide React |

---

## ⚙️ Project Structure

linkkeep/
├── backend/ # Node/Express API + MongoDB connection
│ ├── index.js
│ ├── routes/
│ ├── models/
│ └── .env
├── frontend/ # React + Tailwind UI
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── styles/
│ │ └── App.js
│ └── .env
└── README.md


---

## 🧩 Environment Variables

### 🔹 `frontend/.env`
```bash
REACT_APP_API_URL=http://localhost:4000

backend/.env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/linkkeep?retryWrites=true&w=majority
JWT_SECRET=mySuperSecretKey123
Installation & Setup
1️⃣ Clone the repo
git clone https://github.com/<your-username>/linkkeep.git
cd linkkeep

2️⃣ Backend setup
cd backend
npm install
npm run dev


✅ You should see Connected to MongoDB and Server running on port 4000

3️⃣ Frontend setup
cd ../frontend
npm install
npm start


✅ App runs at http://localhost:3000

💡 Usage

Register a new user

Log in to access the dashboard

Add, edit, or delete bookmarks

Filter by tags or search by title/description

Toggle 🌗 dark/light mode

Enjoy real-time feedback with animations and toast alerts

