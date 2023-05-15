import styled from 'styled-components';

export const FormWrapper = styled.form`
  ${({ theme }) => theme.mixins.column};
  gap: 50px;
`;
