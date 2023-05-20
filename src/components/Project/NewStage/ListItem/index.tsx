import { AiOutlineMinusCircle } from 'react-icons/ai';

import { ProjectOperation } from '../../../../store/apis/project/types';
import { ThreeColumnGrid } from '../../../styles';
import {
  DeleteButton,
  Item,
  ItemPriority,
  ItemPriorityWrapper,
  ItemTitle,
} from './styles';

interface Props {
  list: ProjectOperation[];
  lastItem: ProjectOperation | undefined;
}

const ListItem = ({ list, lastItem }: Props) => {
  return (
    <ThreeColumnGrid>
      {list.map((item) => (
        <Item key={item.id}>
          <ItemPriorityWrapper>
            <ItemPriority>{item.priority}</ItemPriority>
          </ItemPriorityWrapper>
          <ItemTitle>{item.name}</ItemTitle>
          {lastItem?.id !== item.id ? (
            <DeleteButton type="button">
              <AiOutlineMinusCircle />
            </DeleteButton>
          ) : (
            <br />
          )}
        </Item>
      ))}
    </ThreeColumnGrid>
  );
};

export default ListItem;
