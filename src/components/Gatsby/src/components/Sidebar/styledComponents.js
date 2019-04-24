import styled from 'styled-components';
import colors from '../../constants/colors';
import style from '../../constants/style';

export const Sidebar = styled.aside`
  position: fixed;
  left: 0;
  width: ${style.asideWidth};
  height: 100%;
  padding: 1em;
  background-color: ${colors.second};
`;

export const NavList = styled.ul`
  margin: 0;
  display: flex;
  flex-direction: column;
  color: ${colors.textMain};
`;

export const NavItem = styled.li`
  display: flex;
  align-items: center;
  margin: 0 0 0 1em;
  padding: 0.5em 0;
  border-bottom: 0.05em solid ${colors.main50};
  position: relative;
  
  & a {
    color: ${colors.textBody};
    text-decoration: none;
    width: 100%;
  }

  &:before {
    content: '';
    transition: 0.5s;
    width: 0.5em;
    height: 0.5em;
    position: absolute;
    left: -0.8em;
    border-radius: 50%;
    display: block;
    background-color: ${colors.main};
    transform: scale(0);
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    &:before {
      transform: scale(1);
    }
  }
`;