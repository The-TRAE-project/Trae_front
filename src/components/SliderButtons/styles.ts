import { Group as MantineGroup } from '@mantine/core';
import styled, { css } from 'styled-components';

type VerticalPositionProps = {
  $vertical?: boolean;
  $responsive?: boolean;
};

type BtnProps = {
  color: string;
  $vertical?: boolean;
  $responsive?: boolean;
};

type TitleProps = {
  color: string;
};

export const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.fCenter};
  ${(props: VerticalPositionProps) =>
    props.$vertical &&
    css`
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
    `}
`;

export const Group = styled(MantineGroup)`
  flex-direction: ${(props: VerticalPositionProps) =>
    props.$vertical ? 'column' : 'row'};
  gap: 44px;

  ${(props) =>
    props.$responsive &&
    css`
      --gap-44: clamp(2.13rem, calc(1.2rem + 1.08vw), 2.5rem);
      gap: var(--gap-44);
    `}
`;

export const Button = styled.button`
  height: 38px;
  width: 22px;
  background: none;
  border: none;
  transform: ${(props: BtnProps) =>
    props.$vertical ? 'rotate(90deg)' : 'rotate(0deg)'};

  svg {
    fill: ${(props: BtnProps) => `var(${props.color})`};
  }

  &:disabled {
    svg {
      opacity: 0.6;
    }
  }

  &:hover:not(button:disabled) {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  ${(props) =>
    props.$responsive &&
    css`
      --ht: clamp(2rem, calc(1.08rem + 1.08vw), 2.38rem);
      --wd: clamp(1rem, calc(0.08rem + 1.08vw), 1.38rem);
      svg {
        height: var(--ht);
        width: var(--wd);
      }
    `}
`;

export const InformTitle = styled.p`
  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize28};
  color: ${(props: TitleProps) => `var(${props.color})`};
`;
