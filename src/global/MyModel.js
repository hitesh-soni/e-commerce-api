import path from 'path';
import db from 'collections/index';
import sanitize from 'mongo-sanitize';
class MyModel {
    /**
   * Class default constructor
   */
    constructor() {
        Object.keys(db).forEach((key) => {
            this[key] = db[key];
        });
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * Check if object exist
     *
     * @param {function} fn
     */
    isSet = (fn) => {
        try {
            return fn();
        } catch (e) {
            return false;
        }
    };

    deepSanitize = (value) => {
        if (Array.isArray(value)) {
            value.forEach((elm) => this.deepSanitize(elm));
        }
        if (typeof (value) === 'object' && value !== null) {
            Object.values(value).forEach((elm) => {
                this.deepSanitize(elm);
            });
        }
        return sanitize(value);
    }
}

export default MyModel;
