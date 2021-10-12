import path from 'path';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { response, log, bcrypt } from 'helper';
import constant from 'config/constants';
import AuthModel from '../model/AuthModel';

class AuthController {
    /**
     * Class default constructor
     */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * User Login
     *
     * @param {*} req
     * @param {*} res
     * @returns {object} reflection object
     */
    login = async (req, res) => {
        try {
            const token = await this.get_token(res, res.locals.user._id);
            token.user = _.pick(res.locals.user, [
                'firstname',
                'lastname',
                'email',
                'mobile_number',
                'dob',
                'gender',
                'profile_photo',
                '_id',
            ]);
            token.user.password = undefined;
            // Send token
            response.res200(res, token, '', constant.messages.loginMessage);
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    };

    /**
     * Create New User
     *
     * @param {*} _req
     * @param {*} res
     * @returns {object} reflection object
     */
    create = async (req, res) => {
        try {
            // Make user object
            const newUser = _.pick(req.body, [
                'firstname',
                'lastname',
                'email',
                'mobile_number',
                'password',
                'dob',
                'gender',
                'profile_photo',
            ]);
            // Password encryption
            newUser.password = bcrypt.get_hash(newUser.password);
            newUser.profile_photo = req.profile_photo;
            // Create user
            const object = await AuthModel.saveUser(newUser, res);
            response.res200(res, object);
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    };

    /**
     * Generate token form refresh token
     *
     * @param {*} _req
     * @param {*} res
     * @returns {object} reflection object
     */
    generateToken = async (req, res) => {
        try {
            const resp = await AuthModel.deleteToken({ refresh_token: res.locals.user.token }, res);
            if (resp) {
                const token = await this.get_token(res, res.locals.user.id);
                // Send token
                response.res200(res, token);
            }
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    };

    /**
     * Generate token
     *
     * @param {*} res
     * @param {*} id
     * @returns {object} reflection object
     */
    get_token = async (res, id) => {
        try {
            // User info you get in token
            const payload = {
                id,
            };
            // Generate Access Token
            const access_token = jwt.sign(
                payload,
                constant.keys.privateKEY,
                constant.authConfig,
            );
            // Generate Refresh Token
            const refresh_token = jwt.sign(
                payload,
                constant.keys.privateKEY,
                constant.refreshTokenAuthConfig,
            );
            // Save Token
            await AuthModel.saveToken({ access_token, refresh_token }, res);

            return {
                access_token,
                refresh_token,
                expire_time: constant.authConfig.expiresIn,
            };
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    };
}

export default new AuthController();
