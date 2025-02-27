# Blog Platform

## 🚀 Introduction
A full-stack Blog Platform built using the **MERN stack** with user authentication, blog creation, and interactive features like comments and likes.

---

## 📌 Features
- **User Authentication**: Secure authentication using JWT and password hashing.
- **Blog Management**: Create, read, update, and delete blog posts with categories.
- **Image Uploads**: Supports image uploads for blog posts.
- **Tag-Based Categorization**: Organize blogs by tags for better filtering.
- **Comments & Likes**: Users can interact with posts through comments and likes.
- **Responsive UI**: Mobile-friendly design inspired by Panini8’s theme.


---

## 🏗 Tech Stack
**Frontend:** React, Styled Components, Tailwind CSS  
**Backend:** Node.js, Express, MongoDB  
**Authentication:** JWT  
**Database:** MongoDB 
**Others:**  bcrypt (password hashing)

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/blog-platform.git
cd blog-platform
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
#### Set up environment variables:
Create a `.env` file in the backend directory and add:
```env
PORT=5000
MONGO_URI=your link
JWT_SECRET=your secret
UPLOADS_DIR=./uploads
```
Run the backend server:
```sh
npm start
```

### 3️⃣ Frontend Setup
```sh
cd ../frontend
npm install
```
Run the frontend server:
```sh
npm start
```



---

## 📡 API Endpoints

### 🔑 **Authentication**
| Method | Endpoint          | Description         |
|--------|------------------|---------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and receive a token |

### 📝 **Blog Posts**
| Method | Endpoint            | Description              |
|--------|--------------------|--------------------------|
| GET    | `/api/posts`       | Get all blog posts      |
| GET    | `/api/posts/:id`   | Get a single post       |
| POST   | `/api/posts`       | Create a new blog post  |
| PUT    | `/api/posts/:id`   | Update a blog post      |
| DELETE | `/api/posts/:id`   | Delete a blog post      |

### 📸 **Image Upload**
| Method | Endpoint        | Description            |
|--------|----------------|------------------------|
| POST   | `/api/upload`  | Upload an image file  |

### 💬 **Comments & Likes**
| Method | Endpoint                | Description               |
|--------|--------------------------|---------------------------|
| POST   | `/api/posts/:id/comment` | Add a comment to a post   |
| POST   | `/api/posts/:id/like`    | Like a blog post          |

---
## 📬 Contact
For any queries, contact **rajaiswaldev24@gmail.com** 📩

---

### 📌 Developed by Raj Jaiswal(https://github.com/rajaiswal6544)

