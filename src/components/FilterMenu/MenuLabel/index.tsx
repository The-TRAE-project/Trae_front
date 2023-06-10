import { Menu as MantineMenu } from '@mantine/core';

interface Props {
  title: string;
}

const MenuLabel = ({ title }: Props) => {
  return <MantineMenu.Label>{title}</MantineMenu.Label>;
};

export default MenuLabel;
