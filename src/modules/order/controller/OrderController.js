import path from 'path';
import { response, log } from 'helper';
import MyController from 'global/MyController';
import OrderModel from '../model/OrderModel';

class OrderController extends MyController {
    constructor() {
        super();
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    createOrder = async (req, res) => {
        try {
            const {
                products,
                orderTotal,
                updateProduct,
            } = await OrderModel.getProductsMap(req.body.products);

            const order = {
                user: req.user.id,
                order_number: `ODR_${Date.now()}`,
                products,
                payment_method: req.body.payment_method,
                address: req.body.address,
                orderTotal,
            };

            await OrderModel.createOrder(order, updateProduct);
            response.res200(res, null, null, 'Order added successfully');
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    }

    getOrder = async (req, res) => {
        try {
            const order = await OrderModel.getOrder(req.user.id);
            response.res200(res, order, null, 'Order created successfully');
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    }
}

export default new OrderController();
