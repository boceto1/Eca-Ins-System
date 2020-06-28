import { createActions, handleActions } from 'redux-actions';
import produce from 'immer';

export const key = 'profile';

export const initialState = {
    balance: null,
    ecas: [],
    loadingBalance: false,
    loadingEcas: false,
    errorBalance: false,
    errorEcas: false,
}

export const {
  getBalance,
  getBlockchainEcas,
} = createActions({
    GET_BALANCE: {
      REQUEST: () => null,
      SUCCESS: balance => ({ balance }),
      FAILURE: error => ({ error })
    },
    GET_BLOCKCHAIN_ECAS:{
      REQUEST: () => null,
      SUCCESS: ecas => ({ ecas }),
      FAILURE: error => ({ error })
    },
},  { prefix: 'src/containers/ProfilePage'});

export default handleActions({
    [getBalance.request]: produce(draft => {
        draft.loadingBalance = true;
    }),
    [getBalance.success]: produce((draft, { payload }) => {
        const { balance } = payload;
        draft.balance = balance;
        draft.loadingBalance = false;
    }),
    [getBalance.failure]: produce((draft, { payload }) => {
        draft.loadingBalance = false;
        draft.errorBalance = payload;
    }),
    [getBlockchainEcas.request]: produce(draft => {
        draft.loadingEcas = true;
    }),
    [getBlockchainEcas.success]: produce((draft, { payload }) => {
        const { ecas } = payload;
        draft.loadingEcas = false;
        draft.ecas = ecas;
    }),
    [getBlockchainEcas.failure]: produce((draft, { payload }) => {
        draft.loadingEcas = false;
        draft.errorEcas = payload;
    }),
}, initialState);
