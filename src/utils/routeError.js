const routeError = (request, response) => {
    response.status(404).json({
        message: `ERROR! El método ${request.method} no fue implementado
        porque hubo un ERROR EN LA RUTA: ${request.url}, chequearla`
    })
}

export default routeError;
