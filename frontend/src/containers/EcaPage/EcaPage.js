import React from 'react';

import {
    Navbar,
    Link,
    Footer,
    Wrap,
    LabelInfo,
    LabelElement,
    Title,
    Description,
} from './Layout';

function EcaPage(location) {
    return (
        <>
            <Navbar>
                <Link>ECA CHAIN</Link>
                <Link>Profile</Link>
            </Navbar>
            <Wrap>
                <LabelInfo>
                    <h2>
                        <Title>Title:</Title>
                University Challenge
              </h2>
                </LabelInfo>
                <LabelInfo>
                    <LabelElement>
                        <h2>
                            <Title>Id: </Title>
                    4asdfd
                </h2>
                    </LabelElement>
                    <LabelElement>
                        <h2>
                            <Title>Status: </Title>
                    Processing
                </h2>
                    </LabelElement>
                </LabelInfo>
                <LabelInfo>
                    <LabelElement>
                        <h4>
                            <Title>Student: </Title>
                      Jean Karlo Obando
                  </h4>
                    </LabelElement>
                    <LabelElement>
                        <h4>
                            <Title>Professor: </Title>
                      Ing. Tatiana Gualotuña
                  </h4>
                    </LabelElement>
                </LabelInfo>
                <LabelInfo>
                  <Description>
                      <Title>Description: </Title>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum reprehenderit dicta, esse dignissimos sunt labore exercitationem fugit reiciendis! Autem laborum excepturi ipsa temporibus mollitia maxime error ipsam! Esse, voluptatem reprehenderit.
                  </Description>
                </LabelInfo>
                <LabelInfo>
                    <h4><Title>Soft Skills</Title></h4>
                    <ul>
                        <li>Communication</li>
                        <li>Leadship</li>
                        <li>Team Work</li>
                    </ul>
                </LabelInfo>
                <LabelInfo>
                    <h4>
                        <Title>Link: </Title>
                        <a href="#">www.google-drive/docs/challenge</a>
                    </h4>
                </LabelInfo>
            </Wrap>
            <Footer >Jean Karlo Obando - 2020</Footer>
        </>
        // <h1>React Page {location.match.params.id}</h1>
    )
}

export default EcaPage;