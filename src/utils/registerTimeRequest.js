const registerTimeRequest = (request, response, next) => {
    const now = new Date ();
    const time = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}: Ejecución a las ${now.getHours()}:${now.getSeconds()} hs`
    console.log(time);
    next()
};

export default registerTimeRequest;