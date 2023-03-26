import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: calc(100vh - 404px);
  ${({ theme }) => theme.mixins.column};
  justify-content: space-between;
  gap: 3rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;
