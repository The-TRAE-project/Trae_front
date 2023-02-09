import { useLocation } from 'react-router-dom';

import { colors } from '../../../../constants/colors';
import { Paths } from '../../../../constants/paths';
import { Title } from './styles';

const HeaderTitle = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === Paths.PROJECTS && (
        <Title color={colors.white}>Выберите проект</Title>
      )}
      {location.pathname === Paths.PROJECT_STAGES && (
        <Title color={colors.whiteBlack}>Выберите этап</Title>
      )}
    </>
  );
};

export default HeaderTitle;
