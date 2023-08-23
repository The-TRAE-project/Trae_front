import { useNavigate } from 'react-router-dom';
import Contract from '../../../../svgs/Contract';
import { WrapperIcon } from './styles';

interface Props {
  projectId: number;
}

export const ContractIcon = ({ projectId }: Props) => {
  const navigate = useNavigate();

  const handleNavigateToDetails = () => {
    navigate(`/project/${projectId}/details`);
  };

  return (
    <WrapperIcon type="button" onClick={handleNavigateToDetails}>
      <Contract />
    </WrapperIcon>
  );
};
