import { call } from 'redux-saga/effects';
import request from './request';

export function* logIn(email, password) {
    const config = {
        method: 'post',
        url: '/auth/login',
        data: { email, password },
        bypassErrorHandler: true,
    };
    console.log(config);
    const { data } = yield call(request, config);
    return data;
}
