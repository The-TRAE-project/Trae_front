import { DashboardListItem } from '..';
import { Quantity, Title, Wrapper } from './styles';

interface Props {
  project: DashboardListItem;
}

const Item = ({ project }: Props) => {
  return (
    <Wrapper>
      <Quantity>{project.quantity}</Quantity>
      <Title>{project.title}</Title>
    </Wrapper>
  );
};

export default Item;
