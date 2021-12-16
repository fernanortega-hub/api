import { Router, Request, Response } from 'express';

const baseRouter = Router();

baseRouter.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Visitando get para usuarios' })
});

baseRouter.post('/', (req: Request, res: Response) => {
    return res.status(201).json({ message: 'Visitando post para usuarios' });
});

const userRouter = Router();
userRouter.use('/users', baseRouter);

export default userRouter;