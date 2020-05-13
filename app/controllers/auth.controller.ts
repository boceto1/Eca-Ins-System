import { Request, Response } from 'express';
import { login } from '../operations/Auth';

export const loginCtrl = async (req, res: Response) => {
    const loginParams = req.body;
    try {
        const token = await login(loginParams);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error: ', error });
    }
};

export const getMyInfoCtrl = async (req, res) => {
    const userInfo = req.authData;
    res.status(200).json({ userInfo });
}
