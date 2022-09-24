const { validationResult} = require('express-validator');
const { v4 } = require('uuid');

const  OrderList = require('../models/orderProduct');
const HttpError = require('../models/http-error')
const User = require('../models/user');

const getOrderList = async(req, res, next) => {
    const { customerId } = req.params;
    let orderList;
    try {
        orderList = await OrderList.find({customerId : customerId })
    } catch (err) {
             const error = new HttpError(
      'Fetching customer order list failed, please try again later',
      500
        );
    return next(error);    
    }
     if (!orderList) {
        const error = new HttpError("No Order item found", 422);
        return next(error);
    }
    res.json({ orderList: orderList.map(product => product.toObject({ getters: true })) })
    
}

const creatNewOrder = async(req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        const error = new HttpError('Invalid inputs passed, please check your data.', 422);
        return next(error);
    }

    const {customerId, productList, totalPrice, paymentType  } = req.body;

    let customer;
    try {
        customer = await User.findById(customerId);
    } catch (err) {
        const error = new HttpError(
      'User is not created.',
      422
    );
    return next(error);  
    }

    if (!customer) {
      const error = new HttpError("User is not created", 422);
        return next(error);  
    }

    const date = new Date().toISOString();
    const createdNewOrder = new OrderList({
        customerId,
        productList,
        paymentInfo: {
            status: "success"
        },
        quantity: productList.length,
        date,
        totalPrice,
        paymentType
    });


    try {
        await createdNewOrder.save();
    } catch (err) {
         const error = new HttpError(
      'Failed to create new user, please try again later.',
      500
    );
    return next(error); 
    }

     res.status(201).json({ user: createdNewOrder.toObject({getters : true}) });

}

const getMaxOrder = async (req, res, next) => {
    const { customerId, year} = req.params;
    let yearDate = `${year}-01-01`;
    let nextYearDate = `${year + 1}-01-01`;
    let productsList;
    try {
        productsList = await OrderList.find({
            $and: [
            {
                date: {$gte : new Date(yearDate)}
            },
            {
               date: {$lt : new Date(nextYearDate)}  
            },
            {
                customerId: {
                    $eq: customerId
                }    
            }
            ]
        })
    } catch (err) { 
         const error = new HttpError(
      'Failed to product details, please try again later.',
      500
    );
    return next(error); 
    }

    let count = productsList.reduce((acc, product) => { return acc + product.quantity }, 0);
    res.json({
        products: productsList,
    count});
}

exports.getOrderList = getOrderList;
exports.creatNewOrder = creatNewOrder;
exports.getMaxOrder = getMaxOrder;








