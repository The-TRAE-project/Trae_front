import { useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

import { Paths } from '../../constants/paths';
import Loader from '../Loader';
import { OrangeButton, UnstyledButton } from '../styles';
import { DeleteButton } from './styles';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { Roles } from '../../store/slices/auth/types';

interface Props {
  onBack: () => void;
  isSubmitBtnDisabled?: boolean;
  isSubmitBtnLoading?: boolean;
  isShowSubmitBtn?: boolean;
  onClick?: () => void;
  clickBtnText?: string;
  isShowClickBtn?: boolean;
  submitBtnText?: string;
  isShowDeleteBtn?: boolean;
  onDelete?: () => void;
}

const FormHeader = ({
  isSubmitBtnDisabled,
  isSubmitBtnLoading,
  onBack,
  isShowSubmitBtn = true,
  onClick,
  clickBtnText = 'Завершить',
  isShowClickBtn = false,
  submitBtnText = 'Сохранить',
  isShowDeleteBtn = false,
  onDelete,
}: Props) => {
  const navigate = useNavigate();
  const { permission } = useAppSelector((store) => store.auth);

  const handleClick = () => onClick?.();
  const handleDelete = () => onDelete?.();
  const handleNavigate = () => {
    if (permission === Roles.ADMIN) {
      navigate(Paths.DASHBOARD);
    } else if (permission === Roles.CONSTRUCTOR) {
      navigate(Paths.CONSTRUCTOR_MAIN_PAGE);
    }
  };

  return (
    <Group position="apart" spacing={100}>
      <Group spacing={42}>
        <UnstyledButton onClick={onBack} type="button">
          <BsArrowLeft size={50} color="var(--orange)" />
        </UnstyledButton>
        <UnstyledButton onClick={handleNavigate} type="button">
          <BsFillHouseFill size={44} color="var(--orange)" />
        </UnstyledButton>
      </Group>

      <Group spacing={40}>
        {isShowDeleteBtn && (
          <DeleteButton onClick={handleDelete} type="button">
            Удалить
          </DeleteButton>
        )}
        {isShowSubmitBtn && (
          <OrangeButton
            disabled={isSubmitBtnDisabled}
            $width={171}
            type="submit"
          >
            {isSubmitBtnLoading ? (
              <Loader size={35} />
            ) : (
              <span>{submitBtnText}</span>
            )}
          </OrangeButton>
        )}
        {isShowClickBtn && (
          <OrangeButton onClick={handleClick} type="button">
            <span>{clickBtnText}</span>
          </OrangeButton>
        )}
      </Group>
    </Group>
  );
};

export default FormHeader;
