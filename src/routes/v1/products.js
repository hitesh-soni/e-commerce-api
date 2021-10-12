import express from 'express';
import ProductsController from 'modules/products/controller/ProductsController';
import ProductsValidation from 'modules/products/validation/ProductsValidation';
import upload from 'helper/upload';

const router = express.Router();

router.post('/', ProductsValidation.listProduct, ProductsController.index);

router.get('/:slug', ProductsController.getSingleProduct);

router.post('/create', upload.fields([{ name: 'images' }, { name: 'cover_image', maxCount: 1 }]), ProductsValidation.createProduct, ProductsController.create);

router.put('/:id', upload.fields([{ name: 'images' }, { name: 'cover_image', maxCount: 1 }]), ProductsValidation.updateProduct, ProductsController.update);

export default router;
