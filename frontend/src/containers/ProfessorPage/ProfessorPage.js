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
        <TableRow>
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
                    <Link href='/profile'>Profile</Link>
                    <Link onClick={() => logout()}>Salir</Link>
                </Navbar>
                <Wrapper>
                    {loading ? <h1>Loading...</h1> : (
                        <>
                            <Header><h2>Ecas por Revisar</h2></Header>
                            <Table>
                                <TableRow>
                                    <TableTitle>Id</TableTitle>
                                    <TableTitle>Title</TableTitle>
                                    <TableTitle>Student</TableTitle>
                                </TableRow>
                                {showEcas()}
                            </Table>
                        </>
                    )}
                </Wrapper>
                <Footer >Jean Karlo Obando - 2020</Footer>
            </div>
        </>
    );
}


export default ProfesorPage;