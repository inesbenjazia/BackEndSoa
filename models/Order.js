const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema ({
    userID : {type: String , required: true},
    customerID : {type: String , required: true},
    productID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity : {type: Number , required: true},
    subtotal :  {type: Number , required: true},
    total: {type: Number , required: true},
    delivery_status: {type: Number , default: "pending"},
    payment_status: {type: String , required: true},

},{timestamps: true});

module.exports = mongoose.model("Order", OrderSchema)
