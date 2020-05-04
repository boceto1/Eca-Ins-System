import { ObjectId } from 'bson';
import { sign, verify } from 'jsonwebtoken';
import { AUTH_KEY } from '../../../const';

interface ResultVerifyToke {
    id: ObjectId;
    name: string;
    type: 'student' | 'professor';
}

interface CreateTokenParams {
    name: string;
    id: ObjectId;
    type: 'student' | 'professor';
}

export const createNewToken = (params: CreateTokenParams): string =>
    sign(params, AUTH_KEY, {
        expiresIn: '1d'
    });

export const checkJwt = (token: string): ResultVerifyToke | 'INVALID' | 'EXPIRED' => {
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
