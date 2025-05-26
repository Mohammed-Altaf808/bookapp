# 📚 Book Management App (MEN Stack)

This is a full-stack **Book Management Application** built using the **MEN** (MongoDB, Express.js, Node.js) stack. The application allows users to sign up, log in, and manage a personal collection of books (create, read, update, delete).

## 🚀 Features

- User authentication (sign up / sign in)
- Add and update books with images
- View book details
- Delete books
- Protected user pages

## 🧠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Templating**: EJS (currently)
- **Frontend**: Being migrated to React

---

## 🛠️ Project Structure

bookapp/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── index.js
├── frontend/
│ └── (React app here)
├── views/
│ └── (EJS templates)



---

## ⚠️ Migration In Progress: EJS → React

We're currently transitioning the frontend from EJS templates to a modern **React.js** application.

### ✅ Done so far:

- Backend API routes are working
- MongoDB models and image upload system is functional
- Login page built in React (under testing)

### ❗ We need help with:

- Migrating all EJS pages to React components
- Connecting React with Express APIs
- Handling routing (React Router)
- Managing user sessions/token-based auth

---

## 🧑‍💻 How to Contribute

If you're experienced with React or want to learn by doing, contributions are welcome!

1. Fork the repo
2. Create a new branch: `git checkout -b migrate-ejs-to-react`
3. Help convert EJS views to React components
4. Submit a pull request!

Feel free to raise an issue if you need clarification on any part of the codebase.

---

## 📦 Installation

```bash
# Backend
cd backend
npm install
npm run dev  # or nodemon index.js

# Frontend (React)
cd frontend
npm install
npm start

