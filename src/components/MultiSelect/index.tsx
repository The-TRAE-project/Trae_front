import { MultiSelect as MantineMultiSelect, SelectItem } from '@mantine/core';

import { useMultiSelectStyles } from './styles';

interface Props {
  label: string;
  data: SelectItem[];
  defaultValue?: string[];
}

const MultiSelect = ({ label, data, defaultValue, ...props }: Props) => {
  const {
    classes: { dropdown, input, inputLabel, error, item, itemsWrapper, value },
  } = useMultiSelectStyles();

  return (
    <MantineMultiSelect
      {...props}
      label={label}
      maxDropdownHeight={284}
      data={data}
      switchDirectionOnFlip
      initiallyOpened
      classNames={{
        dropdown,
        input,
        label: inputLabel,
        error,
        item,
        itemsWrapper,
        value,
      }}
    />
  );
};

export default MultiSelect;
