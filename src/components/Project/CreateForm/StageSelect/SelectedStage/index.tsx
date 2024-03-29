import { ModifiedWorkType } from '../helpers/useModifyWorkTypes';
import { Wrapper } from './styles';

interface Props {
  selectedOperation: ModifiedWorkType;
  checkIsOperationSelected: (idx: number) => JSX.Element;
}

const SelectedStage = ({
  selectedOperation,
  checkIsOperationSelected,
}: Props) => {
  return (
    <Wrapper>
      {checkIsOperationSelected(selectedOperation.idx)}
      <span>{selectedOperation.name}</span>
    </Wrapper>
  );
};

export default SelectedStage;
