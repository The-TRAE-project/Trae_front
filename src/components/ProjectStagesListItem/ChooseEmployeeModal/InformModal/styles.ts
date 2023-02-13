import { Stack as MantineStack } from '@mantine/core';
import styled from 'styled-components';

import { Title } from '../styles';

export const Stack = styled(MantineStack)`
  gap: 250px;
  justify-content: space-between;
  padding-top: 104px;
`;

export const InformTitle = styled(Title)``;

export const HomeButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  position: absolute;
  top: 31px;
  right: 30px;
`;
