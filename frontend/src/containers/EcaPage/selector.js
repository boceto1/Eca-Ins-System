import { createSelector } from 'reselect';
import { initialState } from './duck';

const selectEca = state => state.ecaInfo || initialState;

export const makeSelectEca = () => 
    createSelector(
        selectEca,
        ({ eca }) => eca,
    );

export const makeSelectLoading = () => 
    createSelector(
        selectEca,
        ({ loading }) => loading,
    )

export const makeSelectError = () => 
    createSelector(
        selectEca,
        ({ error }) => error,
    );
    
export const makeSelectSkills = () => 
    createSelector(
        selectEca,
        ({ skills }) => skills,
    );