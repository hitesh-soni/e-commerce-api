import bcrypt from 'bcryptjs';
import path from 'path';
import log from './logger';
import constant from '../config/constants';

class Bcrypt {
    /**
     * Class default constructor
     */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * Get password hash
     *
     * @param {*} password
     * @returns String
     */
    get_hash = (password) => {
        try {
            const salt = bcrypt.genSaltSync(constant.hashCount);
            const hash = bcrypt.hashSync(password, salt);
            return hash;
        } catch (e) {
            log.error(null, e, this.file_path);
        }
        return false;
    }

    /**
     * Verify hash
     *
     * @param {*} password
     * @param {*} hash
     * @returns Boolean
     */
    verify_password(password, hash) {
        try {
            return bcrypt.compareSync(password, hash);
        } catch (e) {
            log.error(null, e, this.file_path);
        }
        return false;
    }
}
export default new Bcrypt();
