import { Stack as MantineStack } from '@mantine/core';
import styled from 'styled-components';

import { colors } from '../../../constants/colors';
import { fontSize30, fontSize40 } from '../../../helpers/cssFragments';

export const Stack = styled(MantineStack)`
  gap: 60px;
`;

export const SliderStack = styled(MantineStack)`
  gap: 48px;
`;

export const TimerStack = styled(MantineStack)`
  gap: 27px;
`;

export const Title = styled.h1`
  font-weight: 600;
  ${fontSize40};
  color: ${colors.whiteBlack};
  text-align: center;
  margin: 0;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 39px;
`;

export const EmployeeCard = styled.button`
  border: none;
  padding: 14px 32px;
  min-width: 270px;
  min-height: 63px;
  background: linear-gradient(
    97.03deg,
    ${colors.green} 7.5%,
    ${colors.gradientGreen3} 94.35%
  );
  border-radius: 10px;
  font-weight: 600;
  ${fontSize30};
  text-align: center;
  color: ${colors.white};
`;
