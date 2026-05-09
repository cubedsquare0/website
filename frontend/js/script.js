// script.js

const API_BASE = 'http://localhost:3000'; // For local testing with Node.js backend. Replace with your Cloudflare Worker URL for production.

// Cart functionality
let cart = [];

function addToCart(itemId, name, price) {
  cart.push({ id: itemId, name, price });
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItems = document.getElementById('cart-items');
  if (cartItems) {
    cartItems.innerHTML = cart.map(item => `<li>${item.name} - $${item.price}</li>`).join('');
  }
}

function toggleCart() {
  const cart = document.getElementById('cart');
  cart.style.display = cart.style.display === 'none' ? 'block' : 'none';
}

// Load news dynamically
function loadNews() {
  fetch(`${API_BASE}/api/news`)
    .then(response => response.json())
    .then(data => {
      const newsContainer = document.getElementById('news-container');
      if (newsContainer) {
        newsContainer.innerHTML = data.map(article => `
          <div class="news-article">
            <h3>${article.title}</h3>
            <p>${article.date}</p>
            <p>${article.content}</p>
          </div>
        `).join('');
      }
    });
}

// Load store items
function loadStore() {
  fetch(`${API_BASE}/api/store`)
    .then(response => response.json())
    .then(data => {
      const storeContainer = document.getElementById('store-container');
      if (storeContainer) {
        storeContainer.innerHTML = data.map(item => `
          <div class="store-item">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <button onclick="addToCart(${item.id}, '${item.name}', ${item.price})">Add to Cart</button>
          </div>
        `).join('');
      }
    });
}

// Simple forum functionality
let posts = JSON.parse(localStorage.getItem('posts')) || [];

function addPost() {
  const postText = document.getElementById('post-text').value;
  if (postText) {
    posts.push({ text: postText, date: new Date().toLocaleString() });
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
    document.getElementById('post-text').value = '';
  }
}

function displayPosts() {
  const postsContainer = document.getElementById('posts-container');
  if (postsContainer) {
    postsContainer.innerHTML = posts.map(post => `
      <div class="forum-post">
        <p>${post.text}</p>
        <small>${post.date}</small>
      </div>
    `).join('');
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadNews();
  loadStore();
  displayPosts();

  const cartToggle = document.getElementById('cart-toggle');
  if (cartToggle) {
    cartToggle.addEventListener('click', toggleCart);
  }

  const addPostBtn = document.getElementById('add-post-btn');
  if (addPostBtn) {
    addPostBtn.addEventListener('click', addPost);
  }
});