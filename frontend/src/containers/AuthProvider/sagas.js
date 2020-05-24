import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { replace } from 'connected-react-router';

import {
    login,
    logout,
    setToken
} from './duck';

import { makeSelectToken } from './selector';
import {
    AUTHENTICATED,
    ACCESS_TOKEN,
    ROL,
} from './localStorageNames';
import * as authService from '../../services/authService';

const selectToken = makeSelectToken();


export function* initializeAuth() {
    // The token normally loads from localStorage
    // So we only have to check the store
    const authToken = yield select(selectToken);
    if(authToken) {
        try {
            const { userInfo } =
               yield call(authService.getUserInfo);
               yield put(login.success(userInfo.name, userInfo.type));
        } catch(e)
        {
            console.log('Not previous login', e);
        }
    }
}

export function* loginRequestSaga({ payload }) {
    try {
            const response = yield call(authService.logIn,
            payload.name,
            payload.password,
            payload.type);
            
            if(response.token) {
                yield put(setToken(response.token));
                yield put(login.success(payload.name, payload.type));
            } else {
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


export function* handleLogout(){
    window.localStorage.removeItem(AUTHENTICATED);
    window.localStorage.removeItem(ROL);
    yield put(replace('/login'));
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
        call(initializeAuth),
        takeLatest(login.request.toString(), loginRequestSaga),
        takeLatest(setToken.toString(), saveTokenOnStorage),
        takeLatest(login.success.toString(), handleLoginSuccess),
        takeLatest(logout.toString(), handleLogout),
    ])
}