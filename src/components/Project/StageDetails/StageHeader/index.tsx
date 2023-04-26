import { useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

import { Paths } from '../../../../constants/paths';
import { OrangeButton, UnstyledButton } from '../../../styles';

interface Props {
  isInWork: boolean;
  isLoading: boolean;
  onOpen: () => void;
}

const StageHeader = ({ isInWork, isLoading, onOpen }: Props) => {
  const navigate = useNavigate();

  return (
    <Group position="apart" spacing={100}>
      <Group spacing={40}>
        <UnstyledButton
          onClick={() => navigate(Paths.PROJECT_DETAILS)}
          type="button"
        >
          <BsArrowLeft size={50} color="var(--orange)" />
        </UnstyledButton>
        <UnstyledButton onClick={() => navigate(Paths.DASHBOARD)} type="button">
          <BsFillHouseFill size={44} color="var(--orange)" />
        </UnstyledButton>
      </Group>

      {isInWork ? (
        <OrangeButton
          onClick={onOpen}
          disabled={isLoading}
          type="button"
          $width={148}
        >
          <span>Сохранить</span>
        </OrangeButton>
      ) : null}
    </Group>
  );
};

export default StageHeader;
