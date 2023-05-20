import { ProjectOperation } from '../../../../store/apis/project/types';
import { ThreeColumnGrid } from '../../../styles';
import Item from './Item';

interface Props {
  list: ProjectOperation[];
  lastItem: ProjectOperation | undefined;
  onBack: () => void;
}

const ListItem = ({ list, lastItem, onBack }: Props) => {
  return (
    <ThreeColumnGrid>
      {list.map((item) => (
        <Item key={item.id} item={item} lastItem={lastItem} onBack={onBack} />
      ))}
    </ThreeColumnGrid>
  );
};

export default ListItem;
