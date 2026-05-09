// script.js

let apiBase = 'http://cubesquared0server.cubedsquare0.workers.dev'; // Default, will be updated from config

// Load config from server
function loadConfig() {
  return fetch('/api/config')
    .then(response => response.json())
    .then(data => {
      apiBase = data.apiBase;
    })
    .catch(() => {
      // Keep default if fetch fails
    });
}

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
  fetch(`${apiBase}/api/news`)
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
  fetch(`${apiBase}/api/store`)
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

// Auth functionality
function showMessage(message, type = 'info') {
  const msgDiv = document.getElementById('message');
  msgDiv.innerHTML = `<p class="${type}">${message}</p>`;
  setTimeout(() => msgDiv.innerHTML = '', 5000);
}

function checkUser() {
  fetch(`${apiBase}/api/user`)
    .then(response => response.json())
    .then(data => {
      if (data.username) {
        document.getElementById('auth-forms').style.display = 'none';
        document.getElementById('user-info').style.display = 'block';
        document.getElementById('username').textContent = data.username;
      } else {
        document.getElementById('auth-forms').style.display = 'block';
        document.getElementById('user-info').style.display = 'none';
      }
    })
    .catch(() => {
      document.getElementById('auth-forms').style.display = 'block';
      document.getElementById('user-info').style.display = 'none';
    });
}

function login(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  fetch(`${apiBase}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    if (result.message) {
      showMessage(result.message, 'success');
      checkUser();
    } else {
      showMessage(result.error, 'error');
    }
  });
}

function signup(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  fetch(`${apiBase}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    if (result.message) {
      showMessage(result.message, 'success');
      document.getElementById('show-login').click();
    } else {
      showMessage(result.error, 'error');
    }
  });
}

function logout() {
  fetch(`${apiBase}/logout`, { method: 'POST' })
  .then(response => response.json())
  .then(result => {
    showMessage(result.message, 'success');
    checkUser();
  });
}

function toggleForm(show) {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  if (show === 'signup') {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  } else {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadConfig().then(() => {
    loadNews();
    loadStore();
    displayPosts();
    checkUser(); // Check user on page load
  });

  const cartToggle = document.getElementById('cart-toggle');
  if (cartToggle) {
    cartToggle.addEventListener('click', toggleCart);
  }

  const addPostBtn = document.getElementById('add-post-btn');
  if (addPostBtn) {
    addPostBtn.addEventListener('click', addPost);
  }

  // Auth event listeners
  const loginForm = document.getElementById('login');
  if (loginForm) {
    loginForm.addEventListener('submit', login);
  }

  const signupForm = document.getElementById('signup');
  if (signupForm) {
    signupForm.addEventListener('submit', signup);
  }

  const logoutBtn = document.getElementById('logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  const showSignup = document.getElementById('show-signup');
  if (showSignup) {
    showSignup.addEventListener('click', () => toggleForm('signup'));
  }

  const showLogin = document.getElementById('show-login');
  if (showLogin) {
    showLogin.addEventListener('click', () => toggleForm('login'));
  }
});
