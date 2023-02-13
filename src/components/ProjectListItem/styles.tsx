import styled from 'styled-components';
import { fColumn } from '../../helpers/cssFragments';

export const Wrapper = styled.div`
  min-height: calc(100vh - 289px);
  padding-top: 97px;
  ${fColumn};
  justify-content: space-between;
  gap: 3rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 42px;
  row-gap: 83px;
`;
