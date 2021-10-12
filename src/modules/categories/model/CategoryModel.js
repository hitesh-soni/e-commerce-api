import path from 'path';
import MyModel from 'global/MyModel';
import { log } from 'helper';

class CategoryModel extends MyModel {
    /**
     * Class default constructor
     */
    constructor() {
        super();
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    index = async () => {
        try {
            let categories = await this.CategoriesTbl.find({}, ['slug', 'name', 'description', 'cover_image', 'cover_image_url']);
            categories = categories.map(o => o.toObject({ getters: true }));
            return categories;
        } catch (e) {
            log.error(null, e, this.file_path);
            throw e;
        }
    };

    createCategory = async (data) => {
        try {
            await new this.CategoriesTbl(data).save();
        } catch (e) {
            log.error(null, e, this.file_path);
            throw e;
        }
    };
}

export default new CategoryModel();
