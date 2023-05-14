import { InputWrapper, Input, SearchIcon } from './styles';

const ProjectSearchInput = () => {
  return (
    <InputWrapper>
      <Input placeholder="№ проекта или фамилия клиента" />
      <SearchIcon />
    </InputWrapper>
  );
};

export default ProjectSearchInput;
