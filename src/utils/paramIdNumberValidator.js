const paramIdNumberValidator = (request, response, next) => {
    if (!Number(request.params.id) > 0) {
      return response
        .status(400)
        .json({ message: "Error, el ID del producto debe ser un numero" });
    }
    next();
  };
  
  export default paramIdNumberValidator;
  