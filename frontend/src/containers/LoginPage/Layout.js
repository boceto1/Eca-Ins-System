import styled from 'styled-components';

export const Navbar = styled.div`
    display: flex;
    background-color: #333d51;
    align-items: baseline;  
`;

export const Link = styled.a`
    color: #F4F3EA;
    padding: 14px 15px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    font-size: 30px;
    &:hover {
        background-color: #D3AC2B;
    }
`;

export const Footer = styled.div`
    background-color: #D3AC2B;
    color: #F4F3EA;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2.5rem; 
    display: flex;
    justify-content: flex-end;
    align-content: center;
    padding: 10px 20px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export const Login = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 50px;
    padding: 10px;
    width: 400px;
    height: 330px;
    background: #CBD0D8;
    border: 1px solid #333D51;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const LoginTitle = styled.h1`
    font-size: 50px;
    text-align: center;
    margin-bottom: 10%;
`;

export const Information = styled.div`
    width: inherit;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
`;

export const InformationInput = styled.input`
    background: #F4F3EA;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    color: #1B202B;
    font-size: 14px;
    text-align: center;
    width: 200px;
    height: 30px;
    margin-bottom: 20px;
`;

export const Actions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const ActionButton = styled.button`
    background: #D3AC2B;
    border-radius: 4px;
    width: 150px;
    height: 30px;
    color: #F4F3EA;
    font-size: 16px;
`;