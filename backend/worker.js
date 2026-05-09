// worker.js - Cloudflare Worker for API

const news = [
  { title: 'New Update Released', date: '2023-10-01', content: 'Exciting new features in the latest update.' },
  { title: 'Community Event', date: '2023-09-15', content: 'Join us for a special community event.' }
];

const storeItems = [
  { id: 1, name: 'Minecraft Java Edition', price: 29.99 },
  { id: 2, name: 'Minecraft Bedrock Edition', price: 29.99 },
  { id: 3, name: 'Skin Pack', price: 4.99 }
];

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (url.pathname === '/api/news') {
    return new Response(JSON.stringify(news), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  if (url.pathname === '/api/store') {
    return new Response(JSON.stringify(storeItems), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  return new Response('Not Found', { status: 404, headers: corsHeaders });
}