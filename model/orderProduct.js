const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema for order item , join with user and product collections
const orederProductSchema = new Schema(
    {
         customerId: {
                type: mongoose.Types.ObjectId,
            required: true,
                ref: 'User'
            },
        productList: [{
            productId: {
                type: mongoose.Types.ObjectId,
            required: true,
                ref: 'Product'
            }
        }
        ],
        totalPrice: {
            type: Number,
            required: true
        },
        paymentInfo: {
            status: {
                type: String,
                required : true
            }
        },
        quantity: {
            type: Number,
            required: true
        },
         date: {
                type: Date,
                required: true,
            },
        paymentType: {
            type: String,
            required : true
        },
    }
);

module.exports = mongoose.model('OrderList', orederProductSchema)

