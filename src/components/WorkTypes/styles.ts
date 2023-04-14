import styled from 'styled-components';

export const FormFlexContainer = styled.div`
  position: relative;
  max-width: 510px;
  min-height: calc(100vh - 336px);
  ${({ theme }) => theme.mixins.column};
  gap: 3rem;
`;
