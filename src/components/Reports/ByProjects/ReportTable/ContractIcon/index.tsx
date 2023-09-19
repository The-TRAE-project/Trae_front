import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';
import { WrapperIcon } from './styles';
import { LocalStorage } from '../../../../../constants/localStorage';

interface Props {
  projectId: number;
  icon: JSX.Element;
}

export const TableIcon = ({ projectId, icon }: Props) => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fromReports, setFromReports] = useLocalStorage<boolean>({
    key: LocalStorage.PROJECT_DETAILS_FROM_REPORTS,
  });

  const handleNavigateToDetails = () => {
    setFromReports(true);
    navigate(`/reports/by-projects/project/${projectId}/details`);
  };

  return (
    <WrapperIcon type="button" onClick={handleNavigateToDetails}>
      {icon}
    </WrapperIcon>
  );
};
