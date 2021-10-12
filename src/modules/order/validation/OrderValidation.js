import path from 'path';
import Joi from '@hapi/joi';
import { log, response } from 'helper';

class OrderValidation {
    /**
   * Class default constructor
   */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * Validate create order body params
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    createOrder = async (req, res, next) => {
        try {
            const schema = Joi.object({
                products: Joi.array().required(),
                address: Joi.string().required(),
                payment_method: Joi.string().required(),
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

export default new OrderValidation();
