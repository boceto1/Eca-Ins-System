import { call, put, all, takeLatest } from 'redux-saga/effects';

import {
    login,
    // logout,
    setToken
} from './duck';

// import { makeSelectToken } from './selector';
// import {
//     AUTHENTICATED,
//     ACCESS_TOKEN,
//     ROLES,
// } from './localStorageNames';
import * as authService from '../../services/authService';

// const selectToken = makeSelectToken();

export function* loginRequestSaga({ payload }) {
    try {
            const response = yield call(authService.logIn,
            payload.name,
            payload.password);
            yield put(setToken(response.token));
            yield put(login.success('jean', 'student'));
    } catch (error) {
        if (error.statusCode === 401) {
            yield put(login.failure('Invalid email or password'));
          } else {
            yield put(login.failure());
          }
    }
}

export default function*() {
    yield all([
        takeLatest(login.request.toString(), loginRequestSaga),
    ])
}