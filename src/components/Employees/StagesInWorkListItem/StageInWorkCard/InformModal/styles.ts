import { Stack as MantineStack } from '@mantine/core';
import styled from 'styled-components';

export const Stack = styled(MantineStack)`
  height: 100%;
  padding-top: 104px;
  justify-content: space-between;
  align-items: center;
`;

export const InformTitle = styled.h1`
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize40};
  color: var(--white-black);
  text-align: center;
`;

export const HomeButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 31px;
  right: 30px;
`;
