import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import LoginPage from '../LoginPage/'
// import StudentPage from '../StudentPage';
// import EcaPage from '../EcaPage';
// import ProfessorPage from '../ProfessorPage';

import { makeSelectRol, makeSelectAuthenticated }  from '../AuthProvider/selector'

import PrivateRoutes from './PrivateRoutes';

const privateRoutesPath = '/:path(me|ecas)';

const defaultRedirectByRole = {
  student: '/me',
  professor: '/ecas',
  noRoleAssigned: '/unauthorized',
};

function App({ rol, authenticated }) {
  return (
    <>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route 
            path={privateRoutesPath}
            render= { ( { location }) => (
              <PrivateRoutes location={location} authenticated={authenticated} />
            )}
          />
          <Redirect 
            exact
            from="/"
            to={
              authenticated
                ? defaultRedirectByRole[rol] || '/unauthorized'
                : '/login'
            }
            />
            <Route path="/unauthorized" component={UnauthorizedPage} />
            <Route component={NotFoundPage} />
      </Switch>
      <Switch>
          <Route path={privateRoutesPath} render={() => null} />
        </Switch>
    </>
  )
}

function UnauthorizedPage() {
  return <h2>Unauthorized Page</h2>;
}

function NotFoundPage() {
  return <h2>Not Found Page</h2>;
}

App.prototype = {
  rol: PropTypes.string,
  authenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  rol: makeSelectRol()(state),
  authenticated: makeSelectAuthenticated()(state),
});



export default connect(mapStateToProps)(React.memo(App));