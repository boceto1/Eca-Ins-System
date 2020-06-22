import React from 'react';

import { Navbar, Link, Footer, Wrapper, Header, Table, TableRow, TableTitle, TableElement, SoftSkillsList } from './Layout';

function ProfilePage() {

    return (
        <>
            <Navbar>
                <Link href='/'>ECA CHAIN</Link>
                <Link href='/profile'>Profile</Link>
                <Link onClick={() => {}}>Salir</Link>
            </Navbar>
            <Wrapper>
                <Header>
                    <h3>Approved ECAs</h3>
                    <h4>Summary Soft Skills</h4>
                    <SoftSkillsList>
                    <ul>
                      <li>Comunicacion: 1</li>
                      <li>Liderazgo: 4</li>
                      <li>Pensamiento Critico: 5</li>
                    </ul>
                </SoftSkillsList>
                <h3>List ECAs</h3>
                </Header>
                <Table>
                    <TableRow>
                        <TableTitle>Id</TableTitle>
                        <TableTitle>Title</TableTitle>
                        <TableTitle>Id Block</TableTitle>
                        </TableRow>
                </Table>
            </Wrapper>
            <Footer >Jean Karlo Obando - 2020</Footer>
        </>
    )
}

export default ProfilePage;