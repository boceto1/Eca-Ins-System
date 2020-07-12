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

export const makeSelectLinkPortfolio = () =>
    createSelector(
        selectProfile,
        ({ link }) => link,
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

export const makeSelectLoadingLink = () =>
    createSelector(
        selectProfile,
        ({ loadingLink }) => loadingLink,
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

export const makeSelectLinkError = () => 
    createSelector(
        selectProfile,
        ({ errorLink }) => errorLink,
    );