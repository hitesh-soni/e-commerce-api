import path from 'path';
import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import { constants } from 'config';
import { log, response, bcrypt } from 'helper';

class AuthValidation {
    /**
     * Class default constructor
     */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    singleEmailAlowed = async (value) => {
        const count = await mongoose
            .model('User')
            .findOne({ email: value });
        if (count) {
            throw new Error(constants.messages.validations.singleEmailAllowed);
        }
        return value;
    }

    /**
     * Verify email and password
     *
     * @param {String} email
     * @param {String} password
     */
    veriyEmailPassword = async (email, password, res) => {
        const count = await mongoose
            .model('User')
            .findOne({ email });

        if (count) {
            if (count.password && bcrypt.verify_password(password, count.password)) {
                res.locals.user = count;
                return true;
            }
        }
        return false;
    };

    /**
     * Create user validations
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    createUser = async (req, res, next) => {
        try {
            const schema = Joi.object({
                firstname: Joi.string().alphanum().min(3).required(),
                email: Joi.string()
                    .email({ minDomainSegments: 2 })
                    .required().external(this.singleEmailAlowed),
                lastname: Joi.string().required(),
                dob: Joi.string().required(),
                password: Joi.string().min(3).required(),
                mobile_number: Joi.string().required(),
                gender: Joi.string().required(),
            });

            try {
                req.profile_photo = req?.files?.profile_photo?.[0]?.path;
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
     * Login validations
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    loginUser = async (req, res, next) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email({ minDomainSegments: 2 }).required(),
                password: Joi.string().required(),
            });
            try {
                const { error } = await schema.validateAsync(req.body);
                if (error || !(await this.veriyEmailPassword(req.body.email, req.body.password, res))) {
                    response.res422(res, constants.messages.validations.loginError);
                } else {
                    next();
                }
            } catch (exp) {
                response.res422(res, exp.message);
            }
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    };
}
export default new AuthValidation();
