import express from 'express';
import products from './products';
import categories from './categories';
import auth from './auth';
import cart from './cart';
import order from './order';

const router = express.Router();

router.use('/products', products);

router.use('/categories', categories);

router.use('/auth', auth);

router.use('/cart', cart);

router.use('/order', order);

export default router;
