const { Router } = require('express');
const { check } = require('express-validator');

const { createCustomer, getCustomersList } = require('../controller/customer-controller');
const { getOrderList, getMaxOrder, creatNewOrder } = require('../controller/orderList-controller');

const router = Router();

// create customer => email, phone, name
router.post('/', [
    check('email').trim().notEmpty().contains('@').isLength({ min: 5 }),
    check('phone').trim().notEmpty().isLength({ min: 6 }),
    check('name').trim().notEmpty().isLength({ min: 3 })
], createCustomer);

// get customerList
router.get('/', getCustomersList);

// To create new order , container customerId, productList, totalPrice, paymentType
router.post('/orders/', [
     check('customerId').trim().notEmpty(),
    check('productList').isLength({ min: 1 }),
    check('totalPrice').trim().notEmpty().isLength({ min: 3 }),
    check('paymentType').trim().notEmpty().isLength({ min: 3 })
], creatNewOrder);


// get oerder list based on customer
router.get('/orders/:customerId', getOrderList);

// count order list by year and customerId
router.get('/orders/:customerId/:year', getMaxOrder);

module.exports = router;



