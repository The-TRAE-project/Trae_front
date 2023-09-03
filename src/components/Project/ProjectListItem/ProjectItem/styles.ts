import styled, { css } from 'styled-components';

type WrapperProps = {
  $isOpOverdue?: boolean;
};

export const Wrapper = styled.div`
  position: relative;
  min-height: 270px;
  ${({ theme }) => theme.mixins.column};
  align-items: center;
  gap: 22px;
  padding: 61px 12px 22px;
  border: none;
  border-radius: var(--border-radius);
  background: var(--white);
  box-shadow: 0px 4px 6px var(--black-shadow);

  &:is(:hover, :active, :focus) {
    outline: none;
  }

  ${(props: WrapperProps) =>
    props.$isOpOverdue &&
    css`
      border: 3px solid var(--red2);
    `}
`;

export const ProjectOperationName = styled.p`
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize30};
  text-align: center;

  &.stageInWork {
    color: var(--orange);
  }

  &.stageReadyToAcceptance {
    color: var(--green);
  }

  &.ended {
    color: var(--white-black);
  }
`;

export const ProjectFinishBtn = styled.button`
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize28};
  text-align: center;
  color: var(--white);
  padding: 10px 16px;
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--green);

  &:is(:focus, :active, :hover) {
    outline: none;
  }
`;
