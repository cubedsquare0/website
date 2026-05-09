const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});