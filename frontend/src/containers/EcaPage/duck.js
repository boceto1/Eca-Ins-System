import { createActions , handleActions } from 'redux-actions';
import produce from 'immer';

export const key = 'ecaInfo';

export const initialState = {
    eca: {},
    approvedEca: {},
    skills: {},
    loading: false,
    error: null,
    approving: false,
}

export const {
    getEca,
    getSoftSkills,
    approveEca, 
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
    },
    APPROVE_ECA: {
        REQUEST: ( id, idSoftSkills ) => ({ id, idSoftSkills }),
        SUCCESS: ( eca ) => ({ eca }),
        FAILURE: error => ({ error }),
    }
  },
  { prefix: 'src/containers/EcaPage' }
);

export default handleActions(
    {
        [getEca.request]: produce( draft => {
            draft.approvedEca = {};
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
        [approveEca.request]: produce((draft, { payload }) => {
            draft.approving = true;
            draft.error = null;
        }),
        [approveEca.success]: produce((draft, { payload }) => {
            const { eca } = payload;
            draft.approving = false;
            draft.approvedEca = eca;
        }),
        [approveEca.failure]: produce((draft, { payload })=> {
            draft.approving = false;
            draft.error = payload;
        }),
    },
   initialState
);
