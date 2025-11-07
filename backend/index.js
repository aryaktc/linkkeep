require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const bookmarkRoutes = require('./routes/bookmarks');
const { authMiddleware } = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', authMiddleware, profileRoutes);
app.use('/api/bookmarks', authMiddleware, bookmarkRoutes);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> console.log('Server running on port', PORT));
  })
  .catch(err=> {
    console.error('Mongo connection error', err);
  });
