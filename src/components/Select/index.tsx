import { Select as MantineSelect, SelectItem } from '@mantine/core';
import { HiOutlineChevronDown } from 'react-icons/hi';

import { useSelectStyles, Wrapper } from './styles';

interface Props {
  title: string;
  data: SelectItem[];
  defaultValue?: string;
}

const Select = ({ title, data, defaultValue, ...props }: Props) => {
  const {
    classes: { label, error, input, rightSection, dropdown, item },
  } = useSelectStyles();

  return (
    <Wrapper>
      <MantineSelect
        {...props}
        label={title}
        defaultValue={defaultValue}
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
