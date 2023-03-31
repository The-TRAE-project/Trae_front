import styled, { css } from 'styled-components';
import { TbLoader3 } from 'react-icons/tb';

type Props = {
  $absolute?: boolean;
};

export const LoaderWrapper = styled(TbLoader3)`
  ${(props: Props) =>
    props.$absolute &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}
  animation: ${({ theme }) => theme.mixins.loader} 2s linear infinite;
`;
