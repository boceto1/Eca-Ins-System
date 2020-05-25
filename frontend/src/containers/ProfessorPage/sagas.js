import { call, put, takeLatest, all } from 'redux-saga/effects';
import { getEcas } from './duck';

import * as professorService from '../../services/professorService';

export function* getEcasSaga () {
    try {
        const response = yield call(professorService.getProfessorEcas);
        yield put(getEcas.success(response.ecas));
    } catch (error) {
        yield put(getEcas.failure('Error', error));
    }
}

export default function*() {
    yield all([
        takeLatest(getEcas.request.toString(), getEcasSaga),
    ])
}
