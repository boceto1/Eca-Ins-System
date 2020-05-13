import axios from 'axios';
import { call, select } from 'redux-saga/effects';
import { makeSelectToken } from '../containers/AuthProvider/selector';


const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
});

const selectToken = makeSelectToken();

function* request({
    url,
     method = 'GET',
     data = null,
     params = null,
     bypassErrorHandler = false,
     ...rest
}) {
    let keepTrying = true;
    let response = null;
    while ( keepTrying ) {
        try {
            const accessToken = yield select(selectToken);
            instance.defaults.headers.common.Authorization = accessToken
                ? `${accessToken}`
                : null;
            response = yield call(instance, { url, method, data, params, ...rest});
            keepTrying = false;
        } catch (error) {
            keepTrying = false;
            throw error;
        }
    }
    return response; 
}

export default request;