const mongoose = require('mongoose');

// Create
const OrderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        order_number: String,
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
                price: Number,
                quantity: Number,
            },
        ],
        payment_method: String,
        address: String,
        orderTotal: Number,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Orders', OrderSchema, 'Orders');
