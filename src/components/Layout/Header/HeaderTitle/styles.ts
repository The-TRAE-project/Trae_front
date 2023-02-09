import styled from 'styled-components';
import { Title as MantineTitle } from '@mantine/core';

type TitleProps = {
  color: string;
};

export const Title = styled(MantineTitle)`
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  color: ${(props: TitleProps) => props.color};
`;
