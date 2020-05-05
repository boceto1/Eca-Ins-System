import React from 'react';

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

function LoginPage () {
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
                        <ActionButton>Login as Student</ActionButton>
                        <ActionButton>Login as Professor</ActionButton>
                    </Actions>
                </Login>
            </Wrapper>
           <Footer >Jean Karlo Obando - 2020</Footer> 
        </>
    );
}

export default LoginPage;