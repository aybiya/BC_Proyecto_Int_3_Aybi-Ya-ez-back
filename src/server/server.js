import express from 'express';
import registerTimeRequest from '../utils/registerTimeRequest.js';
import router from '../routes/productRoutes.js';
import routeError from '../utils/routeError.js';
import routerShoppingCart from '../routes/shoppingCartRoutes.js';
import cors from 'cors';

//middlewares
const server = express();

//para poder usar fetch en el Front
server.use(cors('*'));
server.use(express.json());
server.use(registerTimeRequest);
server.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor');
  });
  server.use(router);
server.use(routerShoppingCart);

server.use(routeError)

export default server;