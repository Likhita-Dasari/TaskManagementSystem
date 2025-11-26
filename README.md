<h1>Task Manager (Full-Stack App)</h1>

A simple task management app to Add, Edit (pre-filled), Delete, and View tasks using MongoDB, Node.js, Express, and React.

<h2>Description</h2>

Create tasks with title and description

Edit tasks with previous values auto-filled

Delete tasks

Data stored in MongoDB Atlas

First registered user can be made Admin manually in DB

<h2>Setup Instructions</h2>
# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev


<h2>API Endpoints</h2>
Method	Endpoint	Purpose
POST	/tasks	Add new task
GET	/tasks	Get all tasks
PUT	/tasks/:id	Update task by ID
DELETE	/tasks/:id	Delete task by ID



<h2>Tech Stack</h2>

Frontend: React.js

Backend: Node.js + Express.js

Database: MongoDB Atlas

ODM: Mongoose

Tools: VS Code extension
