import path from 'path';
import Joi from '@hapi/joi';
import { log, response } from 'helper';
import { constants } from 'config';
import db from 'collections/index';
import mongoose from 'mongoose';

class CategoryValidation {
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
    validParentId = async (value) => {
        if (value) {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error(constants.messages.validations.invalidParentID);
            }
            const category = await db.CategoriesTbl.findById(value)
                .lean();
            if (!category) {
                throw new Error(constants.messages.validations.invalidParentID);
            }
        }
        return value;
    };

    createCategory = async (req, res, next) => {
        try {
            const schema = Joi.object({
                name: Joi.string().min(3).max(100)
                    .required(),
                description: Joi.string().min(3)
                    .required(),
            });
            try {
                const { error } = await schema.validateAsync(req.body);
                req.cover_image = req?.files?.cover_image?.[0]?.path;
                error ? response.res422(res, error.details[0].message) : next();
            } catch (exp) {
                response.res422(res, exp.message);
            }
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    };

    listCategory = async (req, res, next) => {
        try {
            const schema = Joi.object({
                category_id: Joi.string()
                    .external(this.validParentId),
            });
            try {
                const { error } = await schema.validateAsync(req.query);
                error ? response.res422(res, error.details[0].message) : next();
            } catch (exp) {
                response.res422(res, exp.message);
            }
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    };
}
export default new CategoryValidation();
