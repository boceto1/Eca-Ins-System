import React, { useEffect } from 'react';
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
    EcaTableContent
} from './Layout';

function StudentPage({
    ecas,
    professors,
    loading,
    error,
    getEcas,
    getProfessors,
    insertEca,
}) {

    console.log(getEcas)

    useEffect(() => { 
        getEcas();
    }, []);

    return (
        <>
            <Navbar>
                <Link href='/'>ECA CHAIN</Link>
                <Link href='/profile'>Profile</Link>
            </Navbar>
            <Wrapper>
                <StudentForm>
                    <StudenLabelForm><h3>Apply for ECA</h3></StudenLabelForm>
                    <StudenLabelForm>
                        <StudenElementLabelForm>
                            <TitleElement>Title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TitleElement>
                            <InputElement />
                        </StudenElementLabelForm>
                        <StudenElementLabelForm>
                            <TitleElement>Evidence: </TitleElement>
                            <InputElement />
                        </StudenElementLabelForm>
                    </StudenLabelForm>
                    <StudenLabelForm>
                        <StudenElementLabelForm>
                            <TitleElement>Description: </TitleElement>
                            <TextAreaElement />
                        </StudenElementLabelForm>
                        <StudenElementLabelForm>
                            <TitleElement>Professor: </TitleElement>
                            <InputElement />
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
                            <EcaTableRow>
                                <EcaTableContent>1asd3ad...</EcaTableContent>
                                <EcaTableContent>Hackaton Conecta Culturas</EcaTableContent>
                                <EcaTableContent>Approved</EcaTableContent>
                            </EcaTableRow>
                        </tbody>
                    </SummarizeEcaTable>
                </WrapSummarizeEca>
            </Wrapper>
            <Footer >Jean Karlo Obando - 2020</Footer>
        </>
    )
}

StudentPage.propTypes = {
    ecas: PropTypes.arrayOf(PropTypes.shape({})),
    professors: PropTypes.arrayOf(PropTypes.shape({})),
    loading: PropTypes.bool,
    error: PropTypes.string,
    insertEca: PropTypes.func,
    getEcas: PropTypes.func,
    getProfessors: PropTypes.func,
};

export default StudentPage;