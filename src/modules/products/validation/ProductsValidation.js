import path from 'path';
import Joi from '@hapi/joi';
import { log, response } from 'helper';
import { constants } from 'config';
import db from 'collections/index';
import mongoose from 'mongoose';

class ProductsValidation {
    /**
   * Class default constructor
   */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * Check if category exist
     *
     * @param {String} value
     */
    validCategory = async (value) => {
        if (value) {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error(constants.messages.validations.invalidCategory);
            }
            const category = await db.CategoriesTbl.findById(value)
                .lean();
            if (!category) {
                throw new Error(constants.messages.validations.invalidCategory);
            }
        }
        return value;
    };

    /**
     * Check if category exist
     *
     * @param {String} value
     */
    validCategoryBySlug = async (value) => {
        if (value) {
            const category = await db.CategoriesTbl.find({ slug: value })
                .lean();
            if (!category) {
                throw new Error(constants.messages.validations.invalidCategory);
            }
        }
        return value;
    };

    /**
     * Check if product exist
     *
     * @param {String} value
     */
    validProduct = async (value) => {
        if (value) {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error(constants.messages.validations.invalidProduct);
            }
            const category = await db.ProductsTbl.findById(value)
                .lean();
            if (!category) {
                throw new Error(constants.messages.validations.invalidProduct);
            }
        }
        return value;
    };

    /**
     * Create product validations
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    createProduct = async (req, res, next) => {
        if (req.file_error) {
            response.res422(res, req.file_error);
        } else {
            try {
                const schema = Joi.object({
                    name: Joi.string().min(3).max(100)
                        .required(),
                    description: Joi.string().max(500),
                    price: Joi.number().required(),
                    category: Joi.string().required()
                        .external(this.validCategory),
                    quantity: Joi.number().required(),

                });
                try {
                    const images = [];
                    req?.files?.images?.forEach((ele) => {
                        images.push(ele?.path);
                    });
                    req.images = images;
                    req.cover_image = req?.files?.cover_image?.[0]?.path;
                    const { error } = await schema.validateAsync(req.body);
                    error ? response.res422(res, error.details[0].message) : next();
                } catch (exp) {
                    response.res422(res, exp.message);
                }
            } catch (e) {
                log.error(res, e, this.file_path);
            }
        }
    };

    /**
     * List product validations
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    listProduct = async (req, res, next) => {
        if (req.file_error) {
            response.res422(res, req.file_error);
        } else {
            try {
                const schema = Joi.object({
                    category: Joi.string()
                        .external(this.validCategoryBySlug),
                    products: Joi.array(),
                    limit: Joi.number(),
                    page: Joi.number(),
                });
                try {
                    const { error } = await schema.validateAsync(req.body);
                    error ? response.res422(res, error.details[0].message) : next();
                } catch (exp) {
                    response.res422(res, exp.message);
                }
            } catch (e) {
                log.error(res, e, this.file_path);
            }
        }
    };

    /**
     * Update product validations
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    updateProduct = async (req, res, next) => {
        if (req.file_error) {
            response.res422(res, req.file_error);
        } else {
            try {
                const schema = Joi.object({
                    id: Joi.string().required()
                        .external(this.validProduct),
                    name: Joi.string().min(3).max(100)
                        .required(),
                    description: Joi.string().max(500),
                    price: Joi.number().required(),
                    category: Joi.string().required()
                        .external(this.validCategory),
                    quantity: Joi.number().required(),
                });
                try {
                    const images = [];
                    req?.files?.images?.forEach((ele) => {
                        images.push(ele?.path);
                    });
                    req.images = images;
                    req.cover_image = req?.files?.cover_image?.[0]?.path;
                    const { error } = await schema.validateAsync({ ...req.body, ...req.params });
                    error ? response.res422(res, error.details[0].message) : next();
                } catch (exp) {
                    response.res422(res, exp.message);
                }
            } catch (e) {
                log.error(res, e, this.file_path);
            }
        }
    };
}

export default new ProductsValidation();
