import styled from 'styled-components';

export const LeftSideWrapper = styled.div`
  position: relative;
`;

export const RightSideWrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.mixins.column};
  align-items: center;
  justify-content: center;
  padding: 0 6px;
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
  text-align: center;
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

export const TotalListItem = styled.div`
  width: 64px;
  position: absolute;
  top: 72px;
`;

export const TotalTitle = styled(Title)`
  padding: 38px 0 36px;
  border-bottom: 1px solid var(--green);

  &:first-child {
    border-top: 1px solid var(--green);
  }
`;
