import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
    Navbar,
    Link,
    Footer,
    Wrapper,
    StudentForm,
    StudenLabelForm,
    StudenElementLabelForm,
    InputElement,
    TitleElement,
    TextAreaElement,
    WrapSummarizeEca,
    SummarizeEcaTable,
    EcaTableRow,
    EcaTableTitle,
    EcaTableContent,
    SelectElement, 
    ButtonElement,
} from './Layout';

function StudentPage({
    ecas,
    professors,
    loading,
    loadingProfessor,
    submitting,
    error,
    getEcas,
    getProfessors,
    insertEca,
    logout,
}) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [evidence, setEvidence] = useState('');
    const [professor, setProfessor ] = useState('');

    useEffect(() => {
        getEcas();
        getProfessors();
    }, []);

    const showStudentECAs = () => ecas.map(eca => (
        <EcaTableRow onClick={() => window.location.href = `/ecas/${eca.id}`}>
            <EcaTableContent>{eca.id}</EcaTableContent>
            <EcaTableContent>{eca.title}</EcaTableContent>
            <EcaTableContent>{eca.status}</EcaTableContent>
        </EcaTableRow>
    ));

    const showProfessors = () => professors.map(professor => (
        <option key={professor.id } value={professor.id}>{professor.name}</option>
    ));

    const handleChangeTitle = (event) =>
      setTitle(event.target.value);

    const handleChangeDescription = (event) =>
      setDescription(event.target.value);
    
    const handleChangeEvidence = (event) =>
      setEvidence(event.target.value);  

    const handleChangeProfessor = (event) =>
      setProfessor(event.target.value);  

    const handleInsertEca = () => {
        insertEca(title, professor, description, evidence);
    }

    const handleLogOut = () => logout();
       
    return (
        <>
            <Navbar>
                <Link href='/'>ECA CHAIN</Link>
                <Link href='/profile'>Profile</Link>
                <Link onClick={handleLogOut}>Salir</Link>
            </Navbar>
            {loading ? <h1>Loaging ...</h1>
                : (
                    <Wrapper>
                        <StudentForm>
                            <StudenLabelForm><h3>Apply for ECA</h3></StudenLabelForm>
                            <StudenLabelForm>
                                <StudenElementLabelForm>
                                    <TitleElement>Title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TitleElement>
                                    <InputElement onChange={handleChangeTitle} />
                                </StudenElementLabelForm>
                                <StudenElementLabelForm>
                                    <TitleElement>Evidence: </TitleElement>
                                    <InputElement onChange={handleChangeEvidence} />
                                </StudenElementLabelForm>
                            </StudenLabelForm>
                            <StudenLabelForm>
                                <StudenElementLabelForm>
                                    <TitleElement>Description: </TitleElement>
                                    <TextAreaElement onChange={handleChangeDescription} />
                                </StudenElementLabelForm>
                                <StudenElementLabelForm>
                                    <TitleElement>Professor: </TitleElement>
                                    <SelectElement 
                                      onChange = {handleChangeProfessor}
                                    >
                                        {
                                            loadingProfessor ? ( <option value="">loading...</option>):
                                            showProfessors()
                                        }
                                    </SelectElement>
                                </StudenElementLabelForm>
                            </StudenLabelForm>
                            <StudenLabelForm>
                                <StudenElementLabelForm />
                                <StudenElementLabelForm>
                                  <ButtonElement onClick={handleInsertEca}>
                                      Apply
                                  </ButtonElement>
                                </StudenElementLabelForm>
                            </StudenLabelForm>
                        </StudentForm>
                        <WrapSummarizeEca>
                            <SummarizeEcaTable>
                                <caption> My ECAs</caption>
                                <thead>
                                    <EcaTableRow>
                                        <EcaTableTitle>Id</EcaTableTitle>
                                        <EcaTableTitle>Title</EcaTableTitle>
                                        <EcaTableTitle>Status</EcaTableTitle>
                                    </EcaTableRow>
                                </thead>
                                <tbody>
                                    {showStudentECAs() || null}
                                </tbody>
                            </SummarizeEcaTable>
                        </WrapSummarizeEca>
                    </Wrapper>
                )
            }
            <Footer >Jean Karlo Obando - 2020</Footer>
        </>
    )
}

StudentPage.propTypes = {
    ecas: PropTypes.arrayOf(PropTypes.shape({})),
    professors: PropTypes.arrayOf(PropTypes.shape({})),
    loading: PropTypes.bool,
    loadingProfessor: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.string,
    insertEca: PropTypes.func,
    getEcas: PropTypes.func,
    getProfessors: PropTypes.func,
};

export default StudentPage;