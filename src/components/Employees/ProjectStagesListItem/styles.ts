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
