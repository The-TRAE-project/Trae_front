import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { InputWrapper, Input, SearchIcon } from './styles';

interface Props {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  onClearFilter: () => void;
}

const ProjectSearchInput = ({
  searchValue,
  setSearchValue,
  onClearFilter,
}: Props) => {
  const [value, setValue] = useState('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchValue(value);
    }
  };

  useEffect(() => {
    if (!searchValue) {
      setValue('');
    }
  }, [searchValue]);

  return (
    <InputWrapper>
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={onClearFilter}
        placeholder="№ проекта или наименование клиента"
      />
      <SearchIcon onClick={() => setSearchValue(value)} />
    </InputWrapper>
  );
};

export default ProjectSearchInput;
