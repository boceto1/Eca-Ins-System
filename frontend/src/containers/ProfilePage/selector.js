import { createSelector } from 'reselect';
import { initialState } from './duck';

const selectProfile = state => state.profile || initialState;

export const makeSelectBalance = () =>
    createSelector(
        selectProfile,
        ({ balance }) => balance,
    );

export const makeSelectBlockchainEcas = () =>
    createSelector(
        selectProfile,
        ({ ecas }) => ecas,
    );

export const makeSelectLoadingBalance = () =>
    createSelector(
        selectProfile,
        ({ loadingBalance }) => loadingBalance,
    );

export const makeSelectLoadingEcas = () =>
    createSelector(
        selectProfile,
        ({ loadingEcas }) => loadingEcas,
    );

export const makeSelectBalanceError = () =>
    createSelector(
        selectProfile,
        ({ errorBalance }) => errorBalance, 
    );

export const makeSelectEcasError = () => 
    createSelector(
        selectProfile,
        ({ errorEcas }) => errorEcas,
    );
