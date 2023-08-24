import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';
import Contract from '../../../../svgs/Contract';
import { WrapperIcon } from './styles';
import { LocalStorage } from '../../../../../constants/localStorage';

interface Props {
  projectId: number;
}

export const ContractIcon = ({ projectId }: Props) => {
  const navigate = useNavigate();
  const [fromReports, setFromReports] = useLocalStorage<boolean>({
    key: LocalStorage.PROJECT_DETAILS_FROM_REPORTS,
  });

  const handleNavigateToDetails = () => {
    setFromReports(true);
    navigate(`/reports/by-projects/project/${projectId}/details`);
  };

  return (
    <WrapperIcon type="button" onClick={handleNavigateToDetails}>
      <Contract />
    </WrapperIcon>
  );
};
