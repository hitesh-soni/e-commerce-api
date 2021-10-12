import path from 'path';
import Joi from '@hapi/joi';
import { log, response } from 'helper';
import mongoose from 'mongoose';
import { constants } from 'config';

class CartValidation {
    /**
   * Class default constructor
   */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * Check if parent id exist
     *
     * @param {String} value
     */
    validObjectId = async (value) => {
        if (value) {
            value.forEach((element) => {
                if (!mongoose.Types.ObjectId.isValid(element)) {
                    throw new Error(constants.messages.validations.invalidObjectID);
                }
            });
        }
        return value;
    };

    /**
     * Validate cart product list body params
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    listProducts = async (req, res, next) => {
        try {
            const schema = Joi.object({
                products: Joi.array()
                    .external(this.validObjectId),
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
    };

    /**
     * Validate create address body params
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    createAddress = async (req, res, next) => {
        try {
            const schema = Joi.object({
                address: Joi.string().required(),
                country: Joi.string().required(),
                state: Joi.string().required(),
                city: Joi.string().required(),
                pin_code: Joi.string().required(),
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
    };
}

export default new CartValidation();
