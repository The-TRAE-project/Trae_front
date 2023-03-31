import { Select as MantineSelect, SelectItem } from '@mantine/core';
import { HiOutlineChevronDown } from 'react-icons/hi';

import { useSelectStyles, useTextInputStyles } from '../styles';

interface Props {
  title: string;
  data: SelectItem[];
  defaultValue?: string;
}

const Select = ({ title, data, defaultValue, ...props }: Props) => {
  const {
    classes: { label, error },
  } = useTextInputStyles();
  const {
    classes: { selectInput, rightSection, dropdown, item },
  } = useSelectStyles();

  return (
    <MantineSelect
      {...props}
      label={title}
      defaultValue={defaultValue}
      data={data}
      limit={10000}
      rightSection={<HiOutlineChevronDown size={30} />}
      classNames={{
        label,
        input: selectInput,
        error,
        rightSection,
        dropdown,
        item,
      }}
    />
  );
};

export default Select;
