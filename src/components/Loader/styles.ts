import styled, { css } from 'styled-components';
import { Loader2 } from 'tabler-icons-react';

type Props = {
  isAbsoluteCentered?: boolean;
};

export const LoaderWrapper = styled(Loader2)`
  ${(props: Props) =>
    props.isAbsoluteCentered &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}
  animation: ${({ theme }) => theme.mixins.loader} 2s linear infinite;
`;