import { Dispatch, SetStateAction } from 'react';

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
}: Props) => (
  <InputWrapper>
    <Input
      value={searchValue}
      onChange={(event) => setSearchValue(event.currentTarget.value)}
      onFocus={onClearFilter}
      placeholder="№ проекта или фамилия клиента"
    />
    <SearchIcon />
  </InputWrapper>
);

export default ProjectSearchInput;
