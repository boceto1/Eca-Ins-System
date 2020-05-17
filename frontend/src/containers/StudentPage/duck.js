import { createActions, handleActions } from 'redux-actions';
import produce from 'immer';

export const key = 'ecas';

export const initialState = {
    ecas: [],
    professors: [],
    loading: false,
}

export const {
    insertEca,
    getEcas,
    getProfessors,
} = createActions({
    INSERT_ECA: {
        REQUEST: (title, idProfessor, description, evidence) => ({
            title, idProfessor, description, evidence }),
        SUCCESS: ( ecas ) => ({ ecas }),
        FAILURE: error => ({ error }),
    },
    GET_ECAS: {
        REQUEST: () => null,
        SUCCESS: ecas  => ({ ecas }),
        FAILURE: error => ({ error }),
    },
    GET_PROFESSORS: {
        REQUEST: () => null,
        SUCCESS: ecas  => ({ ecas }),
        FAILURE: error => ({ error }),
    }
  },
  { prefix: 'src/containers/StudentPage'},
);

export default handleActions(
    {
        [insertEca.request]: produce((draft, { payload }) => {
            draft.loading = true;
            draft.title = payload.title;
            draft.idProfessor = payload.idProfessor; 
            draft.description = payload.description; 
            draft.evidence = payload.evidence;
        }),
        [insertEca.success]: produce((draft, { payload }) => {
            const { eca } = payload;
            draft.loading = false;
            draft.ecas = [...draft.ecas, eca];
        }),
        [insertEca.failure]: produce((draft, { payload }) => {
            draft.loading = false;
            draft.error = payload;
        }),
        [getEcas.request]: produce( draft => {
            draft.loading = true;
            draft.error = null;
        }),
        [getEcas.success]: produce((draft, { payload }) => {
            const { ecas } = payload;
            draft.loading = false;
            draft.ecas = ecas;
        }),
        [getEcas.failure]: produce((draft, { payload }) => {
            draft.loading = false;
            draft.error = payload;
        }),
        [getProfessors.request]: produce( draft => {
            draft.loading = true;
            draft.error = null;
        }),
        [getProfessors.success]: produce((draft, { payload }) => {
            const { professors } = payload;
            draft.loading = false;
            draft.professors = professors;
        }),
        [getProfessors.failure]: produce((draft, { payload }) => {
            draft.loading = false;
            draft.error = payload;
        }),
    },
    initialState,
);
