import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import reducer, { getEca, key } from './duck';
import { logout } from '../AuthProvider/duck';
import {
    makeSelectEca,
    makeSelectLoading,
    makeSelectError,
    makeSelectSkills,
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
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getEca: getEca.request,
        logout,
    }, dispatch);

export default injectReducer({ key, reducer})(
    injectSaga({ key, saga })(
        connect(
            mapStateToProps,
            mapDispatchToProps,
        )(React.memo(EcaPage)),
    ),
);