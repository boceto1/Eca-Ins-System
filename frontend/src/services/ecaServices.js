import { call } from 'redux-saga/effects';
import request from './request';

export function* getEcas() {
    const config = {
        method: 'get',
        url: '/ecas',
        bypassErrorHandler: true,
    };
    const { data } = yield call(request, config);
    return data;
}

export function* getEca(id){
    const config = {
        method: 'get',
        url: `/ecas/${id}`,
        bypassErrorHandler: true,
    };
    const { data } = yield call(request, config);
    return data;
}

export function* requestEca(title, description, evidence, idProfessor) {

    const config = {
        method: 'post',
        url: '/ecas/request',
        data: { title, description, evidenceLink: evidence, idProfessor },
        bypassErrorHandler: true,
    };

    const { data } = yield call(request, config);
    return data;
}