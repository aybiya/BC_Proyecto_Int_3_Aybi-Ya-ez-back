const productInfoValidator = (request, response, next) => {
    const { image, size, model, description, price, stock, id } = request.body;
    const validationArray = [];

    // Verificar si algún campo requerido está ausente o es un valor vacío
    if (!image || typeof image !== 'string') validationArray.push('La imagen del producto es requerida y debe ser un string.');
    if (!size || typeof size !== 'string') validationArray.push('El tamaño del producto es requerido y debe ser un string.');
    if (!model || typeof model !== 'string') validationArray.push('El modelo del producto es requerido y debe ser un string.');
    if (!description || typeof description !== 'string') validationArray.push('La descripción del producto es requerida y debe ser un string.');
    if (price === undefined || typeof price !== 'number') validationArray.push('El precio es requerido y debe ser un número.');
    if (price < 1) validationArray.push('El valor del precio debe ser mayor a 1.');
    if (stock === undefined || stock < 1) validationArray.push('El stock es requerido y debe ser mayor a 1.');
    if (id !== undefined && typeof id !== 'number') validationArray.push('El ID debe ser un número.');

    // Verificar si hay algún error de validación
    if (validationArray.length > 0) {
        return response.status(400).json({ message: 'Error al cargar producto, corregir:', errors: validationArray });
    }

    next();
};

export default productInfoValidator;
