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

import { makeSelectRol, makeSelectAuthenticated }  from '../AuthProvider/selector'

function App({ rol, authenticated }) {
  return (
    <Router>
        <Switch>
          <Redirect
            exact
            from='/'
            to= {
              authenticated
                ? '/me'
                : '/login'
            }
          />
          <Route path="/login" component={LoginPage}/>
          <Route path="/">
              <About />
          </Route>
          <Route path="/me">
            <PageStudent />
          </Route>
        </Switch>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function PageStudent() {
  return <h2>PageStudent</h2>;
}

function PageProfessor() {
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