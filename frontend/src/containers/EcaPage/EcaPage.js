import React, { useEffect } from 'react';

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

function EcaPage({ eca, loading, error, getEca }) {

    useEffect(() => {
        // console.log(location.match.params.id);
        getEca('5ec1bfe3b8457b0f78e6212f');
    }, []);

    return (
        <>
            <Navbar>
                <Link>ECA CHAIN</Link>
                <Link>Profile</Link>
            </Navbar>
            {loading ? <h1>Loading...</h1>
                : (
                    <Wrap>
                        <LabelInfo>
                            <h2>
                                <Title>Title: </Title>
                {eca.title}
              </h2>
                        </LabelInfo>
                        <LabelInfo>
                            <LabelElement>
                                <h2>
                                    <Title>Id: </Title>
                    {eca._id}
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
                                {eca.description}
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
                )
            }
            <Footer >Jean Karlo Obando - 2020</Footer>
        </>
        // <h1>React Page {location.match.params.id}</h1>
    )
}

export default EcaPage;