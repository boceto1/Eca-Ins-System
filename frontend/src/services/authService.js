import { call } from 'redux-saga/effects';
import request from './request';

export function* logIn(email, password) {
    const config = {
        method: 'post',
        url: '/login',
        data: { email, password },
        bypassErrorHandler: true,
    };
    const { data } = yield call(request, config);
    return data;
}
