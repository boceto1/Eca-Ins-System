import { call, put, takeLatest, all } from 'redux-saga/effects'
import { 
    getBlockchainEcas, 
    getBalance,
    getShareLink,
} from './duck';

import * as ecaService from '../../services/ecaServices'

export function* createSharedPortfolioSaga() {
    try {
          const response = yield call(ecaService.createSharedPortfolio);
          yield put(getShareLink.success(response))
    } catch (error) {
        yield put(getShareLink.failure('Error', error));
    }
}

export function* getBalanceSaga({ payload: { token } }) {
    try {
        let response;
        if(token){
            response = yield call(ecaService.getPortfolioBalanceSummary, token);
        }else{
            response = yield call(ecaService.getBalanceSummary);
        }
        yield put(getBalance.success(response))
    } catch (error) {
        yield put(getBalance.failure('Error', error));
    }
}

export function* getBlockchainEcasSaga({ payload: { token } }) {
    try {
        let response;
        if(token){
            response = yield call(ecaService.getPortfolioBlockchainEcas, token);
        }else{
          response = yield call(ecaService.getBlockchainEcas);
        }
        yield put(getBlockchainEcas.success(response.balance.ecas))
    } catch (error) {
        yield put(getBlockchainEcas.failure('Error', error));
    }
}

export default function*() {
    yield all([
        takeLatest(getBalance.request.toString(), getBalanceSaga),
        takeLatest(getBlockchainEcas.request.toString(), getBlockchainEcasSaga),
        takeLatest(getShareLink.request.toString(), createSharedPortfolioSaga)
    ])
}