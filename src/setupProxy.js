const { createProxyMiddleware } = require('http-proxy-middleware');

const add = (app, path, target) =>
  app.use(
    path,
    createProxyMiddleware({
      target: `http://localhost:3333${target || path}`,
      // changeOrigin: true,
    }),
  );

module.exports = app => {
  add(app, '/admin');
  add(app, '/login', '');
  add(app, '/graphql');
};
