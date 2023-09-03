import { useLocation } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { Title } from './styles';

interface Props {
  findCurrentPath: (...arg: string[]) => boolean;
}

const HeaderTitle = ({ findCurrentPath }: Props) => {
  const location = useLocation();

  const displayTitleByPath = (path: string) => {
    switch (path) {
      case Paths.EMPLOYEE_PROJECTS:
        return 'Выберите проект';
      case Paths.EMPLOYEE_STAGES_IN_WORK:
        return 'Этапы в работе';
      default:
        return 'Этапы';
    }
  };

  return (
    <Title
      $isWhite={findCurrentPath(
        Paths.EMPLOYEE_PROJECTS,
        Paths.EMPLOYEE_STAGES_IN_WORK
      )}
    >
      {displayTitleByPath(location.pathname)}
    </Title>
  );
};

export default HeaderTitle;
