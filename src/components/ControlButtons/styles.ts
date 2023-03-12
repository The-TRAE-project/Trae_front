import { Group as MantineGroup } from '@mantine/core';
import styled, { css } from 'styled-components';

type VerticalPositionProps = {
  $vertical?: boolean;
};

type BtnProps = {
  color: string;
  $vertical?: boolean;
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
    cursor: not-allowed;
  }
`;

export const InformTitle = styled.p`
  font-family: var(--font-roboto);
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize28};
  color: ${(props: TitleProps) => `var(${props.color})`};
`;
