import path from 'path';

class MyController {
    /**
   * Class default constructor
   */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
   * Check if object exist
   */
    isSet = (fn) => {
        try {
            return fn();
        } catch (e) {
            return false;
        }
    };
}

export default MyController;
