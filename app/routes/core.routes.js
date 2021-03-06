'use strict';
/**
 * Import this last, as it contains the wildcard route
 */
let appRoot = require('app-root-path');

module.exports = function (app) {
  let core = require(appRoot + '/app/controllers/core.controller');
  if(process.env.NODE_ENV === 'development') {
    app.route('/').get(core.index);
    app.route('/signin').get(core.index);
    app.route('/signup').get(core.index);
    app.route('/signout').get(core.index);
    app.route('/unauthorized').get(core.index);
    app.route('/forgot').get(core.index);
    app.route('/home').get(core.index);
    app.route('/categories').get(core.index);
    app.route('/categories/new').get(core.index);
    app.route('/categories/:categoryId/products').get(core.index);
    app.route('/categories/:categoryId/products/new').get(core.index);
    app.route('/categories/:categoryId/products/edit/:productId').get(core.index);
    app.route('/categories/:categoryId/products/detail/:productId').get(core.index);
    app.route('/categories/detail/:categoryId').get(core.index);
    app.route('/categories/edit/:categoryId').get(core.index);
    app.route('/products').get(core.index);
    app.route('/products/new').get(core.index);
    app.route('/products/edit/:productId').get(core.index);
    app.route('/products/detail/:productId').get(core.index);
    app.route('/products/:productId').get(core.index);
  } else {
    app.route('*').get(core.index);
  }
};
