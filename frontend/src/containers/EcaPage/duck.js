import { createActions , handleActions } from 'redux-actions';
import produce from 'immer';

export const key = 'ecaInfo';

export const initialState = {
    eca: {},
    skills: {},
    loading: false,
    error: null,
}

export const {
    getEca,
    getSoftSkills, 
} = createActions({
    GET_ECA: {
        REQUEST: id => ({ id }),
        SUCCESS: ( eca ) => ({ eca }),
        FAILURE: error => ({ error }),
    },
    GET_SOFT_SKILLS: {
        REQUEST: () => null,
        SUCCESS: ( softSkills ) => ({ softSkills }),
        FAILURE: error => ({ error }),
    }
  },
  { prefix: 'src/containers/EcaPage' }
);

export default handleActions(
    {
        [getEca.request]: produce( draft => {
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
        [getSoftSkills.request]: produce( draft => {
            draft.loading = true;
            draft.error = null;
        }),
        [getSoftSkills.success]: produce((draft, { payload }) => {
            const { softSkills } = payload;
            draft.loading = false;
            draft.skills = softSkills;
        }),
        [getSoftSkills.failure]: produce((draft, { payload })=> {
            draft.loading = false;
            draft.error = payload;
        }),
    },
   initialState
);
