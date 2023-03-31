import styled from 'styled-components';

export const Form = styled.form`
  ${({ theme }) => theme.mixins.column};
  gap: 3rem;
`;
