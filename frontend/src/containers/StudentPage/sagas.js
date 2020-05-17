import { call, put, takeLatest, all } from 'redux-saga/effects';
import { 
    getEcas,
    getProfessors,
} from './duck';

import * as ecaService from '../../services/ecaServices';

export function* getEcasSaga () {
    try {

        const response = yield call(ecaService.getEcas);
        yield put(getEcas.success(response.ecas));        
    } catch (error) {
        yield put(getEcas.failure('Error'));
    }
} 

export default function*() {
    yield all([
        takeLatest(getEcas.request.toString(), getEcasSaga),
    ])
}
