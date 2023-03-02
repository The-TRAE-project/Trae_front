import { useLocation } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { Title } from './styles';

interface Props {
  findCurrentPath: (...arg: string[]) => boolean;
}

const HeaderTitle = ({ findCurrentPath }: Props) => {
  const location = useLocation();
  // TODO:
  const displayTitleByPath = (path: any) => {
    switch (path) {
      case '/employee-projects':
        return 'Выберите проект';
      case '/employee-stages-in-work':
        return 'Этапы в работе';
      default:
        return 'Выберите этап';
    }
  };

  return (
    <Title
      isWhite={findCurrentPath(
        Paths.EMPLOYEE_PROJECTS,
        Paths.EMPLOYEE_STAGES_IN_WORK
      )}
    >
      {displayTitleByPath(location.pathname)}
    </Title>
  );
};

export default HeaderTitle;
