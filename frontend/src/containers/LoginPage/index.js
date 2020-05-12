import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../containers/AuthProvider/duck';
import {
    makeSelectAuthenticated,
    makeSelectAuthLoading,
    makeSelectAuthError,
} from '../../containers/AuthProvider/selector';

import LoginPage from './LoginPage';

const mapStateToProps = state => ({
    authenticated: makeSelectAuthenticated()(state),
    loading: makeSelectAuthLoading()(state),
    error: makeSelectAuthError()(state),
});

const mapDispatchToProps = dispatch => 
    bindActionCreators(
        {
            requestLogin: login.request,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(React.memo(LoginPage));
