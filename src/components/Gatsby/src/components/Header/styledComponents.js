import styled from 'styled-components';
import colors from '../../constants/colors';

export const Header = styled.header`
  width: 100%;
  height: 3em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.main};
  color: ${colors.textSecond};
  padding: 0.5em;
`;