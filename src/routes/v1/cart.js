import express from 'express';
import CartController from 'modules/cart/controller/CartController';
import CartValidation from 'modules/cart/validation/CartValidation';
import { verifyTokenFromHeader } from 'config/passport';

const router = express.Router();

router.post('/products', CartValidation.listProducts, CartController.cartProducts);

router.post('/address', verifyTokenFromHeader, CartValidation.createAddress, CartController.createAddress);

router.get('/address', verifyTokenFromHeader, CartController.getAddress);

export default router;
