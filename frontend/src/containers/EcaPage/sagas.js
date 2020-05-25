import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  getEca,
  getSoftSkills,
  approveEca,
} from './duck';

import * as ecaService from '../../services/ecaServices';
import * as softSkills from '../../services/softSkillsService'; 

export function* getEcaSaga ({ payload }) {
    const { id } = payload;
    try {
        const response = yield call(ecaService.getEca,id);
        const responseSoftSkill = yield call(softSkills.getAllSoftSkills);

        yield put(getSoftSkills.success(responseSoftSkill.softSkills));
        yield put(getEca.success(response.eca));
    } catch (error) {
        yield put(getEca.failure('Error', error));
    }
}

export function* approveEcaSaga ({ payload }) {
    const { id, idSoftSkills } = payload;
    try {
        const response = yield call(ecaService.approveEca, id, idSoftSkills);
        yield put(approveEca.success(response.eca));
    } catch (error) {
        yield put(approveEca.failure('Error', error));
    }
}


export default function*() {
    yield all([
        takeLatest(getEca.request.toString(), getEcaSaga),
        takeLatest(approveEca.request.toString(), approveEcaSaga)
    ])
}
