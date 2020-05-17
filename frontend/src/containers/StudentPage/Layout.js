import styled from 'styled-components';

import { 
    Navbar as BaseNavbar,
    Link as LinkBase,
    Footer as BaseFooter,
} from '../LoginPage/Layout';

export const Navbar = BaseNavbar;

export const Link = LinkBase;

export const Footer = BaseFooter;

export const Wrapper = styled.div `
  margin: 5px 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const StudentForm = styled.form`
  width: 55%;
  display: flex;
  flex: 1;
  flex-direction: column;
  border: 1px solid #333d51;
  box-sizing: border-box;
  margin-left: 20px;
  padding-bottom: 20px;
`;

export const StudenLabelForm = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 3px 10px;
`;

export const StudenElementLabelForm = styled.div`
  flex: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

export const InputElement = styled.input`
    background: rgba(203, 208, 216, 0.8);
    border-radius: 1px;
    height: 30px;
    padding: 2px;
    margin-left: 15px;
`;

export const TextAreaElement = styled.textarea`
    background: rgba(203, 208, 216, 0.8);
    border-radius: 1px;
    height: 90px;
    width: 175px;
    resize: none;
    margin-left: 20px;
    padding: 2px;
    margin-left: 15px;
`;

export const ButtomElement = styled.button`
    width: 70px;
    height: 30px;
    background: #D3AC2B;
    border-radius: 4px;
    color: #F4F3EA;
    font-size: medium;
    margin-left: 250px;
`;

export const TitleElement = styled.p`
    font-weight: bold;
`;



export const WrapSummarizeEca = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
`;

export const SummarizeEcaTable = styled.table`
    background: #CBD0D8;
    border: 1px solid #333D51;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-collapse: collapse;
    width: 100%;
`;

export const EcaTableTitle = styled.th`
    border: 2px solid #F4F3EA;
    padding: 8px;
    text-align: center;
    background-color: #D3AC2B;
    color: #F4F3EA;
`;

export const EcaTableContent = styled.td`
    border: 2px solid #F4F3EA;
    padding: 8px;
`;

export const EcaTableRow = styled.tr`
  &:hover {
    background-color: #333D51;
    color: #F4F3EA;
  }
`;