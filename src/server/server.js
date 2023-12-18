import express from 'express';
import registerTimeRequest from '../utils/registerTimeRequest.js';
import router from '../routes/productRoutes.js';
import routeError from '../utils/routeError.js';
import routerShoppingCart from '../routes/shoppingCartRoutes.js';
import cors from 'cors';

//middlewares
const server = express();
server.use(cors('*'));

server.use(express.json());
server.use(registerTimeRequest);
server.use(router);
server.use(routerShoppingCart);

server.get('/', (req, res) => {
    res.send('Hello, welcome to the API!');
  });

server.use(routeError)

export default server;