import Cart from '../models/shoppingCartModel.js';
import {getProductByIdService} from '../service/productService.js';

//mostrar el carrito
const getCartService = async () => {
    try {
        // Obtener el carrito (no se necesita el usuario)
        const cart = await Cart.findOne();

        if (!cart) {
            // Si no hay un carrito, indicar que está vacío
            return 'Carrito vacío';
        }

        // Si hay un carrito, devolver la lista de productos en el carrito
        return cart.items;
    } catch (error) {
        throw new Error(`Error al obtener el carrito: ${error.message}`);
    }
};

// Agregar un producto al carrito
const addToCartServices = async (productId, quantity) => {
    try {
        // Obtener información del producto sin modificar la base de datos
        const productInfo = await getProductByIdService(productId);

        // Obtener el carrito (no se necesita el usuario)
        let cart = await Cart.findOne();

        if (!cart) {
            // Si no hay un carrito, crear uno nuevo con items inicializado como un array vacío
            const newCart = new Cart({ items: [] });
            cart = await newCart.save();
        }

        // Buscar si el producto ya está en el carrito
        const existingProductIndex = cart.items.findIndex(item => item.product.id === productId);

        if (existingProductIndex !== -1) {
            // Calcular la cantidad total que habría si se actualiza con la nueva cantidad
            const totalQuantity = cart.items[existingProductIndex].quantity + quantity;

            // Verificar si la cantidad total supera el stock disponible
            if (totalQuantity > productInfo.stock) {
                throw new Error('La cantidad total supera el stock disponible del producto');
            }

            // Si no supera el stock, actualizar la cantidad existente con la nueva cantidad
            cart.items[existingProductIndex].quantity = totalQuantity;
        } else {
            // Si el producto no está en el carrito, agregarlo
            // Verificar si la nueva cantidad supera el stock disponible
            if (quantity > productInfo.stock) {
                throw new Error('La cantidad elegida supera el stock disponible del producto');
            }
            
            const cartItem = {
                product: {
                    model: productInfo.model,
                    size: productInfo.size,
                    description: productInfo.description,
                    id: productInfo._id,
                },
                quantity: quantity,
            };

            // Asegúrate de que cart.items esté inicializado como un array antes de llamar a push
            cart.items = cart.items || [];
            cart.items.push(cartItem);
        }

        await cart.save();

        return cart;
    } catch (error) {
        throw new Error(`Error al actualizar el carrito: ${error.message}`);
    }
};

//Eliminar un producto del carrito
const removeFromCartServices = async (productId, quantity) => {
    try {
        // Obtener el carrito (no se necesita el usuario)
        let cart = await Cart.findOne();

        if (!cart) {
            throw new Error('No hay un carrito para eliminar productos');
        }

        // Buscar el índice del producto en el carrito
        const productIndex = cart.items.findIndex(item => item.product.id === productId);

        if (productIndex === -1) {
            throw new Error('El producto no está en el carrito');
        }

        // Verificar si la cantidad a eliminar es mayor que la existente en el carrito
        if (quantity > cart.items[productIndex].quantity) {
            throw new Error('La cantidad a eliminar es mayor que la existente en el carrito');
        }

        // Actualizar la cantidad del producto en el carrito
        cart.items[productIndex].quantity -= quantity;

        // Eliminar el producto del carrito si la cantidad es 0
        if (cart.items[productIndex].quantity === 0) {
            cart.items.splice(productIndex, 1);
        }

        await cart.save();

        return cart;
    } catch (error) {
        throw new Error(`Error al eliminar producto del carrito: ${error.message}`);
    }
};

//Borrar carrito
const cleanCartService = async () => {
    try {
        // Buscar y eliminar el carrito en la base de datos
        const cleanedCart = await Cart.findOneAndDelete();

        return cleanedCart;
    } catch (error) {
        throw new Error(`Error al limpiar el carrito: ${error.message}`);
    }
};

const cartFrontService = async (cartData) => {

    // Guardar el nuevo producto en la base de datos
    await newProductToDb.save();
    try {
      // Crea un nuevo pedido en la base de datos usando el modelo de Order
      const newOrder = new Order({
            product: {
                id: productInfo._id,
                quantity: productInfo.quantity
            },
      });
  
      // Guarda el nuevo pedido en la base de datos
      const savedOrder = await newOrder.save();
  
      return savedOrder;
    } catch (error) {
        console.error(error);
        throw new Error('Error al procesar el pedido desde el frontend');
      }
  };

  const readCartFrontService = async () => {
    try {
      // Lógica para leer los datos del carrito desde la base de datos
      const cartData = await Cart.findOne();
  
      // Si no hay datos en el carrito, puedes devolver un mensaje o un objeto vacío según tu necesidad
      if (!cartData) {
        return { message: 'El carrito está vacío' };
      }
  
      // Si hay datos, devuelve los datos del carrito
      return cartData;
    } catch (error) {
      throw new Error(`Error al leer los datos del carrito: ${error.message}`);
    }
  };

export  { getCartService, addToCartServices, removeFromCartServices, cleanCartService, cartFrontService, readCartFrontService };
