import { ObjectId } from 'bson';
import { sign, verify } from 'jsonwebtoken';
import { AUTH_KEY } from '../../../const';

interface ResultVerifyLoginToken {
    id: ObjectId;
    name: string;
    type: 'student' | 'professor';
}

interface CreateLoginTokenParams {
    name: string;
    id: ObjectId;
    type: 'student' | 'professor';
}

interface PortfolioTokenParams {
    idStudent: ObjectId;
}

export const createNewLoginToken = (params: CreateLoginTokenParams): string =>
    sign(params, AUTH_KEY, {
        expiresIn: '1d'
    });

export const checkLoginJwt = (token: string): ResultVerifyLoginToken | 'INVALID' | 'EXPIRED' => {
    try {
        return verify(token, AUTH_KEY);
    } catch (error) {
        if (error.message === 'invalid signature') {
            return 'INVALID';
        }

        if (error.message === 'jwt expired') {
            return 'EXPIRED';
        }
        return 'INVALID';
    }
};

export const createNewPortfolioToken = (params: PortfolioTokenParams): string => sign(params, AUTH_KEY, {
    expiresIn: '7d'
});

export const checkPortfolioJwt = (token: string): PortfolioTokenParams | 'INVALID' | 'EXPIRED' => {
    try {
        return verify(token, AUTH_KEY);
    } catch (error) {
        if (error.message === 'invalid signature') {
            return 'INVALID';
        }

        if (error.message === 'jwt expired') {
            return 'EXPIRED';
        }
        return 'INVALID';
    }
};