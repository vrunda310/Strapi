'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/custom-auth/register',
      handler: 'custom-auth.register', // This must match controller method name
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    }
  ]
};