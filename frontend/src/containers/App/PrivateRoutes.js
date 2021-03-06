import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from '../Auth';

import StudentPage from '../StudentPage'
import ProfessorPage from '../ProfessorPage';
import EcaPage from '../EcaPage';
import ProfilePage from '../ProfilePage';

const AuthRoute = ({ allowed, component: Component, children, ...rest}) => {
    if (!Component && children){
        return (
            <Auth allowed={allowed}>
                <Route {...rest}>{children}</Route>
            </Auth>
        )
    }
    return (
        <Route
          {...rest}
          render= { props => (
              <Auth allowed={allowed} notAuthorized={<Redirect to="/unauthorized" />}>
                  <Component {...props} />
              </Auth>
          )}
        />
    );
};

AuthRoute.propTypes = {
    allowed: PropTypes.arrayOf(PropTypes.string),
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

function PrivateRoutes({ location, authenticated }){
    if(!authenticated) {
        return (
            <Redirect 
              to={{ pathname: 'login', state: { from: location.pathname }}}
            />
        );
    }
    return(
        <>
          <Switch>
              <AuthRoute 
                allowed={['student']}
                path='/me'
                component={StudentPage}
              />
              <AuthRoute 
                allowed={['professor']}
                exact path='/ecas'
                component={ProfessorPage}
              />
              <AuthRoute 
                allowed={['student', 'professor']}
                exact path='/ecas/:id'
                component={EcaPage}
              />
              <AuthRoute 
                allowed={['student']}
                exact path='/profile'
                component={ProfilePage}
              />
          </Switch>
        </>
    );
}

PrivateRoutes.propTypes = {
    location: PropTypes.shape({}),
    authenticated: PropTypes.bool,
};

export default React.memo(PrivateRoutes);