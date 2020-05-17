import { call } from 'redux-saga/effects';
import request from './request';

export function* getEcas(name, password, type) {
    const config = {
        method: 'get',
        url: '/ecas',
        bypassErrorHandler: true,
    };
    const { data } = yield call(request, config);
    return data;
}