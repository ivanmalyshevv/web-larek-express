import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/product';
import { productValidation } from '../middlewares/validation';

const router = Router();

router.get('/', getProducts);
router.post('/', productValidation, createProduct);

export default router;
