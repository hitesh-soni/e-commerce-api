import path from 'path';
import { response, log } from 'helper';
import MyController from 'global/MyController';
import CategoryModel from '../model/CategoryModel';

class CategoryController extends MyController {
    /**
   * Class default constructor
   */
    constructor() {
        super();
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    index = async (_req, res) => {
        try {
            const categories = await CategoryModel.index();
            response.res200(res, categories, null);
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    }

    create = async (req, res) => {
        try {
            await CategoryModel.createCategory({
                ...req.body,
                cover_image: req.cover_image,
            });
            response.res200(res, null, null, 'Category created successfully');
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    }
}

export default new CategoryController();
