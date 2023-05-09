import { useNavigate } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';

import { WorkType } from '../../../../store/apis/workTypes/types';
import { Paths } from '../../../../constants/paths';
import { useAppDispatch } from '../../../../helpers/hooks/useAppDispatch';
import { setWorkType } from '../../../../store/slices/workType';
import { BgWhiteCard, EditButton, Title } from './styles';

interface Props {
  workType: WorkType;
}

const WorkTypeItem = ({ workType }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToEditingPage = () => {
    navigate(Paths.WORK_TYPES_EDITING);
    dispatch(setWorkType(workType));
  };

  return (
    <BgWhiteCard>
      <Title>{workType.name}</Title>
      <EditButton onClick={navigateToEditingPage} type="button">
        <BsFillPencilFill />
      </EditButton>
    </BgWhiteCard>
  );
};

export default WorkTypeItem;
