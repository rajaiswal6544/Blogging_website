
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');
const likeRoutes = require("./routes/likeRoutes");
const path = require('path');
dotenv.config();
connectDB();

const app = express();
app.use(
    cors({
      origin:["http://localhost:3000", "https://blogging-website-frontend-two.vercel.app/"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true, // Allow cookies if needed
    })
  );
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use("/api", likeRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Blog Platform API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));