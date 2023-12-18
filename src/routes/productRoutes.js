import express from 'express';
import { getProductsController, getProductControllerByID, getProductControllerByModel, createProductController, updateProductController, deleteProductController } from '../controller/productController.js';
import productInfoValidator from '../utils/productInfoValidator.js';
import paramIdNumberValidator from '../utils/paramIdNumberValidator.js';

const router = express.Router(); 

// Leer LOS productos
router.get('/products', getProductsController);

// Leer el producto x id
router.get('/products/:id', paramIdNumberValidator, getProductControllerByID);

// Leer el producto x modelo
router.get('/products-model/:model', getProductControllerByModel);

// Agregar un producto 
router.post('/products', productInfoValidator, createProductController);

// Actualizar el producto x id - actualizar la lista
router.put('/products/:id', paramIdNumberValidator, productInfoValidator, updateProductController);

// Eliminar el producto x id
router.delete('/products/:id', paramIdNumberValidator, productInfoValidator, deleteProductController);

export default router;