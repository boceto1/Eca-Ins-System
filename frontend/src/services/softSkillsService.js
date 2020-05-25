import { call } from 'redux-saga/effects';
import request from './request';

export function* getAllSoftSkills() {
    const config = {
        method: 'get',
        url: '/softSkills',
        bypassErrorHandler: true,
    }
    const {data } = yield call(request, config);
    return data;
}