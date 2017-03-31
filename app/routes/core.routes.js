'use strict';
/**
 * Import this last, as it contains the wildcard route
 */
var path = require('path');
module.exports = function (app) {
  var core = require(path.resolve('./app/controllers/core.controller'));
  app.route('/signin').get(core.index);
  app.route('/signup').get(core.index);
  app.route('/signout').get(core.index);
  app.route('/forgot').get(core.index);
  app.route('/signup-congrats').get(core.index);
  app.route('/category').get(core.index);
  app.route('/category/new').get(core.index);
  app.route('/product').get(core.index);
  app.route('/product/new').get(core.index);
};
