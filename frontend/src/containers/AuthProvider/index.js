import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from './duck';
import saga from './sagas';

const key = 'auth';

function AuthProvider({ children }) {
    return children;
}

export default injectReducer({ key, reducer})(
    injectSaga({ key, saga })(AuthProvider),
)
