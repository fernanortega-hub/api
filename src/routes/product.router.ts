/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router } from 'express';
import productController from '@controllers/product.controller';

const baseRouter = Router();

baseRouter.post('/create', productController.create);

const productRouter = Router();
productRouter.use('/products', baseRouter);

export default productRouter;
