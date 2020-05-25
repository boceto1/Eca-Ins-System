import React, { useEffect, useState } from 'react';

import {
    Navbar,
    Link,
    Footer,
    Wrap,
    LabelInfo,
    LabelElement,
    Title,
    Description,
    TextAreaElement,
    SelectElement,
    ButtonElement
} from './Layout';

function EcaPage({ 
    eca, 
    approvedEca,
    loading, 
    approving,
    error, 
    rol, 
    skills ,
    getEca, 
    logout, 
    approveEca
}) {

    useEffect(() => {
        // console.log(location.match.params.id);
        getEca('5ec1bfe3b8457b0f78e6212f');
    }, []);

    const [ecaSoftSkills, setEcaSoftSkills] = useState([]);
    const [softSkills, setSoftSkills] = useState('');

    function showSoftSkills() {
        if (Object.entries(eca).length !== 0) {
            if (eca.softSkills.length !== 0) {
                return eca.softSkills.map(softSkill => <li>{softSkill}</li>)
            } else {
                return (<li>No hay soft skills</li>)
            }
        }
    }

    function showSoftSkillsToBeSelected() {
    const ecas = skills.map(skill => <option value={skill._id+','+skill.name}>{skill.name}</option>)
        return (
            <>
                <TextAreaElement value={softSkills}/>
                <SelectElement onChange={handleSelectSoftSkills}>
                    {ecas}
                </SelectElement>

            </>
        )
    }

    const handleLogOut = () => logout();

    const handleSelectSoftSkills = (event) => {
        const [id, name] = event.target.value.split(',');
        const currentSoftSkills = ecaSoftSkills;
        currentSoftSkills.push(id);
        setSoftSkills(softSkills + name + '\n')
        setEcaSoftSkills(currentSoftSkills);
    }

    const handleApproveEca = () => {
        approveEca(eca._id, ecaSoftSkills);
    }   


    return (
        <>
            <Navbar>
                <Link>ECA CHAIN</Link>
                <Link>Profile</Link>
                <Link onClick={handleLogOut}>Salir</Link>
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
                            {rol === 'professor' ? (
                                <>
                                <Title>Soft Skills</Title>
                                <div>
                                    {showSoftSkillsToBeSelected()}
                                </div>
                                </>
                            ) : (
                                    <>
                                        <h4><Title>Soft Skills</Title></h4>
                                        <ul>
                                            {showSoftSkills()}
                                        </ul>
                                    </>
                                )}
                        </LabelInfo>
                        <LabelInfo>
                            <h4>
                                <Title>Link: </Title>
                                <a href={eca.evidenceLink}>{eca.evidenceLink}</a>
                            </h4>
                        </LabelInfo>
                        {rol === 'professor' && (
                            <ButtonElement  onClick={handleApproveEca}>Approve</ButtonElement>
                        )}
                    </Wrap >

                )
            }
            <Footer >Jean Karlo Obando - 2020</Footer>
        </>
    )
}

export default EcaPage;