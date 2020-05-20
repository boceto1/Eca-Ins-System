import { createActions, handleActions } from 'redux-actions';
import produce from 'immer';

export const key = 'main-student';

export const initialState = {
    ecas: [],
    professors: [],
    loading: false,
    loadingProfessor: false,
    submitting: false,
}

export const {
    insertEca,
    getEcas,
    getProfessors,
} = createActions({
    INSERT_ECA: {
        REQUEST: (title, idProfessor, description, evidence) => ({
            title, idProfessor, description, evidence }),
        SUCCESS: ( eca ) => ({ eca }),
        FAILURE: error => ({ error }),
    },
    GET_ECAS: {
        REQUEST: () => null,
        SUCCESS: ecas  => ({ ecas }),
        FAILURE: error => ({ error }),
    },
    GET_PROFESSORS: {
        REQUEST: () => null,
        SUCCESS: professors  => ({ professors }),
        FAILURE: error => ({ error }),
    }
  },
  { prefix: 'src/containers/StudentPage'},
);

export default handleActions(
    {
        [insertEca.request]: produce((draft, { payload }) => {
            draft.submitting = true;
            draft.title = payload.title;
            draft.idProfessor = payload.professor; 
            draft.description = payload.description; 
            draft.evidence = payload.evidence;
        }),
        [insertEca.success]: produce((draft, { payload }) => {
            const { eca } = payload;
            draft.submitting = false;
            draft.ecas = [...draft.ecas, eca ];
        }),
        [insertEca.failure]: produce((draft, { payload }) => {
            draft.submitting = false;
            draft.error = payload;
        }),
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
        [getProfessors.request]: produce( draft => {
            draft.loadingProfessor = true;
            draft.error = null;
        }),
        [getProfessors.success]: produce((draft, { payload }) => {
            const { professors } = payload;
            draft.loadingProfessor = false;
            draft.professors = professors;
        }),
        [getProfessors.failure]: produce((draft, { payload }) => {
            draft.loadingProfessor = false;
            draft.error = payload;
        }),
    },
    initialState,
);
