import styled, { css } from 'styled-components';

import { UnstyledButton } from '../../styles';

type Props = {
  $lastFullWidth?: boolean;
};

export const Wrapper = styled.div`
  height: 100%;
  min-height: 297px;
  border-width: 0px 1.5px 1.5px 1.5px;
  border-style: solid;
  border-color: var(--gray);
  border-radius: var(--border-radius);

  ${(props: Props) =>
    props.$lastFullWidth &&
    css`
      &:last-child {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    `}
`;

export const CardHeader = styled.div`
  position: relative;
  height: 56px;
  ${({ theme }) => theme.mixins.fCenter};
  background: linear-gradient(
    97.03deg,
    var(--green) 7.5%,
    var(--gradient-green3) 94.35%
  );
  border-radius: 15px 15px 0px 0px;
  outline: 2px solid transparent;

  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize24};
  color: var(--white);
  text-transform: uppercase;
`;

export const Button = styled(UnstyledButton)`
  position: absolute;
  top: 15px;
  right: 17px;
`;

export const CardBody = styled.div`
  position: relative;
  padding: 30px 18px;
`;
