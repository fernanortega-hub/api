/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Router, Request, Response } from 'express';
import userController from '@controllers/user.controller';

const baseRouter = Router();

baseRouter.post('/register', userController.register);
baseRouter.post('/login', userController.login);
baseRouter.get('/whoami', userController.whoami);

baseRouter.get('/', userController.getAll);

const userRouter = Router();
userRouter.use('/users', baseRouter);

export default userRouter;