import { useNavigate } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';

import { WorkType } from '../../../../store/apis/workTypes/types';
import { Paths } from '../../../../constants/paths';
import { BgWhiteCard } from '../../../styles';
import { EditButton, Title } from './styles';

interface Props {
  workType: WorkType;
}

const WorkTypeItem = ({ workType }: Props) => {
  const navigate = useNavigate();

  const navigateToEditingPage = () =>
    navigate(Paths.WORK_TYPES_EDITING, { state: { workType } });

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
