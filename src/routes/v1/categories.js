import express from 'express';
import CategoryController from 'modules/categories/controller/CategoryController';
import CategoryValidation from 'modules/categories/validation/CategoryValidation';
import upload from 'helper/upload';

const router = express.Router();

router.get('/', CategoryValidation.listCategory, CategoryController.index);

router.post('/', upload.fields([{ name: 'cover_image', maxCount: 1 }]), CategoryValidation.createCategory, CategoryController.create);

export default router;
