import React from 'react';
import PropTypes from 'prop-types';
import { intersection, includes} from 'loadsh';

const isAuthorized = (allowedRoles, userRol) => {
    if(typeof allowedRoles === 'string') {
        // Change for conditional check
        return includes(userRol, allowedRoles);
    }
    return intersection(allowedRoles, userRol).length > 0;
}

function Auth ({ allowed, userRol, notAuthorized, children }){
    return isAuthorized(allowed, userRol) ? children : notAuthorized;
}

Auth.propTypes = {
    allowed: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    userRol: PropTypes.arrayOf(PropTypes.string),
    notAuthorized: PropTypes.element,
    children: PropTypes.element,
};

export default React.memo(Auth);