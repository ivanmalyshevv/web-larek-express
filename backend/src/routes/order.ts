import { Router } from 'express';
import createOrder from '../controllers/order';
import { orderValidation } from '../middlewares/validation';

const router = Router();

router.post('/', orderValidation, createOrder);

export default router;
