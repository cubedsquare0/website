# Cubed Square Website

A modern, responsive website for Cubed Square, featuring a sleek dark theme with green accents, inspired by blocky adventures.

## Features

- **Home Page**: Hero section with featured content.
- **Store**: Product listings with shopping cart functionality.
- **News**: Dynamic news articles loaded from API.
- **Community**: Forum for user posts (client-side storage).
- **Support**: FAQ section.
- **Account**: Basic login form.
- **Play**: Game mode information.
- **Gallery**: Image gallery.
- **About**: Game description.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express (for local dev) or Cloudflare Workers (for production)
- **Deployment**: Cloudflare Pages (frontend) and Cloudflare Workers (backend)

## Installation

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/cubedsquare0/website.git
   cd website
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   npm start
   ```

3. Open `http://localhost:3000` in your browser.

### Production Deployment

- **Frontend**: Deploy `frontend/` folder to Cloudflare Pages.
- **Backend**: Deploy `backend/worker.js` to Cloudflare Workers. Update `API_BASE` in `frontend/js/script.js` to your Worker URL.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Security

See [SECURITY.md](SECURITY.md) for security policies.