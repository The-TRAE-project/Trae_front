import { useLocation } from 'react-router-dom';

import { colors } from '../../../../constants/colors';
import { Paths } from '../../../../constants/paths';
import { Title } from './styles';

const HeaderTitle = () => {
  const location = useLocation();

  return (
    <Title
      color={
        location.pathname === Paths.PROJECTS ? colors.white : colors.whiteBlack
      }
    >
      {location.pathname === Paths.PROJECTS
        ? 'Выберите проект'
        : 'Выберите этап'}
    </Title>
  );
};

export default HeaderTitle;
