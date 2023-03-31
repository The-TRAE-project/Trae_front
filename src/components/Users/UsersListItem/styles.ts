import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  min-height: calc(100vh - 336px);
  ${({ theme }) => theme.mixins.column};
  justify-content: space-between;
  gap: 3rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;
