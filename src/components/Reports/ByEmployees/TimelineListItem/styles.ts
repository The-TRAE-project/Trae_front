import styled from 'styled-components';

export const LeftSideWrapper = styled.div`
  position: relative;
`;

export const HorizontalDivider = styled.div`
  position: absolute;
  top: 30px;
  width: 105%;
  height: 1px;
  background: var(--green);
  transform: rotate(21.54deg);
`;

export const Title = styled.p`
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize20}
  color: var(--black);
`;

export const DateTitle = styled(Title)`
  position: absolute;
  top: 0;
  right: 23px;
`;

export const EmployeeTitle = styled(Title)`
  position: absolute;
  bottom: 2px;
  left: 0;
`;
