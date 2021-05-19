const { Router } = require('express');

// Importar todos los routers;
const CategoryRouter = require('./category');
const OrderRouter = require('./order');
const ProductRouter = require('./product');
const UserRouter = require('./user');
const SearchRouter = require('./search');
const LoginRouter = require('./login')
const RegisterRouter = require('./register')
const Payment = require('./payment')


const router = Router();

// Configurar los routers
router.use('/categories', CategoryRouter);
router.use('/orders', OrderRouter);
router.use('/products', ProductRouter);
router.use('/users', UserRouter);
router.use('/search', SearchRouter);
router.use('/login', LoginRouter)
router.use('/register', RegisterRouter)
router.use('/payment', Payment)

module.exports = router;
