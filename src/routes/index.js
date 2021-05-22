const { Router } = require('express');

// Importar todos los routers;
// const AuthenticationRouter = require('../middlewares/auth');
const CategoryRouter = require('./category');
const OrderRouter = require('./order');
const CartRouter = require('./cart');
const ProductRouter = require('./product');
const UserRouter = require('./user');
const SearchRouter = require('./search');
const LoginRouter = require('./login')
const RegisterRouter = require('./register')
const Payment = require('./payment')
const MeRouter = require('./me');
const PromoteRouter = require('./promote');

const router = Router();

// Configurar los routers
// router.use('/', AuthenticationRouter)
router.use('/categories', CategoryRouter);
router.use('/promote', PromoteRouter)
router.use('/me', MeRouter)
router.use('/cart', CartRouter)
router.use('/orders', OrderRouter);
router.use('/products', ProductRouter);
router.use('/users', UserRouter);
router.use('/search', SearchRouter);
router.use('/login', LoginRouter)
router.use('/register', RegisterRouter)
router.use('/payment', Payment)

module.exports = router;
