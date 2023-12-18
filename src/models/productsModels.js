import { Schema, model } from "mongoose";

const productSchema = Schema({
    image: {
        type: String,
        required: [true, 'La URL de la imagen es requerida']
    },
    size: {
        type: String,
        required: [true, 'Las medidas del producto son requeridas']
    },
    model: {
        type: String,
        required: [true, 'El modelo del producto es requerido']
    },
    description: {
        type: String,
        required: [true, 'La descripción del producto es requerida']
    },
    price: {
        type: Number,
        required: [true, 'El precio del producto es requerido']
    },
    stock: {
        type: Number,
        required: [true, 'El valor del producto es requerido']
    },
    shipping: {
        type: Boolean,
    },
    _id: {
        type: Number,
    }
});

const productModel = model('product', productSchema);

export default productModel;


