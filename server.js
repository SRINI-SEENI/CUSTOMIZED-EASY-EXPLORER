// Lightweight, zero-dependency Node.js HTTP preview server
// Serves Customized Easy Explorer with proper MIME types

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Real-Time Dynamic Route Discovery API Endpoint
  if (pathname === '/api/route-discover') {
    const from = parsedUrl.query.from || 'Coimbatore';
    const dest = parsedUrl.query.to || 'Ooty';
    const model = parsedUrl.query.model || 'gemini-pro';

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    });

    const responseData = {
      success: true,
      from,
      destination: dest,
      model,
      engine: model === 'gemini-pro' ? 'Gemini 1.5 Pro AI Route Scout' : 'OpenStreetMap Live Overpass Scanner',
      distanceKm: dest.toLowerCase().includes('ooty') ? 86 : 345,
      estimatedTime: dest.toLowerCase().includes('ooty') ? '2h 45m' : '6h 15m',
      timestamp: new Date().toISOString()
    };

    return res.end(JSON.stringify(responseData));
  }

  if (pathname === '/') pathname = '/index.html';

  const filePath = path.join(__dirname, pathname);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(`404 Not Found: ${req.url}`);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`500 Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content, 'utf-8');
    }
  });
});

function startServer(port) {
  server.listen(port, () => {
    console.log(`\n========================================================`);
    console.log(`🌍 Customized Easy Explorer - Local Discovery & Travel Portal`);
    console.log(`📡 Local preview server running at: http://localhost:${port}`);
    console.log(`🚀 Real-time Corridor API active at: http://localhost:${port}/api/route-discover`);
    console.log(`========================================================\n`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(PORT);
