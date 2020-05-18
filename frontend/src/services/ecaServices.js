import { call, retry } from 'redux-saga/effects';
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

export function* requestEca(title, description, evidence, idProfessor) {

    console.log(title);
    const config = {
        method: 'post',
        url: '/ecas/request',
        bypassErrorHandler: true,
    };

    const { data } = yield call(request, config);
    return data;
}