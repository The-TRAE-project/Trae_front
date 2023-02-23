import { useLocation } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { Title } from './styles';

const HeaderTitle = () => {
  const location = useLocation();

  return (
    <Title path={location.pathname === Paths.EMPLOYEE_PROJECTS}>
      {location.pathname === Paths.EMPLOYEE_PROJECTS
        ? 'Выберите проект'
        : 'Выберите этап'}
    </Title>
  );
};

export default HeaderTitle;
