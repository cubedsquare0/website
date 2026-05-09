const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory user storage (for demo purposes)
const users = [];

// Apply rate limiting to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('trust proxy', 1);
app.use(session({
  secret: 'cubed-square-secret-key', // Change this in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Add more routes as needed
app.get('/store', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/store.html'));
});

app.get('/news', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/news.html'));
});

app.get('/community', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/community.html'));
});

app.get('/support', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/support.html'));
});

app.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/account.html'));
});

app.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/play.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/gallery.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/about.html'));
});

// API for news (simple JSON)
app.get('/api/news', (req, res) => {
  const news = [
    { title: 'New Update Released', date: '2023-10-01', content: 'Exciting new features in the latest update.' },
    { title: 'Community Event', date: '2023-09-15', content: 'Join us for a special community event.' }
  ];
  res.json(news);
});

// API for store items
app.get('/api/store', (req, res) => {
  const items = [
    { id: 1, name: 'Minecraft Java Edition', price: 29.99 },
    { id: 2, name: 'Minecraft Bedrock Edition', price: 29.99 },
    { id: 3, name: 'Skin Pack', price: 4.99 }
  ];
  res.json(items);
});

// API for config
app.get('/api/config', (req, res) => {
  res.json({ apiBase: process.env.API_BASE || 'http://localhost:3000' });
});

// Auth routes
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const existing = users.find(u => u.username === username);
  if (existing) return res.status(400).json({ error: 'User already exists' });
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.json({ message: 'Signup successful' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  req.session.user = username;
  res.json({ message: 'Login successful' });
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out' });
  });
});

app.get('/api/user', (req, res) => {
  if (req.session.user) {
    res.json({ username: req.session.user });
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});