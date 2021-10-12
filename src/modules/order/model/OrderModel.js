import path from 'path';
import MyModel from 'global/MyModel';
import { log, asyncForEach } from 'helper';
import mongoose from 'mongoose';

class CartModel extends MyModel {
    /**
     * Class default constructor
     */
    constructor() {
        super();
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    getProductsMap = async (data) => {
        try {
            const updateProduct = [];
            const products = [];
            let orderTotal = 0;
            const find = {
                _id: {
                    $in: data.map(({ id }) => mongoose.Types.ObjectId(id)),
                },
            };
            // eslint-disable-next-line prefer-destructuring
            const product = await this.ProductsTbl.find(find, [
                'price',
                'quantity',
            ]).lean();

            data.forEach((element) => {
                const temp = product.find((e) => e._id == element.id);
                products.push({
                    product: mongoose.Types.ObjectId(temp._id),
                    price: temp.price * element.quantity,
                    quantity: element.quantity,
                });
                updateProduct.push({
                    id: mongoose.Types.ObjectId(temp._id),
                    quantity: temp.quantity - element.quantity,
                });
                orderTotal += +temp.price * element.quantity;
            });

            return { products, orderTotal, updateProduct } || {};
        } catch (e) {
            log.error(null, e, this.file_path);
            throw e;
        }
    };

    createOrder = async (data, products) => {
        try {
            const address = await new this.OrdersTbl(data).save();
            asyncForEach(products, async (element) => {
                await this.ProductsTbl.findOneAndUpdate(
                    { _id: mongoose.Types.ObjectId(element.id) },
                    { quantity: element.quantity },
                );
            });
            return address || {};
        } catch (e) {
            log.error(null, e, this.file_path);
            throw e;
        }
    };

    getOrder = async (user) => {
        try {
            let orders = await this.OrdersTbl.find({ user }).populate({ path: 'products.product' });
            orders = orders.map((o) => o?.toObject({ getters: true }));
            return orders || {};
        } catch (e) {
            log.error(null, e, this.file_path);
            throw e;
        }
    };
}

export default new CartModel();
