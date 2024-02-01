const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const target = 'https://wowzers2.netlify.app';
const oldTarget = 'https://hello-world-restless-hat-0190.alappan077.workers.dev';

// Create the proxy middleware for main target
const mainProxy = createProxyMiddleware({
  target,
  changeOrigin: true, // Needed for virtual hosted sites
  logLevel: 'debug',
});

// Create proxy middleware for /old/
const oldProxy = createProxyMiddleware({
  target: oldTarget,
  changeOrigin: true,
  pathRewrite: {
    '^/old/': '/', // remove /old/ from the request path
  },
  logLevel: 'debug',
});

// Create proxy middleware for /old/v1/
const oldV1Proxy = createProxyMiddleware({
  target: `${oldTarget}/v1`,
  changeOrigin: true,
  pathRewrite: {
    '^/old/v1/': '/', // remove /old/v1/ from the request path
  },
  logLevel: 'debug',
});

// Create proxy middleware for /old/v2/
const oldV2Proxy = createProxyMiddleware({
  target: `${oldTarget}/v2`,
  changeOrigin: true,
  pathRewrite: {
    '^/old/v2/': '/', // remove /old/v2/ from the request path
  },
  logLevel: 'debug',
});

// Use the proxy middleware for all requests
app.use('/', mainProxy);
app.use('/old/', oldProxy);
app.use('/old/v1/', oldV1Proxy);
app.use('/old/v2/', oldV2Proxy);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
