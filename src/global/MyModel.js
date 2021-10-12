import path from 'path';
import db from 'collections/index';

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
}

export default MyModel;
