import { call } from 'redux-saga/effects';
import request from './request';

export function* getAllProfessors() {
    const config = {
        method: 'get',
        url: '/professors',
        bypassErrorHandler: true,
    };
    const { data } = yield call(request, config);
    return data;
}

export function* getProfessorEcas(){
    const config = {
        method: 'get',
        url: '/professors/ecas',
        bypassErrorHandler: true,
    };
    const { data } = yield call(request, config);
    return data;
}