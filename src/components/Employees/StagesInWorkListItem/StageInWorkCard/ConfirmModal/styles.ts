import { Stack as MantineStack } from '@mantine/core';
import styled from 'styled-components';

export const Stack = styled(MantineStack)`
  height: 100%;
  padding-top: 74px;
  justify-content: space-between;
  align-items: center;
`;

export const ConfirmTitle = styled.h1`
  width: 548px;
  font-weight: 600;
  ${({ theme }) => theme.mixins.fontSize40};
  color: var(--white-black);
  text-align: center;
`;

export const Button = styled.button`
  border: none;
  padding: 14px 32px;
  min-width: 101px;
  min-height: 61px;
  background: linear-gradient(
    97.03deg,
    var(--green) 7.5%,
    var(--gradient-green3) 94.35%
  );
  border-radius: 10px;
  font-weight: 500;
  ${({ theme }) => theme.mixins.fontSize28};
  text-align: center;
  color: var(--white);
`;
