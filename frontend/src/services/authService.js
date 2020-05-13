import { call } from 'redux-saga/effects';
import request from './request';

export function* logIn(name, password, type) {
    const config = {
        method: 'post',
        url: '/auth/login',
        data: { name, password, type },
        bypassErrorHandler: true,
    };
    const { data } = yield call(request, config);
    return data;
}

export function* getUserInfo() {
    const config = {
        method: 'post',
        url: '/auth/me',
        bypassErrorHandler: true,
    };
    const { data } = yield call(request, config);
    return data;
}
