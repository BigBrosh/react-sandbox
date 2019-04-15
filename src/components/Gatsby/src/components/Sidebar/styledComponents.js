import styled from 'styled-components';
import colors from '../../constants/colors';

export const Sidebar = styled.section`
  position: fixed;
  left: 0;
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  background-color: ${colors.second};
  color: ${colors.textMain};
`;

export const navItem = `
  display: flex;
  align-items: center;
  margin: 0 0 0 1em;
  padding: 0.5em 0;
  border-bottom: 0.05em solid ${colors.main50};
  position: relative;
  color: ${colors.textBody};
  text-decoration: none;

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