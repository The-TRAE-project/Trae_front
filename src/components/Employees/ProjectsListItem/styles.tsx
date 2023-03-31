import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 289px);
  padding-top: 35px;
  ${({ theme }) => theme.mixins.column};
  justify-content: space-between;
  gap: 3rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 42px;
  row-gap: 83px;
`;
