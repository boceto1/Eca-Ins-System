import { Request, Response } from 'express';
import { login } from '../operations/Auth';

export const loginCtrl = async (req: Request, res: Response) => {
    const loginParams = req.body;
    try {
        const token = await login(loginParams);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};
