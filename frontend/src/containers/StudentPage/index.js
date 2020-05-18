import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import reducer, { getEcas, getProfessors, insertEca, key } from './duck';
import { 
    makeSelectEcas,
    makeSelectProfessors,
    makeSelectLoading,
    makeSelectError,
    makeSelectLoadingProfessors,
    makeSelectSubmitting,
} from './selector';
import saga from './sagas';

import StudentPage from './StudentPage';

const mapStateToProps = state => ({
    ecas: makeSelectEcas()(state),
    professors: makeSelectProfessors()(state),
    loading: makeSelectLoading()(state),
    loadingProfessor: makeSelectLoadingProfessors()(state),
    submitting: makeSelectSubmitting()(state),
    error: makeSelectError()(state),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getEcas: getEcas.request,
        getProfessors: getProfessors.request,
        insertEca: insertEca.request,
    },dispatch);

export default injectReducer({ key, reducer })(
    injectSaga({ key, saga })(
        connect(
            mapStateToProps,
            mapDispatchToProps,
        )(React.memo(StudentPage)),
    ),
);
