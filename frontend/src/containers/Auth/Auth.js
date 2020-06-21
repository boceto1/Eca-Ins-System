import React from 'react';
import PropTypes from 'prop-types';
import { includes } from 'loadsh';

const isAuthorized = (allowedRoles, userRol) => {
    return includes(userRol, allowedRoles);
}

function Auth ({ allowed, userRol, notAuthorized, children }){
    console.log(isAuthorized(allowed, userRol) ? children : notAuthorized)
    return isAuthorized(allowed, userRol) ? children : notAuthorized;
}

Auth.propTypes = {
    allowed: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    userRol: PropTypes.string,
    notAuthorized: PropTypes.element,
    children: PropTypes.element,
};

export default React.memo(Auth);