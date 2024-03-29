import { MultiSelect as MantineMultiSelect, SelectItem } from '@mantine/core';

import { useMultiSelectStyles } from './styles';

interface Props {
  label: string;
  data: SelectItem[];
  defaultValue?: string[];
}

const MultiSelect = ({ label, data, defaultValue, ...props }: Props) => {
  const {
    classes: {
      dropdown,
      input,
      inputLabel,
      error,
      item,
      itemsWrapper,
      value,
      root,
      wrapper,
    },
  } = useMultiSelectStyles();

  return (
    <MantineMultiSelect
      {...props}
      label={label}
      maxDropdownHeight={284}
      data={data}
      switchDirectionOnFlip
      classNames={{
        dropdown,
        input,
        label: inputLabel,
        error,
        item,
        itemsWrapper,
        value,
        root,
        wrapper,
      }}
    />
  );
};

export default MultiSelect;
