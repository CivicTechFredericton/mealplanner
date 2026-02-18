const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/auth',
		createProxyMiddleware({
			target: 'http://127.0.0.1:4000',
			changeOrigin: false,	// keep Host: localhost:3333
			xfwd: true,				// add X-Forwarded-* headers
		})
	);
};
