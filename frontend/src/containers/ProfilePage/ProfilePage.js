import React, { useEffect } from 'react';

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
    SharedLink
} from './Layout';

function ProfilePage({
    balance,
    ecas,
    link,
    errorEcas,
    errorBalance,
    errorLink,
    loadingEcas,
    loadingBalance,
    loadingLink,
    getBalance,
    getBlockchainEcas,
    getSharedLink,
    logout,
    match,
}) {
    useEffect(() => {
        const token = match.params.token;
        getBalance(token);
        getBlockchainEcas(token);
    }, []);

    const showSoftSkills = () => {
        if (balance) {
            const softSkills = balance.balance.softSkills;
            const renderedSkills = [];

            for (const skill in softSkills) {
                if (softSkills.hasOwnProperty(skill)) {
                    const value = softSkills[skill];
                    renderedSkills.push(<li>{skill}: {value}</li>)
                }
            }

            return renderedSkills;
        }
    }

    const sharePortfolio = (<SharedLink>
        <button onClick={() => getSharedLink()}>{loadingLink ? 'Sharing': 'Share'}</button>
        <br />
        {link && (<a href={link} target='_blank'>Public portfolio</a>)}
        
    </SharedLink>)

    const showBlockchainEcas = () => {
        if (ecas) {
            return ecas.map(eca =>
                <>
                    <TableRow>
                        <TableElement>{eca.id}</TableElement>
                        <TableElement>{eca.ecaInformation.studentInformation.title}</TableElement>
                        <TableElement>{eca.ecaInformation.studentInformation.description}</TableElement>
                    </TableRow>
                </>
            );
        }
    }

    const handleLogOut = () => logout();

    return (
        <>
            <Navbar>
                {match.params.token ? (
                    <Link>ECA CHAIN</Link>
                ) :
                (
                    <>
                    <Link href='/'>ECA CHAIN</Link>
                    <Link href='/profile'>Profile</Link>
                    <Link onClick={handleLogOut}>Salir</Link>
                    </>
                )
        }

            </Navbar>
            <Wrapper>
                <Header>
                    <h3>Approved ECAs</h3>
                    {loadingBalance ? (<h3>Loading Balance</h3>) : (
                        <>
                            <h4>Summary Soft Skills {balance ? balance.balance.ecas : null}</h4>
                            <ul>
                                {showSoftSkills()}
                            </ul>
                        </>
                    )}
                    {!match.params.token && sharePortfolio}
                    <h3>List ECAs</h3>
                </Header>
                <Table>
                    <TableRow>
                        <TableTitle>Id</TableTitle>
                        <TableTitle>Title</TableTitle>
                        <TableTitle>Description</TableTitle>
                    </TableRow>
                    {loadingEcas || ecas.length === 0 ?
                        <h3>Loading Balance</h3> :
                        showBlockchainEcas()
                    }
                </Table>
            </Wrapper>
            <Footer >Jean Karlo Obando - 2020</Footer>
        </>
    )
}

export default ProfilePage;