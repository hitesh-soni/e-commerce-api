import path from 'path';
import { response, log } from 'helper';
import MyController from 'global/MyController';
import ProductsModal from '../model/ProductsModel';

class ProductsController extends MyController {
    /**
   * Class default constructor
   */
    constructor() {
        super();
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    index = async (req, res) => {
        try {
            const products = await ProductsModal.index(req.body);
            response.res200(res, products?.data, products?.meta);
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    }

    getSingleProduct = async (req, res) => {
        try {
            const products = await ProductsModal.getSingleProduct(req.params);
            response.res200(res, products);
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    }

    create = async (req, res) => {
        try {
            await ProductsModal.createProduct({
                ...req.body,
                images: req.images,
                cover_image: req.cover_image,
            });
            response.res200(res, null, null, 'Product created successfully');
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    }

    update = async (req, res) => {
        try {
            await ProductsModal.updateProduct({
                ...req.body,
                images: req.images,
                cover_image: req.cover_image,
            }, req.params.id);
            response.res200(res, null, null, 'Product modified successfully');
        } catch (e) {
            log.error(res, e, this.file_path);
        }
    }
}

export default new ProductsController();
