import { createActions, handleActions} from 'redux-actions';
import produce from 'immer';
import {
    AUTHENTICATED,
    ACCESS_TOKEN,
    ROL
} from './localStorageNames';


const getUserRolesFromStorage = () => {
    try{
        return window.localStorage.getItem(ROL);
    } catch (e){
        console.log(e);
        return null;
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
            REQUEST: (nickname, password, type) => ({ nickname, password, type }),
            SUCCESS: (user, rol) => ({
                user,
                rol,
            }),
            FAILURE: undefined,
        },
        SET_TOKEN: (accessToken) => ({ accessToken }),
        LOGOUT: () => null,
    },
    { prefix: 'src/containers/AuthProvider'},
);

export default handleActions(
    {
        [login.request]: produce(draft => {
            draft.login = true;
            draft.error = null;
        }), 
        [setToken]: produce((draft, { payload }) => {
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
        [logout]: produce(draft => {
            draft.authenticated = false;
            draft.user = {};
            draft.userRol = null;
        }),
    },
    initialState,
);
