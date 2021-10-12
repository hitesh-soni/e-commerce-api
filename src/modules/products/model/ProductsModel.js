import path from 'path';
import MyModel from 'global/MyModel';
import { log } from 'helper';
import mongoose from 'mongoose';

class ProductsModel extends MyModel {
    /**
     * Class default constructor
     */
    constructor() {
        super();
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * Get list of products with pagination and category filter
     * @param {Object} query
     * @returns {Object}
     */
    index = async (query) => {
        try {
            query = this.deepSanitize(query);
            const limit = query?.limit || 10;
            const page = query?.page || 1;
            let products = [];
            let find = {};
            if (query?.category) {
                const categoryDetail = await this.CategoriesTbl.findOne({
                    slug: query?.category,
                }).lean();
                find = { category: categoryDetail._id };
            }
            if (query?.products) {
                find._id = {
                    $in: query?.products.map((id) => mongoose.Types.ObjectId(id)),
                };
            }
            // eslint-disable-next-line prefer-destructuring
            products = (
                await this.ProductsTbl.aggregate([
                    {
                        $facet: {
                            result: [
                                { $match: find },
                                { $skip: limit * (page - 1) },
                                { $limit: +limit },
                                {
                                    $project: {
                                        name: 1,
                                        description: 1,
                                        quantity: 1,
                                        cover_image: 1,
                                        slug: 1,
                                        price: 1,
                                    },
                                },
                                {
                                    $addFields: {
                                        cover_image_url: {
                                            $concat: [process.env.BASE_URL, '$cover_image'],
                                        },
                                    },
                                },
                            ],
                            count: [{ $match: find }, { $count: 'count' }],
                        },
                    },
                ])
            )[0];
            const count = products?.count?.[0]?.count;
            return {
                data: products?.result,
                meta: {
                    total_count: count,
                    page_number: page,
                    limit,
                    next_page: page * limit < count,
                },
            };
        } catch (e) {
            log.error(null, e, this.file_path);
            throw e;
        }
    };

    /**
     * Get single product with nested category
     * @param {Object} query
     * @returns {Object}
     */
    getSingleProduct = async (query) => {
        try {
            query = this.deepSanitize(query);
            let product = await this.ProductsTbl.findOne({ slug: query?.slug }, [
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

            product = product?.toObject({ getters: true });
            delete product?.images;
            delete product?.cover_image;
            return product || {};
        } catch (e) {
            log.error(null, e, this.file_path);
            throw e;
        }
    };

    /**
     * Create new product
     * @param {Object} data
     */
    createProduct = async (data) => {
        try {
            data = this.deepSanitize(data);
            await new this.ProductsTbl(data).save();
        } catch (e) {
            log.error(null, e, this.file_path);
            throw e;
        }
    };

    /**
     * Update existing product
     * @param {Object} data
     */
    updateProduct = async (data, id) => {
        try {
            data = this.deepSanitize(data);
            id = this.deepSanitize(id);
            await this.ProductsTbl.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(id) },
                data
            );
        } catch (e) {
            log.error(null, e, this.file_path);
            throw e;
        }
    };
}

export default new ProductsModel();
