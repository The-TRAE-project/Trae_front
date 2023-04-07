import styled from 'styled-components';

export const Form = styled.form`
  ${({ theme }) => theme.mixins.column};
  gap: 3rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
`;
