
const { Router } = require('express');
const { check} = require('express-validator');

const {getProductsList, createProduct,updateProduct} = require('../controller/product-controller');

const router = Router();

// get all products
router.get('/', getProductsList);

// to create new product => productCategory, productInfo, price, quantityAva
router.post('/', [
    check('productCategory').trim().notEmpty().isLength({ min: 3 }),
    check('productInfo').notEmpty(),
    check('price').trim().notEmpty().isLength({ min: 1 }),
    check('quantityAvailable').trim().notEmpty().isLength({ min: 1 }),
], createProduct);

// to update product based on productId
router.patch('/:productId',[
    check('price').trim().notEmpty().isLength({ min: 1 })
    ],
    updateProduct)

module.exports = router;



