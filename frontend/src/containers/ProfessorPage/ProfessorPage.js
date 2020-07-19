import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import {
    Navbar,
    Link,
    Footer,
    Wrapper,
    Header,
    Table,
    TableRow,
    TableTitle,
    TableElement,
} from './Layout';

function ProfesorPage({
    ecas,
    loading,
    error,
    getEcas,
    logout
}) {
    useEffect(() => {
        getEcas();
    }, []); 

    const showEcas = () => ecas.map(eca => (<>
        <TableRow onClick={() => window.location.href = `/ecas/${eca.id}`} key={eca.id}>
            <TableElement>{eca.id}</TableElement>
            <TableElement>{eca.title}</TableElement>
            <TableElement>{eca.student}</TableElement>
        </TableRow>
    </>));

    return (
        <>
            <div>
                <Navbar>
                    <Link href='/'>ECA CHAIN</Link>
                    <Link onClick={() => logout()}>Salir</Link>
                </Navbar>
                <Wrapper>
                    {loading ? <h1>Loading...</h1> : (
                        <>
                            <Header><h2>No checked ECAs</h2></Header>
                            <Table>
                                <thead>
                                <TableRow>
                                    <TableTitle>Id</TableTitle>
                                    <TableTitle>Title</TableTitle>
                                    <TableTitle>Student</TableTitle>
                                </TableRow>
                                </thead>
                                <tbody>
                                {showEcas()}
                                </tbody>
                            </Table>
                        </>
                    )}
                </Wrapper>
                <Footer >Jean Karlo Obando - 2020</Footer>
            </div>
        </>
    );
}

ProfesorPage.prototype = {
    ecas: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    getEcas: PropTypes.func,
    logout: PropTypes.func
}



export default ProfesorPage;