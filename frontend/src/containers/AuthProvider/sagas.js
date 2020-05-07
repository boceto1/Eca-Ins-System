

import {
    login,
    logout,
    setToken
} from './duck';

import { makeSelectToken } from './selector';
import {
    AUTHENTICATED,
    ACCESS_TOKEN,
    ROLES,
} from './localStorageNames';

const selectToken = makeSelectToken();

export function* initializeAuth() {
    //The token normally loads up from localStorage
    // So we only have to check the store

    const authToken = yield select(selectToken);
    
}