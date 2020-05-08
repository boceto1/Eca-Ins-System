import { createActions, handleActions} from 'redux-actions';
import produce from 'immer';
import {
    AUTHENTICATED,
    ACCESS_TOKEN,
    ROLES
} from './localStorageNames';


const getUserRolesFromStorage = () => {
    try{
        return JSON.parse(window.localStorage.getItem(ROLES) || '[]');
    } catch (e){
        return [];
    }
};

export const initialState = {
    authenticated: window.localStorage.getItem(AUTHENTICATED) === 'true',
    user: {},
    token: window.localStorage.getItem(ACCESS_TOKEN) || null,
    userRol: getUserRolesFromStorage(),
    loading: false,
    error: null,
}

export const {
    login,
    logout,
    setToken
} = createActions(
    {
        LOGIN: {
            REQUEST: (name, password) => ({ name, password }),
            SUCCESS: (user, rol) => ({
                user,
                rol,
            }),
            FAILURE: undefined,
        },
        SET_TOKENS: (accessToken) => ({ accessToken }),
        LOGOUT: {
            BEFORE: () => null,
            AFTER: ()=> null,
        }
    },
    { prefix: 'src/containers/AuthProvider'},
);

export default handleActions(
    {
        [login.request]: produce(draft => {
            draft.login = true;
            draft.error = null;
        }), 
        [setTokens]: produce((draft, { payload }) => {
            const { accessToken } = payload;
            draft.token = accessToken;
        }),
        [login.success]: produce((draft, { payload }) => {
            const { user, rol } = payload;
            draft.loading = false;
            draft.authenticated = true;
            draft.user = user;
            draft.userRol = rol;
        }),
        [login.failure]: produce((draft, { payload }) => {
            draft.loading = false;
            draft.authenticated = false;
            draft.error = payload;
        }),
        [logout.after]: produce(draft => {
            draft.authenticated = false;
            draft.user = {};
            draft.userRol = null;
        }),
    },
    initialState,
);
