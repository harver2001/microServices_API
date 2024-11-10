const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/post', createProxyMiddleware({
    target: 'http://localhost:4000',
    changeOrigin: true,
}));

app.use('/user', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
}));

app.listen(7000, () => {
    console.log('Proxy server is running on port 7000');
});
