import styled from 'styled-components';

import { colors } from '../../constants/colors';
import { fCenter, fontSize28 } from '../../helpers/cssFragments';

type Props = {
  isWhite: boolean;
};

export const Wrapper = styled.div`
  ${fCenter};
`;

export const Button = styled.button`
  height: 38px;
  width: 22px;
  background: none;
  border: none;
  cursor: pointer;

  svg {
    fill: ${(props: Props) =>
      props.isWhite ? colors.white : colors.whiteBlack};
  }

  &:disabled {
    svg {
      opacity: 0.6;
    }
    cursor: not-allowed;
  }
`;

export const InformTitle = styled.p`
  font-family: 'Roboto, san-serif';
  font-weight: 500;
  ${fontSize28};
  color: ${(props: Props) =>
    props.isWhite ? colors.white : colors.whiteBlack};
  margin: 0;
`;
