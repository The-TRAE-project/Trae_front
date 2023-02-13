import styled from 'styled-components';

import { colors } from '../../../constants/colors';
import { fCenter, fColumn, fontSize28 } from '../../../helpers/cssFragments';

export const Wrapper = styled.div`
  position: relative;
  /* min-height: 191px; */
  min-height: 100%;
  ${fColumn};
  /* justify-content; */
  gap: 18px;
  align-items: center;
  padding: 22px 20px 24px;
  border-radius: 10px;
  background: ${colors.white};
  filter: drop-shadow(0px 4px 8px ${colors.blackShadow});

  &.completed {
    background: ${colors.lightGreen};
  }

  &.isTodo {
    background: ${colors.orange};
  }

  &.next {
    background: linear-gradient(
      97.03deg,
      ${colors.green} 7.5%,
      ${colors.gradientGreen3} 94.35%
    );
  }
`;

export const StageStatus = styled.button`
  ${fCenter};
  padding: 12px 10px;
  width: 226px;
  font-family: 'Roboto';
  font-weight: 500;
  ${fontSize28}
  text-align: center;
  color: ${colors.white};
  background-color: ${colors.orange};
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &.completed {
    cursor: not-allowed;
    color: ${colors.whiteBlack};
    background: ${colors.white};
  }

  &.isTodo {
    cursor: not-allowed;
    color: ${colors.whiteBlack};
    background: ${colors.white};
  }

  &.next {
    cursor: pointer;
    color: ${colors.white};
    background-color: ${colors.orange};
  }
`;

export const Employee = styled.p`
  font-weight: 400;
  ${fontSize28};
  text-align: center;
  color: ${colors.whiteBlack};
  margin: 0;
`;

export const StatusArrowDown = styled.div`
  position: absolute;
  bottom: -7.4rem;
`;

export const StatusArrowUp = styled.div`
  position: absolute;
  top: -7.4rem;
`;
