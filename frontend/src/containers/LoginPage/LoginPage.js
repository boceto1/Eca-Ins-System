import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

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

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    if(authenticated){
       const { from } = location.state || { from: '/'};
       return <Redirect to={from} />;
    }

    const handleChangeName = (event) =>
        setNickname(event.target.value);
    
    const handleChangePass = (event) =>
        setPassword(event.target.value);

    const handleSubmit = (type) => {
        requestLogin(nickname, password, type)
    }

    return(
        <>
            <Navbar>
                <Link>ECA CHAIN</Link>
                <Link href='https://youtu.be/hK6UHNTZJGw' target="_blank">Tutorial</Link>
            </Navbar>
            <Wrapper>
                <Login>
                    <LoginTitle>Welcome</LoginTitle>
                    <Information>
                        <InformationInput 
                            type="text"
                            placeholder="Put your name"
                            value={nickname}
                            onChange={handleChangeName}
                            required
                        />
                        <InformationInput 
                            type="password"
                            placeholder="Put your password"
                            value={password}
                            onChange={handleChangePass}
                            required
                        />
                    </Information>
                    <Actions>
                        <ActionButton onClick={() => handleSubmit('student')}>Login as Student</ActionButton>
                        <ActionButton onClick={() => handleSubmit('professor')}>Login as Professor</ActionButton>
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