import styled from 'styled-components';
import { colors } from '../../../../constants/colors';
import { fontSize32 } from '../../../../helpers/cssFragments';

export const TimerTitle = styled.p`
  font-family: 'Roboto, san-serif';
  font-weight: 300;
  ${fontSize32};
  color: ${colors.whiteBlack};
  opacity: 0.9;
  text-align: center;
  margin: 0;
`;
