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

export function* approveEca(idECA, idSoftSkills) {
    const config = {
        method: 'post',
        url: '/ecas/approve',
        data: { idECA, idSoftSkills },
        bypassErrorHandler: true,
    };

    const { data } = yield call(request, config);
    return data;
}

export function* getBalanceSummary(){
    const config = {
        method: 'get',
        url: '/ecas/balance',
        bypassErrorHandler: true,
    };

    const { data } = yield call(request, config);
    return data;
}

export function* getBlockchainEcas() {
    const config = {
        method: 'get',
        url: '/ecas/blockchain',
        bypassErrorHandler: true,
    };

    const { data } = yield call(request, config);
    return data;
}

export function* createSharedPortfolio() {
    const config = {
        method: 'post',
        url: `/ecas/share` ,
        bypassErrorHandler: true,
    };

    const { data } = yield call(request, config);
    return data;
}

export function* getPortfolioBalanceSummary(token){
    const config = {
        method: 'get',
        url: `/ecas/portfolio/balance/${token}`,
        bypassErrorHandler: true,
    };

    const { data } = yield call(request, config);
    return data;
}

export function* getPortfolioBlockchainEcas(token) {
    console.log(token);
    const config = {
        method: 'get',
        url: `/ecas/portfolio/blockchain/${token}` ,
        bypassErrorHandler: true,
    };

    const { data } = yield call(request, config);
    return data;
}