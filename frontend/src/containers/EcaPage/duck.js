import { createActions , handleActions } from 'redux-actions';
import produce from 'immer';

export const key = 'ecas';

export const initialState = {
    eca: {},
    loading: false,
    error: null,
}

export const {
    getEca,
} = createActions({
    GET_ECA: {
        REQUEST: id => ({ id }),
        SUCCESS: ( eca ) => ({ eca }),
        FAILURE: error => ({ error }),
    },
  },
  { prefix: 'src/containers/EcaPage' }
);

export default handleActions(
    {
        [getEca.request]: produce((draft, { payload }) => {
            draft.id = payload.id;
            draft.loading = true;
            draft.error = null;
        }),
        [getEca.success]: produce((draft, { payload }) => {
            const { eca } = payload;
            draft.loading = false;
            draft.eca = eca;
        }),
        [getEca.failure]: produce((draft, { payload })=> {
            draft.loading = false;
            draft.error = payload;
        }),
    },
   initialState
);
