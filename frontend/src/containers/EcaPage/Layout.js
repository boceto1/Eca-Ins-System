import styled from 'styled-components';

import {
  Navbar as BaseNavbar,
  Link as LinkBase,
  Footer as BaseFooter,
} from '../LoginPage/Layout';

export const Navbar = BaseNavbar;
export const Link = LinkBase;
export const Footer = BaseFooter;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 10px 20px;
  width: 70%;
`;

export const LabelInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px 0px;
`;

export const LabelElement = styled.div`
  flex: 30%;
`;

export const Title = styled.span`
  font-weight: bold;
`;

export const Description = styled.p`
  text-align: justify;
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

export const SelectElement = styled.select`
    background: rgba(203, 208, 216, 0.8);
    border-radius: 1px;
    height: 30px;
    padding: 2px;
    margin-left: 15px;
    min-width: 170px;
`;


export const ButtonElement = styled.button`
    width: 70px;
    height: 30px;
    background: #D3AC2B;
    border-radius: 4px;
    color: #F4F3EA;
    font-size: medium;
    margin-left: 250px;
`;