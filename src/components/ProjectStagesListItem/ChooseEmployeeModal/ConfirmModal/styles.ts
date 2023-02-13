import { Stack as MantineStack } from '@mantine/core';
import styled from 'styled-components';

import { colors } from '../../../../constants/colors';
import { fontSize28 } from '../../../../helpers/cssFragments';
import { Title } from '../styles';

export const Stack = styled(MantineStack)`
  gap: 122px;
  padding-top: 74px;
  align-items: center;
`;

export const TitleStack = styled(MantineStack)`
  gap: 50px;
`;

export const ConfirmTitle = styled(Title)`
  width: 557px;
`;

export const Button = styled.button`
  border: none;
  padding: 14px 32px;
  min-width: 101px;
  min-height: 61px;
  background: linear-gradient(
    97.03deg,
    ${colors.green} 7.5%,
    ${colors.gradientGreen3} 94.35%
  );
  border-radius: 10px;
  font-weight: 500;
  ${fontSize28};
  text-align: center;
  color: ${colors.white};
`;
