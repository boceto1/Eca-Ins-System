import { NextFunction, Response, response } from 'express';

import { checkLoginJwt, checkPortfolioJwt } from '../../operations/Auth/jwt';

export const checkTokenStudent = (req, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    if (!token) {
        res.status(400).json({ message: 'Not Token' });
        return;
    }
    const resultVerification = checkLoginJwt(token);

    if (resultVerification === 'INVALID') {
        res.status(401).json({ message: 'Invalid Token' });
        return;
    }

    if (resultVerification === 'EXPIRED') {
        res.status(403).json({ message: 'Expired Token' });
        return;
    }

    if (resultVerification.type !== 'student') {
        res.status(403).json({ message: 'No Authorized' });
        return;
    }
    req.authData = resultVerification;
    next();
};

export const checkTokenProfessor = (req, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    if (!token) {
        res.status(400).json({ message: 'Not Token' });
        return;
    }
    const resultVerification = checkLoginJwt(token);

    if (resultVerification === 'INVALID') {
        res.status(401).json({ message: 'Invalid Token' });
        return;
    }

    if (resultVerification === 'EXPIRED') {
        res.status(403).json({ message: 'Expired Token' });
        return;
    }

    if (resultVerification.type !== 'professor') {
        res.status(403).json({ message: 'No Authorized' });
        return;
    }
    req.authData = resultVerification;
    next();
};

export const checkUserToken = (req, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(400).json({ message: 'Not Token' });
        return;
    }
    const resultVerification = checkLoginJwt(token);

    if (resultVerification === 'INVALID') {
        res.status(401).json({ message: 'Invalid Token' });
        return;
    }

    if (resultVerification === 'EXPIRED') {
        res.status(403).json({ message: 'Expired Token' });
        return;
    }

    const { id, name, type } = resultVerification
    req.authData = {id, name, type};
    next();
}

export const checkPortfolioToken = (req, res: Response, next: NextFunction) => {
    const token = req.params.token;

    if (!token) {
        res.status(400).json({ message: 'Not Token' });
        return;
    }
    const resultVerification = checkPortfolioJwt(token);

    if (resultVerification === 'INVALID') {
        res.status(401).json({ message: 'Invalid Token' });
        return;
    }

    if (resultVerification === 'EXPIRED') {
        res.status(403).json({ message: 'Expired Token' });
        return;
    }

    const { idStudent } = resultVerification
    req.authData = { id: idStudent };
    next();
}