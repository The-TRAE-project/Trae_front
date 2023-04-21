import ProjectItem from './ProjectItem';
import { Wrapper } from './styles';
// TODO:
const list = [
  {
    id: '1',
    title: 'Проектов в системе',
    quantity: 40,
  },
  {
    id: '2',
    title: 'Проектов готовых к отгрузке',
    quantity: 8,
  },
  {
    id: '3',
    title: 'Сотрудников на смене',
    quantity: 12,
  },
  {
    id: '4',
    title: 'Просроченных проектов по этапу',
    quantity: 20,
  },
  {
    id: '5',
    title: 'Просроченных проектов',
    quantity: 5,
  },
];

const ProjectListItem = () => {
  return (
    <Wrapper>
      {list.map((item) => (
        <ProjectItem key={item.id} project={item} />
      ))}
    </Wrapper>
  );
};

export default ProjectListItem;
