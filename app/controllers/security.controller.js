'use strict';

let appRoot = require('app-root-path');
let Product = require(appRoot + '/app/models/product.model.js');
let ApiError = require(appRoot + '/app/models/api-error.model');

/**
 * Function using passport to check if the user is currently authenticated.
 * Add this to routes that require authentication. Sends a 401 status on failure
 */
exports.requireLogin = function(req, res, next) {
  if(!req.isAuthenticated()) {
    return ApiError.getApiError(1200)
      .then(apiErr => res.status(401).send(apiErr));
  }
	next();
};

/**
 * Function to check if the user is authorized to modify product categories.
 * Only call this check after an authentication check.
 */
exports.requireAdmin = function(req, res, next) {
  if (req.user.isAdmin) {
    return next();
  }
  return ApiError.getApiError(1250)
    .then(apiErr => res.status(403).send(apiErr));
};

// TODO document
exports.checkIfOwner = function(req, res, next) {
  return Product.read(req.product.id)
    .then(dbProduct => {
      if(dbProduct.createdBy === req.user.id) {
        req.productOwner = true;
      }
      return next();
    });
};

// require security for products

exports.requireProductSecurity = function (req, res, next) {
  if (req.isAdmin || req.productOwner) {
    return next();
  }
  return ApiError.getApiError(1250)
    .then(apiErr => res.status(403).send(apiErr));
};
