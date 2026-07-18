<div align="center">

# 💬 FlowChat

### Modern Real-Time Messaging Application

A full-stack real-time chat application built with **React**, **Node.js**, **Express**, **MongoDB**, **Socket.IO**, and **Clerk Authentication**.

> Connect instantly. Chat beautifully.

[Live Demo](https://flowchat.vercel.app) • [Report Bug](../../issues) • [Request Feature](../../issues)

---

</div>

## 📸 Preview

> _Screenshots coming soon_

| Landing Page | Dashboard |
|--------------|-----------|
| ![](docs/home.png) | ![](docs/dashboard.png) |

| Sign In | Chat |
|----------|------|
| ![](docs/signin.png) | ![](docs/chat.png) |

---

# ✨ Features

### 🔐 Authentication

- Secure authentication with Clerk
- Sign Up / Sign In
- Persistent sessions
- Protected routes

### 👥 Friends

- Search users
- Send friend requests
- Accept requests
- Decline requests
- Remove friends

### 💬 Messaging

- Real-time messaging with Socket.IO
- Conversation history
- Read receipts
- Typing indicators
- Unread message badges
- Emoji picker

### 🟢 Presence

- Online status
- Offline status
- Active conversations

### 🎨 UI / UX

- Modern responsive interface
- Beautiful landing page
- Professional authentication pages
- Sidebar navigation
- Smooth hover animations
- Mobile friendly

---

# 🛠 Tech Stack

## Frontend

- React 19
- Tailwind CSS
- React Router
- Clerk
- Socket.IO Client
- React Hot Toast
- Lucide Icons

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Socket.IO
- Clerk SDK

---

# 🏗 Architecture

```
             Clerk Authentication
                     │
                     ▼
             Express Backend
                     │
      ┌──────────────┴──────────────┐
      ▼                             ▼
 Socket.IO Server              MongoDB Atlas
      ▲
      │
React Frontend
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/yourusername/FlowChat.git
```

```bash
cd FlowChat
```

---

## Install dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd server
npm install
```

---

## Environment Variables

### Client

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_API_URL=
```

### Server

```env
CLERK_SECRET_KEY=
MONGODB_URI=
CLIENT_URL=
PORT=
```

---

## Start the application

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

---

# 📂 Folder Structure

```
FlowChat
│
├── client
│   ├── components
│   ├── hooks
│   ├── pages
│   ├── services
│   └── utils
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── socket
│
└── README.md
```

---

# 📖 What I Learned

Building FlowChat helped me gain practical experience with:

- Designing a full-stack application architecture
- Real-time communication using Socket.IO
- Authentication with Clerk
- MongoDB data modeling
- Building reusable React components
- Managing application state
- Creating responsive user interfaces
- Improving user experience through iterative UI design
- Deploying modern web applications

---

# 🔮 Future Improvements

- 📎 File sharing
- 🖼 Image messages
- 👤 User profiles
- 🌙 Dark mode
- 🔍 Conversation search
- 📌 Pinned conversations
- 🎙 Voice messages
- 📱 Progressive Web App (PWA)

---

# 💻 Local Development

```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

---

# 🌐 Live Demo

### 🚀 https://flowchat.vercel.app

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork this repository and submit a pull request.

---

# 👨‍💻 Author

### Andreas Karapanos

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile

---

<div align="center">

Made with ❤️ using React, Express, MongoDB, Socket.IO & Clerk

⭐ If you enjoyed this project, consider giving it a star.

</div>