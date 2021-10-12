import express from 'express';
import OrderController from 'modules/order/controller/OrderController';
import OrderValidation from 'modules/order/validation/OrderValidation';
import { verifyTokenFromHeader } from 'config/passport';

const router = express.Router();

router.post('/create', verifyTokenFromHeader, OrderValidation.createOrder, OrderController.createOrder);

router.get('/list', verifyTokenFromHeader, OrderController.getOrder);

export default router;
