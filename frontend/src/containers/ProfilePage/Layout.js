import styled from 'styled-components';

import {
    Navbar as BaseNavbar,
    Link as LinkBase,
    Footer as BaseFooter,
} from '../LoginPage/Layout';

export const Navbar = BaseNavbar;
export const Link = LinkBase;
export const Footer = BaseFooter;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 10px;
    padding: 10px;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    & h3,h4 {
        margin: 3px 10px;
    }
`;

export const SoftSkillsList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & li {
    display:inline;
    margin-left: 10px;
  }
`
export const Table = styled.table`
    background: #CBD0D8;
    border: 1px solid #333D51;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-collapse: collapse;
    width: 100%;
`;

export const TableTitle = styled.th`
    border: 2px solid #F4F3EA;
    padding: 8px;
    text-align: center;
    background-color: #D3AC2B;
    color: #F4F3EA;

`;

export const TableElement = styled.td`
    border: 2px solid #F4F3EA;
    padding: 8px;
`;

export const TableRow = styled.tr`
  &:hover {
    background-color: #333D51;
    color: #F4F3EA;
  }
`;
