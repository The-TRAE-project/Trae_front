import styled, { css } from 'styled-components';

type ButtonWrapperProps = {
  $isOverdue?: boolean;
};

export const ButtonWrapper = styled.button`
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

  ${(props: ButtonWrapperProps) =>
    props.$isOverdue &&
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
