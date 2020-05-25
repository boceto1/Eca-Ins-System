import { createActions, handleActions } from 'redux-actions';
import produce from 'immer';

export const key = 'professorEcas';

export const initialState = {
    ecas: [],
    loading: false,
    error: null,
}

export const {
    getEcas,
} = createActions({
    GET_ECAS: {
        REQUEST: () => null,
        SUCCESS: ecas => ({ ecas }),
        FAILURE: error => ({ error }),
    }
 },
 { prefix: 'src/containers/ProfessorPage'}
);

export default handleActions({
    [getEcas.request]: produce( draft => {
        draft.loading = true;
        draft.error = null;
    }),
    [getEcas.success]: produce((draft, { payload }) => {
        const { ecas } = payload;
        draft.ecas = ecas;
        draft.loading = false;
    }),
    [getEcas.failure]: produce((draft, { payload }) => {
        draft.loading = false;
        draft.error = payload;
    }),
}, initialState
)