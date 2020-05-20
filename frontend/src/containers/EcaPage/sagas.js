import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  getEca,
} from './duck';

import * as ecaService from '../../services/ecaServices';

export function* getEcaSaga ({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(ecaService.getEca,id);
        yield put(getEca.success(response.eca));
    } catch (error) {
        yield put(getEca.failure('Error', error));
    }
}

export default function*() {
    yield all([
        takeLatest(getEca.request.toString(), getEcaSaga),
    ])
}
