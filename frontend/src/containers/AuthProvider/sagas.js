import { call, put, all, takeLatest } from 'redux-saga/effects';

import {
    login,
    // logout,
    setToken
} from './duck';

// import { makeSelectToken } from './selector';
import {
    AUTHENTICATED,
    ACCESS_TOKEN,
    ROL,
} from './localStorageNames';
import * as authService from '../../services/authService';

// const selectToken = makeSelectToken();

export function* loginRequestSaga({ payload }) {
    try {
            const response = yield call(authService.logIn,
            payload.name,
            payload.password,
            payload.type);
            
            console.log(response);
            if(response.token) {
                console.log("I'm in the right place");
                yield put(setToken(response.token));
                yield put(login.success(payload.name, payload.type));
            } else {
                console.log("I'm in the wrong place");
                yield put(login.failure('Invalid email or password'));
            }
    } catch (error) {
        console.log(error);
        if (error.statusCode === 401) {
            yield put(login.failure('Invalid email or password'));
          } else {
            yield put(login.failure(error));
          }
    }
}

export function* saveTokenOnStorage({ payload }){
    const { accessToken } = payload;
    window.localStorage.setItem(ACCESS_TOKEN, accessToken);
}

export function* handleLoginSuccess({ payload }) {
    const { rol } = payload;
    window.localStorage.setItem(AUTHENTICATED, 'true');
    window.localStorage.setItem(ROL, rol);
}

export default function*() {
    yield all([
        takeLatest(login.request.toString(), loginRequestSaga),
        takeLatest(setToken.toString(), saveTokenOnStorage),
        takeLatest(login.success.toString(), handleLoginSuccess),
    ])
}