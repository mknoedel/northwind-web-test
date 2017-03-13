'use strict';

let path = require('path');
var db = require(path.resolve('./app/config/db.config'));

/**
 * Product class for use with database
 */
class Product {
  /**
   * Constructor for the product class with the following
   * @param {object}  obj The object that will be used to create the product
   *   @property {number}   id            Product database ID
   *   @property {string}   name          Product name
   *   @property {number}   categoryId    Database ID of the product's category
   *   @property {number}   unitPrice     Price per unit
   *   @property {number}   unitsOnOrder  Units currently on order
   *   @property {boolean}  discontinued  Whether the unit is discontinued
   * @return {Product}    The created product object
   */
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.categoryId = obj.categoryId;
    this.unitPrice = obj.unitPrice;
    this.unitsInStock = obj.unitsInStock;
    this.discontinued = obj.discontinued;
  }

  /**
   * Creates a product in the database and returns a promise object and sets the
   * id of the product object to the returned database id
   * @returns  {promise}  Promise for database insertion
   * SIDE EFFECTS: sets id property to database id
   */
  create() {
    return db.one('INSERT INTO products(productname, categoryid, unitprice, ' +
      'unitsinstock, discontinued) ' +
      'VALUES(${name}, ${categoryId}, ${unitPrice}, ${unitsInStock}, ' +
      '${discontinued}) returning productid', this)
      .then(data => this.id = data.productid);
  }

  /**
   * Converts a product received from the database into a Product object
   * @param   {object} dbProduct product object from the database
   * @returns {Product}          Product object
   */
  static convertFromDbProduct(dbProduct) {
    return new Product({
      id: dbProduct.productid,
      name: dbProduct.productname,
      categoryId: dbProduct.categoryid,
      unitPrice: dbProduct.unitprice,
      unitsInStock: dbProduct.unitsinstock,
      discontinued: dbProduct.discontinued
    });
  }

  static isValidId(id) {
    if(isNaN(id)) {
      return false;
    }
    return true;
  }

  /**
   * Deletes a product from the database with the given ID. Resolves to the result
   * of the postgres delete.
   * @param   {number}  id  ID of the product to be deleted
   * @returns {promise}     promise for database deletion that resolves to the query result
   */
  static delete(id) {
    return db.result('DELETE FROM products WHERE productid=${id}', {id: id});
  }

  /**
   * Retrieves a product from the database with the given ID. Throws an error if
   * one is not found
   * @param   {number}  id ID of the product to Retrieves
   * @returns {promise}    Promise object that resolves to a Product
   */
  static get(id) {
    return db.one('SELECT * FROM products WHERE productid=${id}', {id: id})
      .then(data => Product.convertFromDbProduct(data));
  }

  /**
   * Retrieves all products from the database
   * @returns {promise} Promise object that resolves to an array of Product objects
   */
  static list() {
    return db.any('SELECT * FROM products')
      .then(data => data.map(dbProduct => Product.convertFromDbProduct(dbProduct)));
  }
}

module.exports = Product;
