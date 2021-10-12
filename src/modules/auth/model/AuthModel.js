import path from 'path';
import MyModel from 'global/MyModel';
import { log } from 'helper';

class AuthModel extends MyModel {
    /**
   * Class default constructor
   */
    constructor() {
        super();
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * Create new user
     *
     * @param {*} newUser
     * @param {*} res
     * @returns {object} reflection object
     */
    saveUser = async (newUser, res) => {
        try {
            const user = await new this.UserTbl(newUser).save();
            user.password = undefined;
            return user;
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    };

    /**
     * Delete Token
     *
     * @param {*} condition
     * @param {*} res
     * @returns {object} reflection object
     */
    deleteToken = async (condition, res) => {
        try {
            const response = await this.TokenTbl.deleteOne(condition);
            return response;
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    }

    /**
     * Save Token
     *
     * @param {*} condition
     * @param {*} res
     * @returns {object} reflection object
     */
    saveToken = async (condition, res) => {
        try {
            const response = new this.TokenTbl(condition).save();
            return response;
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    }
}

export default new AuthModel();
