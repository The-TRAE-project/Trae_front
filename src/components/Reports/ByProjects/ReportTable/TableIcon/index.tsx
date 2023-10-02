import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';
import { LocalStorage } from '../../../../../constants/localStorage';
import styles from './TableIcon.module.scss';

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
  };

  return (
    <button
      type="button"
      onClick={handleNavigateToDetails}
      className={styles.icon__wrapper}
    >
      <Link
        to={`/reports/by-projects/project/${projectId}/details`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {icon}
      </Link>
    </button>
  );
};
