const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const HttpError = require('./model/http-error');
const productRoutes = require('./routes/product-routes');
const customerRouts = require('./routes/customers-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/product/', productRoutes);

app.use('/api/customer', customerRouts )
app.use((req, res, next) => {
    const error = new HttpError('Could not found this page', 404);
    throw error;
});
app.use((error, req, res, next) => {
    if (res.headerSet) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occured!" });
});

mongoose.connect("mongodb://127.0.0.1:27017/groceryStore").then(() => {
    console.log("Successfully connected");
    app.listen(5000);

}).catch((err) => {
    console.log("Not able to connect.", err );
});










