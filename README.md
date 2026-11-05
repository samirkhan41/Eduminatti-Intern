# Eduminatti Intern

A full-stack web application developed to provide an interactive and user-friendly educational and internship platform. Built with modern web technologies, focusing on responsive design, efficient backend APIs, and seamless user experience.

## 🌐 Live Demo

**Website:** https://eduminatti-intern.vercel.app/

## 🚀 Features

- Responsive and user-friendly interface
- Modern frontend architecture
- Backend API integration
- Database connectivity with MongoDB
- Dynamic application functionality
- Secure authentication using JWT (if implemented)
- Optimized frontend and backend structure

## 🛠️ Tech Stack

**Frontend**
- React.js
- JavaScript
- Tailwind CSS
- Vite

**Backend**
- Node.js
- Express.js
- REST APIs
- JWT Authentication (if implemented)

**Database**
- MongoDB
- Mongoose

**Deployment**
- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database

## 📁 Project Structure

```text
Eduminatti-Intern/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── package.json
│   └── server.js
│
└── README.md
```

*Note: The structure above is illustrative. Adjust it according to the actual project files.*

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/samirkhan41/Eduminatti-Intern.git
cd Eduminatti-Intern
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend

Open another terminal:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm start
```

If no start script exists, use:

```bash
node server.js
```

## 🌍 Deployment

- Frontend: https://eduminatti-intern.vercel.app/
- Backend: Deployed on Render (configure the actual backend URL).
- Database: MongoDB Atlas.

## 🔐 Environment Variables

Configure the required environment variables before running the application.

Never commit your `.env` file or expose database credentials, API keys, or JWT secrets.

## 👨‍💻 Author

**Samir Khan**

- GitHub: https://github.com/samirkhan41
- Portfolio: https://samirk.site

## 📄 License

This project is available for educational and development purposes. Add an appropriate license before permitting reuse or redistribution.

---

⭐ If you find this project interesting, consider giving the repository a star!
