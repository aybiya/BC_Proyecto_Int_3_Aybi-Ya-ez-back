import {writeFile} from 'fs/promises';
import readDatabase from '../utils/readDatabase.js'
import productModel from '../models/productsModels.js';

const getProductsService = async () => {
  try {
      const products = await productModel.find();
      return products;
  } catch (error) {
      console.error('Error en getProductsService:', error.message);
      throw new Error('Error interno del servidor al obtener productos');
  }
};

const getProductByIdService = async (id) => {
  try {
      const productId = Number(id);

      const product = await productModel.findOne({ _id: productId });

      if (!product) {
          return { message: 'No se encontró el producto' };
      }

      return product;
  } catch (error) {
      console.error('Error en getProductByIdService:', error.message);
      throw new Error('Error interno del servidor al obtener el producto por ID');
  }
};

const getProductByModelService = async (request) => {
  try {
      const model = request.params.model;

      // Realiza la búsqueda por modelo
      const products = await productModel.find({ model });

      // Verificar si no se encontraron productos
      if (products.length === 0) {
          return { message: 'No se encontró ese modelo de producto' };
      }

      return products;
  } catch (error) {
      console.error('Error en getProductByModelService:', error.message);
      throw new Error('Error interno del servidor al buscar productos por modelo');
  }
};

const createProductService = async (request) => {
  try {
      const newProductData = request.body;

      // Verificar si el producto ya existe por el id (si id es único)
      const existingProduct = await productModel.findById(newProductData.id);
      if (existingProduct) {
          return { message: 'El producto con este ID ya existe.' };
      }

      const newProductToDb = new productModel({
          image: newProductData.image,
          size: newProductData.size,
          model: newProductData.model,
          description: newProductData.description,
          price: newProductData.price,
          stock: newProductData.stock,
          _id: newProductData.id,
          shipping: newProductData.shipping
      });

      // Guardar el nuevo producto en la base de datos
      await newProductToDb.save();

      return { message: 'Producto agregado correctamente' };
  } catch (error) {
      console.error('Error en createProductsService:', error.message);
      throw new Error('Error interno del servidor'); 
  }
};

const updateProductService = async (request) => {
  const id = Number(request.params.id);
  try {
      const updateProduct = request.body;

      const product = await productModel.findOneAndUpdate({ _id: id }, updateProduct);

      if (!product) {
          return undefined;
      }

      return { message: "Producto actualizado" };
  } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error');
  }
};


const deleteProductService = async (request) => {
  try {
      const id = Number(request.params.id);
      const deleteProduct = await productModel.deleteOne({ _id: id });

      if (deleteProduct.deleteCount === 0){
        return response.json({ message: "No se encontró el producto que deseas eliminar" });
      }
  
      return { message: "Producto eliminado con éxito." };
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}


export { 
    getProductsService,
    getProductByIdService,
    getProductByModelService,
    createProductService,
    updateProductService,
    deleteProductService
 };
