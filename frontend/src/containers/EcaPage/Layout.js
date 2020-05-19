import styled from 'styled-components';

import {
  Navbar as BaseNavbar,
  Link as LinkBase,
  Foote as BaseFooter,
} from '../LoginPage/Layout';

export const Navbar = BaseNavbar;
export const Link = Link;
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

export const Title = styled.div`
  font-weight: bold;
`;

export const 