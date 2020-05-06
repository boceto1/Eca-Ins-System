/**
 * Combine all reducers in this file and export the combined reducers.
 */

 import { combineReducers } from 'redux';
 import { connectRouter } from 'connected-react-router';
 import { createAction } from 'redux-actions';

 import history from './utils/history';

 export const resetApp = createAction('RESET_APP');

 /**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        router: connectRouter(history),
        ...injectedReducers,
    });

    return (state, action) => {
        if(action.type === resetApp.toString()) {
            return rootReducer({}, action);
        }
        return rootReducer(state, action);
    }
}
