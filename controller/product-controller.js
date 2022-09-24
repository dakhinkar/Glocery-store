
const { v4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Product = require('../models/product');

const getProductsList = async (req, res, next) => {
    let products;
    try {
        products = await Product.find();
    } catch (err) {
        const error = new HttpError(
      'Fetching product failed, please try again later',
      500
    );
    return next(error);
    }
    res.json({ products: products.map(product => product.toObject({ getters: true })) });
}

const createProduct = async (req, res, next) => {
    const errorResult = validationResult(req);
    
    if (!errorResult.isEmpty())
    {
        const error = new HttpError('Invalid inputs passed, please check your data.', 422);
        return next(error);
    }

    const { productCategory, productInfo, price, quantityAvailable } = req.body;
    const createdProduct = new Product(
        {
            productCategory,
            productInfo,
            price,
            quantityAvailable,
        });
    
    try {
        await createdProduct.save();
    } catch (err) {
         const error = new HttpError(
      'Creating Product failed, please try again.',
      500
    );
    return next(error);
    }
    res.status(201).json({product: createdProduct});
};

const updateProduct = async(req, res, next) => {
    const errorResult = validationResult(req);
    
    if (!errorResult.isEmpty())
    {
        const error = new HttpError('Invalid inputs passed, please check your data.', 422);
        return next(error);
    }
    const { productId } = req.params;
    const { price } = req.body;
    
    let product;
    try {
        product = await Product.findById(productId);
    } catch (err) {
        const error = new HttpError(
      'Something went wrong, could not update Product.',
      500
    );
    return next(error); 
    }

    product.price = price;

    try {
        await product.save();
    } catch (err) {
        const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
    }
    res.status(200).json({product: product.toObject({getters: true})});
}

exports.getProductsList = getProductsList;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct
