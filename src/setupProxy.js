const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/ajax',
        createProxyMiddleware({
            target: 'https://m.maoyan.com',
            changeOrigin: true,
            onProxyReq: (proxyReq, req, res) => {
                console.log('Proxy Request:', req.url);
            },
            onProxyRes: (proxyRes, req, res) => {
                console.log('Proxy Response:', proxyRes.statusCode, proxyRes.headers);
            },
        })
    );
};

