import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: calc(100vh - 289px);
  position: relative;
  ${({ theme }) => theme.mixins.apart};
  align-items: baseline;
  padding-top: 45px;
  gap: 64px;
`;

export const FlexContainer = styled.div`
  ${({ theme }) => theme.mixins.column};
  align-items: flex-end;
  gap: 40px;
`;
