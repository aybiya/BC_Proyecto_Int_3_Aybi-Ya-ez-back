// cartModel.js
import { Schema, model } from "mongoose";

const cartItemSchema = new Schema({
    product: {
        model: String,
        size: String,
        description: String,
        _id: String,

    },
    quantity: {
        type: Number,
        required: true,
    },
});

const cartSchema = new Schema({
    items: [cartItemSchema],
});

const Cart = model('Cart', cartSchema);

export default Cart;
