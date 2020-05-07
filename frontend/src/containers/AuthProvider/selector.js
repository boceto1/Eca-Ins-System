import { createSelector } from 'reselect';
import { initialState } from './duck';

const selectAuth = state => state.auth || initialState;

export const makeSelectAuthenticated = () => 
    createSelector(
        selectAuth,
        ({ authenticated }) => authenticated,
    );

export const makeSelectAuthLoading = () =>
    createSelector(
        selectAuth,
        ({ loading }) => loading,
    );

export const makeSelectAuthError = () => 
    createSelector(
        selectAuth,
        ({ error }) => error,
    );

export const makeSelectUser = () => 
    createSelector(
        selectAuth,
        ({ user }) => user,
    );

export const makeSelectToken = () => 
    createSelector(
        selectAuth,
        ({ token }) => token,
    );

export const makeSelectRol = () =>
    createSelector(
        selectAuth,
        ({ rol }) => rol,
    );
