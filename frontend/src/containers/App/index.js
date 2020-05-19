import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { get } from 'loadsh';

import LoginPage from '../LoginPage/'
import StudentPage from '../StudentPage';
import EcaPage from '../EcaPage';

import { makeSelectRol, makeSelectAuthenticated }  from '../AuthProvider/selector'

import PrivateRoutes from './PrivateRoutes';

const privateRoutesPath = '/:path(me)';

const defaultRedirectByRole = {
  student: '/me',
  professor: '/ecas',
  noRoleAssigned: '/unauthorized',
};

function App({ rol, authenticated }) {
  return (
    <Router>
        <Switch>
          <Route path="/login" component={LoginPage}/>
          <Route exact path="/ecas"><ProfessorPage /></Route>
          <Route exact path="/ecas/:id" component={EcaPage}/>
          <Route path="/me" component={StudentPage}/>
          <Route path="/unauthorized"> <UnauthorizedPage /></Route>
        </Switch>
    </Router>
  );
}

function UnauthorizedPage() {
  return <h2>Unauthorized Page</h2>;
}

function ProfessorPage() {
  return <h2>PageProfessor</h2>;
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