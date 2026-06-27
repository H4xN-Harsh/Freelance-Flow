# FreelanceFlow 🚀

A full-stack freelance management tool built for freelancers to manage clients, projects, tasks, and invoices — all in one place.



## ✨ Features

### Auth
- Register & Login (email or username)
- Email verification with crypto token
- JWT Access Token (20 min) + Refresh Token (10 days)
- HttpOnly Cookie — XSS protected
- Rate limiting + Helmet security headers

### Clients
- Add clients with first project
- Smart duplicate handling — same client, new project added automatically
- Search clients by name
- Edit & delete client info
- Per-client project management

### Projects
- Add multiple projects per client
- Update project name, brief, amount, status
- Delete projects individually

### Tasks (Kanban)
- 3-column board — Todo, In Progress, Done
- Create tasks linked to client & project
- Update status via custom dropdown
- Inline edit — title & description
- Delete tasks

### Invoices
- Auto-generated invoice numbers (INV-YYYYMMDD-XXX)
- Create invoices linked to client & project
- Update status — Pending, Paid, Overdue
- Delete invoices

### Dashboard
- Total completed projects
- Total earnings
- Last month earnings
- Monthly earnings chart (Recharts)

## 🛠️ Tech Stack

**Frontend**
- React.js + Vite
- Tailwind CSS (glassmorphism design)
- Recharts (earnings chart)
- Axios (with interceptors)
- React Router DOM

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (email verification)
- Helmet + express-rate-limit

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account

### Installation

```bash
# Clone the repo
git clone https://github.com/H4xN-Harsh/Freelance-Flow

# Backend setup
cd backend
npm install

# Create .env file
cp .env.example .env
# Fill in your environment variables

npm run dev

# Frontend setup
cd ../frontend
npm install
npm run dev
```

### Environment Variables (Backend)

```env
MONGO_URI=your_mongodb_uri
ACCESS_TOKEN=your_access_token_secret
REFRESH_TOKEN=your_refresh_token_secret
EMAIL=your_gmail@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
CLIENT_URL=http://localhost:5173
PORT=5000
```

## 📁 Project Structure

```
Freelance-Flow/
├── backend/
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── clients/
│   │   │   ├── tasks/
│   │   │   ├── invoices/
│   │   │   └── dashboard/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── app.js
│   └── index.js
│
└── frontend/
    └── src/
        ├── pages/
        ├── components/
        ├── context/
        └── utils/
```

## 👨‍💻 Author

**Harsh**
- GitHub: [@H4xN-Harsh](https://github.com/H4xN-Harsh)
- LinkedIn: https://www.linkedin.com/in/harsh-singh-02354a416/

## 📄 License

MIT License