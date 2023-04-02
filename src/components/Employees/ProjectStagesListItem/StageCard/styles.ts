import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  min-height: 158px;
  min-width: 266px;
  max-width: 266px;
  ${({ theme }) => theme.mixins.column};
  gap: 18px;
  align-items: center;
  padding: 22px 20px 24px;
  border-radius: 10px;
  background: var(--white);
  filter: drop-shadow(0px 4px 8px var(--black-shadow));

  &:nth-child(odd) {
    position: absolute;
    top: 0;
  }

  &:nth-child(even) {
    position: absolute;
    bottom: 0;
  }

  &:nth-child(1) {
    left: 0;
  }

  &:nth-child(2) {
    left: 10rem;
  }

  &:nth-child(3) {
    left: 21.3rem;
  }

  &:nth-child(4) {
    left: 31.7rem;
  }

  &:nth-child(5) {
    right: 21.3rem;
  }

  &:nth-child(6) {
    right: 10rem;
  }

  &:nth-child(7) {
    right: 0;
  }

  &.completed {
    background: var(--light-green);
  }

  &.readyToAcceptance {
    background: linear-gradient(
      97.03deg,
      var(--green) 7.5%,
      var(--gradient-green3) 94.35%
    );
  }

  &.inWork {
    background: var(--orange);
  }
`;

export const StageName = styled.button`
  ${({ theme }) => theme.mixins.fCenter}
  padding: 12px 10px;
  width: 226px;
  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize28}
  text-align: center;
  color: var(--white);
  background-color: var(--orange);
  border: none;
  border-radius: 10px;
  cursor: not-allowed;

  &.completed {
    cursor: not-allowed;
    color: var(--white-black);
    background-color: var(--white);
  }

  &.readyToAcceptance {
    cursor: pointer;
    color: var(----white-black);
    background-color: var(--white);
  }

  &.inWork {
    cursor: not-allowed;
    color: var(----white-black);
    background-color: var(--white);
  }
`;

export const Employee = styled.p`
  font-weight: 400;
  ${({ theme }) => theme.mixins.fontSize28};
  text-align: center;
  color: var(--white-black);
`;

interface ArrowWrapperProps {
  $up?: boolean;
}

export const ArrowWrapper = styled.div`
  position: absolute;
  ${(props: ArrowWrapperProps) =>
    props.$up
      ? css`
          top: -7.4rem;
        `
      : css`
          bottom: -7.4rem;
        `}
`;
