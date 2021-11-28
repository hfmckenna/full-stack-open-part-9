import { Router } from 'express';
import { Request, Response } from "express";

const baseRouter = Router();

baseRouter.get('/', (_req: Request, res: Response) => {
    console.log('someone pinged here');
    res.send('pong');
});

export default baseRouter;