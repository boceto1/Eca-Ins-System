import React from 'react';
import { connect } from 'react-redux';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import reducer, { getBalance, getBlockchainEcas, key } from './duck';
import { logout } from '../AuthProvider/duck';
import {
    makeSelectBalance, 
    makeSelectBlockchainEcas, 
    makeSelectLoadingBalance, 
    makeSelectLoadingEcas, 
    makeSelectBalanceError, 
    makeSelectEcasError 
} from './selector';
import saga from './sagas';

import ProfilePage from './ProfilePage';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
    balance: makeSelectBalance()(state),
    ecas: makeSelectBlockchainEcas()(state),
    errorEcas: makeSelectEcasError()(state),
    errorBalance: makeSelectBalanceError()(state),
    loadingEcas: makeSelectLoadingEcas()(state),
    loadingBalance: makeSelectLoadingBalance()(state),
});

const mapDispatchToProps = dispatch =>
     bindActionCreators({
        getBalance: getBalance.request,
        getBlockchainEcas: getBlockchainEcas.request,
        logout,
     }, dispatch); 

export default injectReducer({ key, reducer })(
    injectSaga({ key, saga })(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(React.memo(ProfilePage)),
    )
)
