const { validationResult} = require('express-validator');
const { v4 } = require('uuid');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getCustomersList = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        const error = new HttpError(
      'Fetching customers List failed, please try again later.',
      500
    );
    return next(error);
    }
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
    
}

const createCustomer = async (req, res, next) => {
    const errorResult = validationResult(req);
    if (!errorResult.isEmpty()) {
        const error = new HttpError('Invalid inputs passed, please check your data.', 422);
        return next(error);
    }

    const { email, phone, name } = req.body;

    let existingCustomer;
    try {
        existingCustomer = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
      'Failed to create new user, please try again later.',
      500
    );
    return next(error); 
    }

    if (existingCustomer) {
        const error = new HttpError("Email id already exist, Please provide new email id", 422);
        return next(error);
    }
    const createdUser = new User({
        name,
        email,
        phone
    });

    try {
        await createdUser.save();
    } catch (err) {
          const error = new HttpError(
      'Failed to create new user, please try again later.',
      500
    );
    return next(error); 
    }
    
    res.status(201).json({ user: createdUser.toObject({getters : true}) });
}

exports.getCustomersList = getCustomersList;
exports.createCustomer = createCustomer;
