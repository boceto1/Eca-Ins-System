import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import reducer, { getEca, approveEca, key } from './duck';
import { logout } from '../AuthProvider/duck';
import {
    makeSelectEca,
    makeSelectLoading,
    makeSelectError,
    makeSelectSkills,
    makeSelectApprovedEca,
    makeSelectApprovingEca,
} from './selector';
import { makeSelectRol } from '../AuthProvider/selector';
import saga from './sagas';

import EcaPage from './EcaPage';

const mapStateToProps = state => ({
    eca: makeSelectEca()(state),
    loading: makeSelectLoading()(state),
    error: makeSelectError()(state),
    rol: makeSelectRol()(state),
    skills: makeSelectSkills()(state),
    approving: makeSelectApprovingEca()(state),
    approvedEca: makeSelectApprovedEca()(state),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getEca: getEca.request,
        logout,
        approveEca: approveEca.request,
    }, dispatch);

export default injectReducer({ key, reducer})(
    injectSaga({ key, saga })(
        connect(
            mapStateToProps,
            mapDispatchToProps,
        )(React.memo(EcaPage)),
    ),
);