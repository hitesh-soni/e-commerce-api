import path from 'path';
import MyModel from 'global/MyModel';
import { log } from 'helper';
import mongoose from 'mongoose';

class CartModel extends MyModel {
    /**
     * Class default constructor
     */
    constructor() {
        super();
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    products = async (products) => {
        try {
            products = this.deepSanitize(products);
            const find = {
                _id: {
                    $in: products.map((id) => mongoose.Types.ObjectId(id)),
                },
            };
            // eslint-disable-next-line prefer-destructuring
            let product = await this.ProductsTbl.find(find, [
                'tag_id',
                'name',
                'description',
                'image_url',
                'price',
                'images',
                'category',
                'cover_image',
                'cover_image_url',
                'quantity',
            ]);

            product = product.map((o) => o?.toObject({ getters: true }));
            delete product?.images;
            delete product?.cover_image;
            return product || {};
        } catch (e) {
            log.error(null, e, this.file_path);
            throw e;
        }
    };

    createAddress = async (data) => {
        try {
            data = this.deepSanitize(data);
            const address = await new this.AddressTbl(data).save();
            return address || {};
        } catch (e) {
            log.error(null, e, this.file_path);
            throw e;
        }
    };

    getAddress = async (user_id) => {
        try {
            user_id = this.deepSanitize(user_id);
            const address = await this.AddressTbl.find({ user_id }).lean();
            return address || {};
        } catch (e) {
            log.error(null, e, this.file_path);
            throw e;
        }
    };
}

export default new CartModel();
