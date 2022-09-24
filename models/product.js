const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 
// product schema
const productSchema = new Schema({
    productCategory: { type: String, required: true },
    productInfo: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        imgSrc: { type: String, required: true },
        availbleSize: { type: String, required: true },
        color: { type: String, required: true },
        storage: { type: String, required: false },
        ram: { type: String, required: false },
        camera: {
            front: { type: String, required: false } ,
            rear: { type: String, required: false }
        }
    },
    price: { type: Number, required: true },
    quantityAvailable: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema)