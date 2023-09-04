import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../constants/paths';
import { ThreeColumnGrid } from '../../styles';
import { LinkBtn } from './styles';

const list = [
  {
    id: '1',
    title: 'Сотрудники',
    path: Paths.REPORTS_BY_EMPLOYEES,
  },
  {
    id: '2',
    title: 'Проекты',
    path: Paths.REPORTS_BY_PROJECTS,
  },
  {
    id: '3',
    title: 'Сроки',
    path: Paths.REPORTS_BY_DEADLINES,
  },
];

const ListItem = () => {
  const navigate = useNavigate();

  return (
    <ThreeColumnGrid>
      {list &&
        list.map((item) => (
          <LinkBtn
            key={item.id}
            onClick={() => navigate(item.path)}
            type="button"
          >
            {item.title}
          </LinkBtn>
        ))}
    </ThreeColumnGrid>
  );
};

export default ListItem;
