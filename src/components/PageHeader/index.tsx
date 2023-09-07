import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillHouseFill } from 'react-icons/bs';
import { IoMdExit } from 'react-icons/io';

import Loader from '../Loader';
import { Paths } from '../../constants/paths';
import { DashedOrangeButton, UnstyledButton } from '../styles';
import { Button, IconsGroup, Wrapper } from './styles';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { Roles } from '../../store/slices/auth/types';

interface Props {
  isShowCreateBtn?: boolean;
  onCreate?: () => void;
  filter?: ReactNode;
  input?: ReactNode;
  isShowExitBtn?: boolean;
  onExit?: () => void;
  isShowDashedBtn?: boolean;
  onDashedBtnClick?: () => void;
  isDashedBtnLoading?: boolean;
  dashedBtnText?: string;
}

const PageHeader = ({
  isShowCreateBtn = true,
  onCreate,
  filter,
  input,
  isShowExitBtn = false,
  onExit,
  isShowDashedBtn = false,
  onDashedBtnClick,
  isDashedBtnLoading = false,
  dashedBtnText = 'Изменить пароль',
}: Props) => {
  const navigate = useNavigate();
  const { permission } = useAppSelector((store) => store.auth);

  const navigateToHome = () => {
    if (permission === Roles.ADMIN) {
      navigate(Paths.DASHBOARD);
    } else if (permission === Roles.CONSTRUCTOR) {
      navigate(Paths.CONSTRUCTOR_MAIN_PAGE);
    }
  };

  const handleCreate = () => onCreate?.();
  const handleLogout = () => onExit?.();
  const handleDashedBtnClick = () => onDashedBtnClick?.();

  return (
    <Wrapper>
      <IconsGroup>
        {filter}
        <UnstyledButton onClick={navigateToHome} type="button" $isHomeIcon>
          <BsFillHouseFill size={44} color="var(--orange)" />
        </UnstyledButton>
      </IconsGroup>

      {input}

      {(isShowDashedBtn || isShowExitBtn) && (
        <Group spacing={40}>
          {isShowDashedBtn && (
            <DashedOrangeButton onClick={handleDashedBtnClick} type="button">
              {isDashedBtnLoading ? (
                <Loader size={35} />
              ) : (
                <span>{dashedBtnText}</span>
              )}
            </DashedOrangeButton>
          )}
          {isShowExitBtn && (
            <Button onClick={handleLogout} type="button">
              <IoMdExit size={32} color="var(--white)" />
              <span>Выйти</span>
            </Button>
          )}
        </Group>
      )}
      {isShowCreateBtn && (
        <Button onClick={handleCreate} type="button">
          <AiOutlinePlusCircle size={30} color="var(--white)" />
          <span>Добавить</span>
        </Button>
      )}
    </Wrapper>
  );
};

export default PageHeader;
