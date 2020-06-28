import { call, put, takeLatest, all } from 'redux-saga/effects'
import { getBlockchainEcas, getBalance } from './duck';

import * as ecaService from '../../services/ecaServices'

export function* getBalanceSaga() {
    try {
        const response = yield call(ecaService.getBalanceSummary);
        yield put(getBalance.success(response))
    } catch (error) {
        yield put(getBalance.failure('Error', error));
    }
}

export function* getBlockchainEcasSaga() {
    try {
        const response = yield call(ecaService.getBlockchainEcas);
        yield put(getBlockchainEcas.success(response.balance.ecas))
    } catch (error) {
        yield put(getBlockchainEcas.failure('Error', error));
    }
}

export default function*() {
    yield all([
        takeLatest(getBalance.request.toString(), getBalanceSaga),
        takeLatest(getBlockchainEcas.request.toString(), getBlockchainEcasSaga)
    ])
}