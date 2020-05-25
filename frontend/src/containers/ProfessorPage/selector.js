import { createSelector } from 'reselect';
import { initialState } from './duck';

const selectProfessorEcas = state => state.professorEcas || initialState;

export const makeSelectEcas = () =>
    createSelector(
        selectProfessorEcas,
        ({ ecas }) => ecas,
    );

export const makeSelectLoading = () =>
    createSelector(
        selectProfessorEcas,
        ({ loading }) => loading,
    );

export const makeSelectError = () =>
    createSelector(
        selectProfessorEcas,
        ({ error }) => error,
    );

