import { createSelector } from 'reselect';
import { initialState } from './duck';

const selectEcas = state => state.mainStudent || initialState; 

export const makeSelectEcas = () =>
    createSelector(
        selectEcas,
        ({ ecas }) => ecas,
    );

export const makeSelectProfessors = () => 
    createSelector(
        selectEcas,
        ({ professors }) => professors,
    );

export const makeSelectLoading = () => 
    createSelector(
        selectEcas,
        ({ loading }) => loading,
    );

export const makeSelectError = () => 
    createSelector(
        selectEcas,
        ({ error }) => error,
    );

export const makeSelectLoadingProfessors = () => 
    createSelector(
        selectEcas,
        ({ loadingProfessor }) => loadingProfessor,
    )

export const makeSelectSubmitting = () => 
    createSelector(
        selectEcas,
        ({ submitting }) => submitting,
    )
