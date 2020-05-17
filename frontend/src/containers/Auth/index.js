import { connect } from 'react-redux';
import { makeSelectRol } from '../AuthProvider/selector';

import Auth from './Auth';

const mapStateToProps = state => ({
    userRol: makeSelectRol()(state),
});

export default connect(mapStateToProps)(Auth);
