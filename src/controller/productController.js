import { 
    getProductsService,
    getProductByIdService,
    createProductService,
    updateProductService,
    deleteProductService,
    getProductByModelService
 } from "../service/productService.js";

// Leer LOS productos x id
const getProductsController = async (request, response) => {
    try {
        const products = await getProductsService(request);

        if (products.length === 0){
            return response.status(404).json({ message: "No se encontraron productos" });
        }

        response.json(products);
    } catch (error) {
        response.status(500).json({ message: error.message, statusCode: 500 });
    }
}

// Leer el productos x id
const getProductControllerByID = async (request, response) => {
    try {
        const productId = request.params.id;
        const product = await getProductByIdService(productId);

        if (!product) {
            return response.status(404).json({ message: "No se encontró el producto" });
        }

        response.json(product);
    } catch (error) {
        response.status(500).json({ message: error.message, statusCode: 500 });
    }
};

// Leer el productos x id
const getProductControllerByModel = async (request, response) => {
    try {
        const product = await getProductByModelService(request);

        if(!product) {
            return response.status(404).json({message: "No se encontró ese modelo de producto"})
        }

        response.json(product);
      } catch (error) {
        response.status(500).json({ message: error.message, statusCode: 500 });
        
      }
}

// Agregar un producto x id - actualizar la lista
const createProductController = async (request, response) => {
    try {
      const createProduct = await createProductService(request);
      console.log('Solicitud POST a /products recibida')
      if (!createProduct || createProduct.message) {
        // Manejar el error, puede ser un mensaje de error
        return response.status(404).json({ message: createProduct.message || "Error al querer cargar el producto" });
      }
  
      response.json(createProduct);
    } catch (error) {
      response.status(500).json({ message: error.message, statusCode: 500 });
    }
  };
  

// Actualizar el producto x id
const updateProductController = async (request, response) => {
    try {
        const updateProduct = await updateProductService(request);

        if(!updateProduct) {
            return response.status(404).json({message: `Error al querer actualizar el producto ${id}`});
            
        }

        response.json(updateProduct);
      } catch (error) {
        response.status(500).json({ message: error.message, statusCode: 500 });
      }
}

// Eliminar el producto x id
const deleteProductController = async (request, response) => {
    try {
        const deleteProduct = await deleteProductService(request);

        if(!deleteProduct) {
            return response.status(404).json({message: "Error al querer eliminar el producto"});
        }

        response.json(deleteProduct);
      } catch (error) {
        response.status(500).json({ message: error.message, statusCode: 500 });
      }
}


export { getProductsController, getProductControllerByID, getProductControllerByModel, createProductController, updateProductController, deleteProductController };