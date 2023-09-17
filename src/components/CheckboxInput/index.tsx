import { Checkbox } from '@mantine/core';
import { useCheckboxStyles } from './styles';
import Check from '../svgs/Check';

interface Props {
  checked: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (event: any) => void;
}

export const CheckboxInput = ({ checked, onChange }: Props) => {
  const {
    classes: { input, icon, body, inner },
  } = useCheckboxStyles();
  return (
    <Checkbox
      classNames={{ input, icon, body, inner }}
      icon={Check}
      checked={checked}
      onChange={onChange}
    />
  );
};
