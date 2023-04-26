import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../../../../constants/paths';
import { useAppDispatch } from '../../../../../../helpers/hooks/useAppDispatch';
import { ProjectOperation } from '../../../../../../store/apis/project/types';
import { setProjectStage } from '../../../../../../store/slices/project';
import { Button } from './styles';

interface Props {
  projectOperation: ProjectOperation;
}

const OperationButton = ({ projectOperation }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const inWorkClass = projectOperation.inWork && 'inWork';
  const isEndedClass = projectOperation.isEnded && 'isEnded';

  const handleNavigateToDetails = () => {
    navigate(Paths.PROJECT_STAGE);
    dispatch(setProjectStage(projectOperation));
  };

  return (
    <Button
      onClick={handleNavigateToDetails}
      className={inWorkClass || isEndedClass || ''}
    >
      {projectOperation.name}
    </Button>
  );
};

export default OperationButton;
