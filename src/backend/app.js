const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = 3001;
const HOST = 'localhost';
const API_SERVICE_URL = 'https://www.dcard.tw/service/api/v2';

app.use(
  '/my-service',
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/my-service`]: '',
    },
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
  }),
);

app.listen(PORT, HOST, () => {
  console.log(`hello:${HOST}:${PORT}`);
});
