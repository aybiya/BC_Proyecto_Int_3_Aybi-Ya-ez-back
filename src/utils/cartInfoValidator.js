const cartInfoValidator = (request, response, next) => {
    const { productId, quantity } = request.body;
    const validationArray = [];

    // Verificar si algún campo requerido está ausente o es un valor vacío
    if (productId === undefined || typeof productId !== 'number' || productId < 1) {
        validationArray.push('El ID del producto debe ser un número mayor o igual a 1');
    }
    
    if (quantity === undefined || typeof quantity !== 'number' || quantity < 1) {
        validationArray.push('La cantidad debe ser un número mayor o igual a 1');
    }

    // Verificar si hay algún error de validación
    if (validationArray.length > 0) {
        return response.status(400).json({ message: 'Error en la solicitud, corregir:', errors: validationArray });
    }

    next();
};

export default cartInfoValidator;
