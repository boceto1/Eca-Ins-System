import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';

import { 
    Navbar, 
    Footer, 
    Link,
    Wrapper,
    Login,
    LoginTitle,
    Information,
    InformationInput,
    Actions,
    ActionButton,
} from './Layout';

function LoginPage ({ error, loading, authenticated, location, requestLogin }) {

    if(authenticated){
        console.log('Auth', authenticated);
    }
    return(
        <>
            <Navbar>
                <Link>ECA CHAIN</Link>
            </Navbar>
            <Wrapper>
                <Login>
                    <LoginTitle>Welcome</LoginTitle>
                    <Information>
                        <InformationInput 
                            type="text"
                            placeholder="Put your name"
                            required
                        />
                        <InformationInput 
                            type="password"
                            placeholder="Put your name"
                            required
                        />
                    </Information>
                    <Actions>
                        <ActionButton onClick={() => requestLogin('Jean', 'Test')}>Login as Student</ActionButton>
                        <ActionButton onClick={() => requestLogin('Karlo', 'Test2')}>Login as Professor</ActionButton>
                    </Actions>
                </Login>
            </Wrapper>
           <Footer >Jean Karlo Obando - 2020</Footer> 
        </>
    );
}

LoginPage.prototype = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    authenticated: PropTypes.bool,
    requestLogin: PropTypes.func,
    location: PropTypes.shape({}),
};

export default LoginPage;