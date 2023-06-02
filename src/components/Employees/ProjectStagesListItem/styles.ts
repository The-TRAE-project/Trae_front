import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: calc(100vh - 289px);
  position: relative;
  padding-top: 60px;
  ${({ theme }) => theme.mixins.column};
  gap: 54px;
`;

export const FlexContainer = styled.div`
  position: relative;
  min-height: 28rem;
`;
