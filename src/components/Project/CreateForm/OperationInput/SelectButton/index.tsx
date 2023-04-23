import { Operation } from '../../../../../store/apis/project/types';
import { ModifiedWorkType } from '../helpers/useModifyWorkTypes';
import { Wrapper } from './styles';

interface Props {
  workType: ModifiedWorkType;
  handleSelectOperation: (workType: Operation, idx: number) => void;
  checkIsOperationSelected: (idx: number) => JSX.Element;
}

const SelectButton = ({
  workType,
  handleSelectOperation,
  checkIsOperationSelected,
}: Props) => {
  const { name, typeWorkId, idx } = workType;

  return (
    <Wrapper
      type="button"
      onClick={() => handleSelectOperation({ name, typeWorkId }, idx)}
    >
      {checkIsOperationSelected(idx)}
      <span>{name}</span>
    </Wrapper>
  );
};

export default SelectButton;
