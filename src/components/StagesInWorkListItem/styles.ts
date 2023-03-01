import styled from 'styled-components';

export const FlexContainer = styled.div`
  ${({ theme }) => theme.mixins.column};
  align-items: flex-end;
  gap: 40px;
`;
