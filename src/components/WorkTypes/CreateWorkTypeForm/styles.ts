import styled from 'styled-components';

export const Form = styled.form`
  ${({ theme }) => theme.mixins.column};
  gap: 3rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const FlexContainer = styled.div`
  position: relative;
  min-height: calc(100vh - 336px);
  ${({ theme }) => theme.mixins.column};
  gap: 3rem;
`;
