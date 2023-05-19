import { Dispatch, SetStateAction } from 'react';

import { InputWrapper, Input, SearchIcon } from './styles';

interface Props {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const ProjectSearchInput = ({ searchValue, setSearchValue }: Props) => {
  return (
    <InputWrapper>
      <Input
        value={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
        placeholder="№ проекта или фамилия клиента"
      />
      <SearchIcon />
    </InputWrapper>
  );
};

export default ProjectSearchInput;
