const { Router } = require('express');

// Importar todos los routers;
// const AuthenticationRouter = require('../middlewares/auth');
const CategoryRouter = require('./category');
const OrderRouter = require('./order');
const CartRouter = require('./cart');
const ProductRouter = require('./product');
const UserRouter = require('./user');
const SearchRouter = require('./search');
const RegisterRouter = require('./register')
const Payment = require('./payment')
const PromoteRouter = require('./promote');
const forcePassword = require('./forcePassword');
const Email = require('./email');
const ReviewRouter = require('./reviews')
const Server = require('./auth')

const router = Router();

// Configurar los routers
// router.use('/', AuthenticationRouter)
router.use('/reviews', ReviewRouter);
router.use('/categories', CategoryRouter);
router.use('/promote', PromoteRouter);
router.use('/cart', CartRouter);
router.use('/orders', OrderRouter);
router.use('/products', ProductRouter);
router.use('/users', UserRouter);
router.use('/search', SearchRouter);
router.use('/payment', Payment)
router.use('/forcepassword', forcePassword)
router.use('/register', RegisterRouter);
router.use('/payment', Payment);
router.use('/email', Email);
router.use('/auth', Server)


module.exports = router;
