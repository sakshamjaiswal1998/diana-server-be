const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    order_id: String,
    username: String,
    order_subtotal: Number,
    shipping: Number,
    taxes: Number,
    order_total: Number,
    payment_method: String,
    transaction_id: String,
    cart: String, // Replace with Cart Object _id later
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },







    // Ordername: String,
    // email: String,
    // password: String,
    // image: {
    //     type: String,
    //     required: false,
    // },
    // roles: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "role"
    //   }
    // ]
});
const Order = mongoose.model('order', OrderSchema);

module.exports = Order