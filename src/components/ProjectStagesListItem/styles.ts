import styled from 'styled-components';

export const Wrapper = styled.div`
  padding-top: 60px;
  ${({ theme }) => theme.mixins.column};
  gap: 54px;
`;

export const Stack = styled.div`
  ${({ theme }) => theme.mixins.column};
  gap: 142px;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0 70px;
`;
