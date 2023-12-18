import express from 'express';
import { getCartController, addToCartController, removeFromCartController, cleanCartController, cartFrontController, readCartDataFrontController } from '../controller/shoppingCartController.js';
import cartInfoValidator from '../utils/cartInfoValidator.js';

const routerShoppingCart = express.Router(); 

// ver productos del carrito
routerShoppingCart.get('/shopping-cart', getCartController);
// agregar producto al carrito
routerShoppingCart.post('/shopping-cart',cartInfoValidator, addToCartController);
// eliminar producto del carrito
routerShoppingCart.delete('/shopping-cart',cartInfoValidator, removeFromCartController);

// guardar datos del carrito del front
routerShoppingCart.get('/cart', readCartDataFrontController);
// guardar datos del carrito del front
routerShoppingCart.post('/cart', cartFrontController);

// borrar todos los productos del carrito
routerShoppingCart.delete('/clean-cart', cleanCartController);

export default routerShoppingCart;



