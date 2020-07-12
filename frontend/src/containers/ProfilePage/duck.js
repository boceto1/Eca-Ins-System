import { createActions, handleActions } from 'redux-actions';
import produce from 'immer';

export const key = 'profile';

export const initialState = {
    balance: null,
    ecas: [],
    link: null,
    loadingBalance: false,
    loadingEcas: false,
    loadingLink: false,
    errorBalance: false,
    errorEcas: false,
    errorLink: false,
}

export const {
  getBalance,
  getBlockchainEcas,
  getShareLink
} = createActions({
    GET_BALANCE: {
      REQUEST: (token) => ({ token }),
      SUCCESS: balance => ({ balance }),
      FAILURE: error => ({ error })
    },
    GET_BLOCKCHAIN_ECAS:{
      REQUEST: (token) => ({ token }),
      SUCCESS: ecas => ({ ecas }),
      FAILURE: error => ({ error })
    },
    GET_BLOCKCHAIN_ECAS:{
        REQUEST: (token) => ({ token }),
        SUCCESS: ecas => ({ ecas }),
        FAILURE: error => ({ error })
      },
    GET_SHARE_LINK: {
        REQUEST: () => null,
        SUCCESS: link => ({ link }),
        FAILURE: error => ({ error })
    }
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
    [getShareLink.request]: produce(draft => {
        draft.loadingLink = true;
    }),
    [getShareLink.success]: produce((draft, { payload }) => {
        const { link } = payload;
        draft.loadingLink = false;
        draft.link = link.link;
    }),
    [getShareLink.failure]: produce((draft, { payload }) => {
        draft.loadingLink = false;
        draft.errorLink = payload;
    }),
}, initialState);
