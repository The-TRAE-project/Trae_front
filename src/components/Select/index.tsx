import { Select as MantineSelect, SelectItem } from '@mantine/core';
import { HiOutlineChevronDown } from 'react-icons/hi';

import { useSelectStyles, Wrapper } from './styles';

interface Props {
  title: string;
  data: SelectItem[];
  defaultValue?: string;
  placeholder?: string;
}

const Select = ({
  title,
  data,
  defaultValue,
  placeholder,
  ...props
}: Props) => {
  const {
    classes: { label, error, input, rightSection, dropdown, item },
  } = useSelectStyles();

  return (
    <Wrapper>
      <MantineSelect
        {...props}
        label={title}
        defaultValue={defaultValue}
        placeholder={placeholder}
        data={data}
        limit={10000}
        rightSection={<HiOutlineChevronDown size={30} />}
        classNames={{
          label,
          input,
          error,
          rightSection,
          dropdown,
          item,
        }}
      />
    </Wrapper>
  );
};

export default Select;
