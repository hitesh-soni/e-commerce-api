import path from 'path';
import { response, log } from 'helper';
import MyController from 'global/MyController';
import CartModel from '../model/CartModel';

class CartController extends MyController {
    constructor() {
        super();
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    cartProducts = async (req, res) => {
        try {
            const products = await CartModel.products(req.body.products);
            response.res200(res, products, null);
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    }

    createAddress = async (req, res) => {
        try {
            const address = await CartModel.createAddress({ ...req.body, user_id: req.user.id });
            response.res200(res, address, null, 'Address added successfully');
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    }

    getAddress = async (req, res) => {
        try {
            const address = await CartModel.getAddress(req.user.id);
            response.res200(res, address, null, 'Category created successfully');
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    }
}

export default new CartController();
