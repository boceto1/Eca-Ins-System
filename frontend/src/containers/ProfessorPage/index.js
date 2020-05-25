import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import reducer, { getEcas, key } from './duck';
import { logout } from '../AuthProvider/duck';
import { makeSelectEcas, makeSelectLoading, makeSelectError } from './selector';
import saga from './sagas';

import ProfessorPage from './ProfessorPage';

const mapStateToProps = state => ({
    ecas: makeSelectEcas()(state),
    loading: makeSelectLoading()(state),
    error: makeSelectError()(state),
});

const mapDispatchToProps = dispatch => 
    bindActionCreators({
        getEcas: getEcas.request,
        logout
    }, dispatch);

export default injectReducer({ key, reducer })(
    injectSaga({key, saga})(
        connect(
            mapStateToProps,
            mapDispatchToProps,
        )(React.memo(ProfessorPage)),
    )
);