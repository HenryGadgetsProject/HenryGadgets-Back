const { Router } = require('express');

// Importar todos los routers;
const CategoryRouter = require('./category');
const OrderRouter = require('./order');
const ProductRouter = require('./product');
const ReviewRouter = require('./review');
const UserRouter = require('./user');
const SearchRouter = require('./search')


const router = Router();

// Configurar los routers
router.use('/categories', CategoryRouter);
router.use('/orders', OrderRouter);
router.use('/products', ProductRouter);
router.use('/reviews', ReviewRouter);
router.use('/users', UserRouter);
router.use('/search', SearchRouter);

module.exports = router;