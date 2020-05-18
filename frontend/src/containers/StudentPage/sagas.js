import { call, put, takeLatest, all } from 'redux-saga/effects';
import { 
    getEcas,
    getProfessors,
    insertEca
} from './duck';

import * as ecaService from '../../services/ecaServices';
import * as professorService from '../../services/professorService';


export function* getEcasSaga () {
    try {
        const response = yield call(ecaService.getEcas);
        yield put(getEcas.success(response.ecas));        
    } catch (error) {
        yield put(getEcas.failure('Error', error));
    }
}

export function* getProfessorsSaga () {
    try {
        const response = yield call(professorService.getAllProfessors);
        yield put(getProfessors.success(response.professors));
    } catch (error) {
        yield put(getEcas.failure('Error', error))
    }
}

export function* insertEcaSaga({ payload }) {
    const { title, description, evidence, idProfessor } = payload;
    try {
        const response = yield call(ecaService.requestEca, title, description, evidence, idProfessor );
        yield put(insertEca.success(response.eca));
    } catch (error) {
        console.log(error);
        yield put(insertEca.failure('Error'));
    }
}

export default function*() {
    yield all([
        takeLatest(getEcas.request.toString(), getEcasSaga),
        takeLatest(getProfessors.request.toString(), getProfessorsSaga),
        takeLatest(insertEca.request.toString(), insertEcaSaga),
    ])
}
