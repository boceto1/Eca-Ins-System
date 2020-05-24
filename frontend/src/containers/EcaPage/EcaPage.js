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


    function showSoftSkills() {
        if(Object.entries(eca).length !== 0){
            if(eca.softSkills.length !==0){
            return eca.softSkills.map(softSkill => <li>{softSkill}</li>) 
            }else{
                return (<li>No hay soft skills</li>)
            }
        }
    }

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
                                    En Proceso
                </h2>
                            </LabelElement>
                        </LabelInfo>
                        <LabelInfo>
                            <LabelElement>
                                <h4>
                                    <Title>Student: </Title>
                      {eca.idStudent}
                  </h4>
                            </LabelElement>
                            <LabelElement>
                                <h4>
                                    <Title>Professor: </Title>
                      {eca.idProfessor}
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
                                {showSoftSkills()}
                            </ul>
                        </LabelInfo>
                        <LabelInfo>
                            <h4>
                                <Title>Link: </Title>
                                <a href={eca.evidenceLink}>{eca.evidenceLink}</a>
                            </h4>
                        </LabelInfo>
                    </Wrap>
                )
            }
            <Footer >Jean Karlo Obando - 2020</Footer>
        </>
    )
}

export default EcaPage;