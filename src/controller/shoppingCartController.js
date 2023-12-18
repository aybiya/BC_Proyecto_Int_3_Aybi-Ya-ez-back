import { getCartService, addToCartServices, removeFromCartServices, cleanCartService, cartFrontService, readCartFrontService } from '../service/shoppingCartServices.js';

const getCartController = async (request, response) => {
    try {
        // Llamar a la función para obtener el carrito
        const cartContent = await getCartService();

        // Responder con el contenido del carrito
        response.json({ cartContent });
    } catch (error) {
        response.status(500).json({ message: error.message, statusCode: 500 });
    }
};

const addToCartController = async (request, response) => {
    try {
        const { productId, quantity } = request.body;

        // Validar que productId y quantity estén presentes en la solicitud
        if (!productId || !quantity) {
            return response.status(400).json({ message: 'Se requieren productId y quantity' });
        }

        const updatedCart = await addToCartServices(productId, quantity);

        response.json(updatedCart);
    } catch (error) {
        response.status(500).json({ message: error.message, statusCode: 500 });
    }
};


const removeFromCartController = async (request, response) => {
    try {
        const { productId, quantity } = request.body;

        // Validar que productId y quantity estén presentes en la solicitud
        if (!productId || !quantity) {
            return response.status(400).json({ message: 'Se requieren productId y quantity' });
        }

        const updatedCart = await removeFromCartServices(productId, quantity);

        // Responder con el mensaje de éxito
        response.json({ message: 'Producto eliminado exitosamente', cart: updatedCart });
    } catch (error) {
        response.status(500).json({ message: error.message, statusCode: 500 });
    }
};


const cleanCartController = async (request, response) => {
    try {
        // Llamar a la función para limpiar el carrito
        const cleanedCart = await cleanCartService();

        // Responder con el carrito limpio en formato JSON
        response.json(cleanedCart);
    } catch (error) {
        // Manejar cualquier error y responder con un código de estado 500 junto con un mensaje de error
        response.status(500).json({ message: error.message, statusCode: 500 });
    }
};

const cartFrontController = async (req, res) => {
    try {
        const { items } = req.body; // Supongo que los datos del carrito están en el cuerpo de la solicitud

        // Crear un nuevo carrito con los productos validados por el frontend
        const newCart = new Cart({ items });

        // Guardar el carrito en la base de datos
        const savedCart = await newCart.save();

        res.status(201).json({ message: 'Pedido almacenado con éxito', cart: savedCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al procesar el pedido', error: error.message });
    }
};
  

  const readCartDataFrontController = async (req, res) => {
    try {
      // Llama a la función para obtener el carrito desde el servicio
      const cartData = await readCartFrontService();
  
      // Responder con los datos del carrito en formato JSON
      res.json(cartData);
    } catch (error) {
      // Manejar errores y responder con un código de estado 500
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los datos del carrito', error: error.message });
    }
  };
  
export { getCartController, addToCartController, removeFromCartController, cleanCartController, cartFrontController, readCartDataFrontController };