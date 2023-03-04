import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: calc(100vh - 289px);
  position: relative;
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

export const FooterWrapper = styled.div`
  position: relative;
`;

export const ProjectNumber = styled.div`
  position: absolute;
  top: -48px;
  right: 0;
  font-family: var(--font-roboto);
  font-style: normal;
  font-weight: 500;
  font-size: 96px;
  line-height: 112px;
  text-align: end;
  color: var(--green2);
`;
