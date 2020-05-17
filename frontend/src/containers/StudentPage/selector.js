import { createSelector } from 'reselect';
import { initialState } from './duck';

const selectEcas = state => state.ecas || initialState; 

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
