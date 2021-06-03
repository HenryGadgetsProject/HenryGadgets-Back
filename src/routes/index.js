const { Router } = require('express');

// Importar todos los routers;
// const AuthenticationRouter = require('../middlewares/auth');
const CategoryRouter = require('./category');
const OrderRouter = require('./order');
const CartRouter = require('./cart');
const ProductRouter = require('./product');
const UserRouter = require('./user');
const SearchRouter = require('./search');
const Payment = require('./payment');
const MeRouter = require('./me');
const PromoteRouter = require('./promote');
const forcePassword = require('./forcePassword');
const Email = require('./email');
const Signup = require('./auth');
const Branch = require('./branch');
const Newsletter = require('./newsletter');
const Offers = require('./offers')

const router = Router();

// Configurar los routers
// router.use('/', AuthenticationRouter)
router.use('/categories', CategoryRouter);
router.use('/promote', PromoteRouter);
router.use('/me', MeRouter);
router.use('/cart', CartRouter);
router.use('/orders', OrderRouter);
router.use('/products', ProductRouter);
router.use('/users', UserRouter);
router.use('/search', SearchRouter);
router.use('/payment', Payment);
router.use('/forcepassword', forcePassword);
router.use('/auth', Signup);
router.use('/payment', Payment);
router.use('/email', Email);
router.use('/branch', Branch);
router.use('/newsletter', Newsletter);
router.use('/offer', Offers)

module.exports = router;
