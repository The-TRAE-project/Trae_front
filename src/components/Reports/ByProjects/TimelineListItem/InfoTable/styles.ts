import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.column};
`;

export const Group = styled.div`
  ${({ theme }) => theme.mixins.center};
  border-bottom: 2px solid var(--green);
`;

export const HeaderTitle = styled.p`
  height: 50px;
  ${({ theme }) => theme.mixins.fCenter};
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize20};
  text-align: center;
  color: var(--black);
  border-right: 2px solid var(--green);
  word-break: break-all;
  padding: 3px 5px 5px;

  &:first-child {
    width: 48px;
  }

  &:nth-child(2) {
    width: 150px;
  }

  &:nth-child(3) {
    width: 100px;
  }

  &:nth-child(4) {
    width: 80px;
  }

  &:last-child {
    width: 170px;
    border-right: none;
  }
`;

const BaseText = styled.p`
  height: 95px;
  ${({ theme }) => theme.mixins.fCenter};
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize20};
  color: var(--black);
  text-align: center;
  overflow: auto;
  border-right: 2px solid var(--green);
`;

type ProjectNumberProps = {
  $isProjectOverdue?: boolean;
  $isProjectOpOverdue?: boolean;
};

export const ProjectNumber = styled(BaseText)`
  width: 48px;
  font-family: var(--font-roboto);
  color: var(--black);
  background: var(--white);
  padding: 5px;

  ${(props: ProjectNumberProps) =>
    props.$isProjectOverdue &&
    css`
      color: var(--white);
      background: var(--red);
    `}

  ${(props: ProjectNumberProps) =>
    props.$isProjectOpOverdue &&
    css`
      color: var(--red);
      background: var(--white);
    `}
`;

export const ProjectCustomer = styled(BaseText)`
  width: 150px;
  padding: 14px 8px;
`;

export const ProjectName = styled(BaseText)`
  width: 100px;
  padding: 6px;
`;

export const ProjectDeviation = styled(BaseText)`
  width: 80px;
  padding: 10px;
`;

export const ProjectComment = styled(BaseText)`
  width: 170px;
  padding: 5px 10px;
  border-right: none;
`;
