# ClassMate – Student Team Members Management Application

A full-stack web application to manage student team members. Users can add, view, edit, and delete team member profiles, including uploading profile images. Built with React.js, Node.js, Express, and MongoDB.

---

## 📌 Project Features

- Add a new team member with profile photo
- View all team members in a list or card layout
- View full details of each member
- Edit member details
- Delete a member profile
- Responsive, user-friendly interface
- Image uploads handled via Multer (stored in uploads/ folder)

---

## ⚙ Technologies Used

- *Frontend*: React.js, Axios, React Router
- *Backend*: Node.js, Express.js, Multer, MongoDB
- *Database*: MongoDB with MongoDB Compass
- *Tools*: Visual Studio Code, Git, GitHub

---

## 🚀 Installation Steps

1. *Clone the Repository*

bash
git clone https://github.com/chinmayeeparuchuri/Khao.git
cd Khao


2. *Setup Backend*

bash
cd backend
npm install


- Create a .env file in /backend and add:

MONGODB_URI=your_mongodb_connection_string
PORT=5001


3. *Setup Frontend*

bash
cd frontend
npm install


4. **Backend package.json Scripts**

json
"scripts": {
  "start": "nodemon server.js"
}


---

## 🔁 API Endpoints

### Member APIs

| Method | Endpoint            | Description                     |
|--------|---------------------|---------------------------------|
| POST   | /api/members      | Add a new member (with image)   |
| GET    | /api/members      | Get list of all members         |
| GET    | /api/members/:id  | Get details of a single member  |
| PUT    | /api/members/:id  | Update details of a member      |
| DELETE | /api/members/:id  | Delete a member profile         |

- Images are stored in /backend/uploads and served via static route.
- JSON responses are returned for all endpoints.

---

## ▶ How to Run the App

### 1. Start Backend Server

bash
cd backend
npm start


Server will run on http://localhost:5001

### 2. Start Frontend App

bash
cd frontend
npm start


React app will run on http://localhost:3000

---

## 📁 Project Structure


/frontend        # React frontend code
/backend         # Express backend code
README.md        # Project documentation
.gitignore


---

## 📝 Team Info

- Team Name: *Khao*
- Project Name: *ClassMate*

---
