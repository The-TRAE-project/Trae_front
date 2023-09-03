import { useState } from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';

import { showErrorNotification } from '../../../../../helpers/showErrorNotification';
import { useDeleteOperationMutation } from '../../../../../store/apis/project';
import { ProjectOperation } from '../../../../../store/apis/project/types';
import ConfirmModal from '../../../../ConfirmModal';
import {
  DeleteButton,
  ItemWrapper,
  ItemPriority,
  ItemPriorityWrapper,
  ItemTitle,
} from './styles';

interface Props {
  item: ProjectOperation;
  lastItem: ProjectOperation | undefined;
  onBack: () => void;
}

const Item = ({ item, lastItem, onBack }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [deleteOperation, { isLoading: isDeleteLoading, isSuccess }] =
    useDeleteOperationMutation();

  const handleSubmit = async () => {
    try {
      await deleteOperation(item.id).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  const confirmTitle = `Удалить операцию ${item.name}?`;
  const informTitle = `Операция ${item.name} удалено`;

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        onCallAtTheEnd={onBack}
        isSuccess={isSuccess}
        isLoading={isDeleteLoading}
        confirmTitle={confirmTitle}
        informTitle={informTitle}
        onBack={onBack}
      />

      <ItemWrapper>
        <ItemPriorityWrapper>
          <ItemPriority>{item.priority}</ItemPriority>
        </ItemPriorityWrapper>
        <ItemTitle>{item.name}</ItemTitle>
        {lastItem?.id !== item.id ? (
          <DeleteButton onClick={() => setIsOpen(true)} type="button">
            <AiOutlineMinusCircle />
          </DeleteButton>
        ) : (
          <br />
        )}
      </ItemWrapper>
    </>
  );
};

export default Item;
