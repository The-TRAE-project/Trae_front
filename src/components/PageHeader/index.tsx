import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsFillHouseFill } from 'react-icons/bs';
import { IoMdExit } from 'react-icons/io';

import { Paths } from '../../constants/paths';
import { UnstyledButton } from '../styles';
import { Button, IconsGroup, Wrapper } from './styles';

interface Props {
  isShowCreateBtn?: boolean;
  onCreate?: () => void;
  filter?: ReactNode;
  input?: ReactNode;
  isShowExitBtn?: boolean;
  onExit?: () => void;
}

const PageHeader = ({
  isShowCreateBtn = true,
  onCreate,
  filter,
  input,
  isShowExitBtn = false,
  onExit,
}: Props) => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate(Paths.DASHBOARD);

  const handleCreate = () => onCreate?.();
  const handleLogout = () => onExit?.();

  return (
    <Wrapper>
      <IconsGroup>
        {filter}
        <UnstyledButton onClick={navigateToHome} type="button" $isHomeIcon>
          <BsFillHouseFill size={44} color="var(--orange)" />
        </UnstyledButton>
      </IconsGroup>

      {input}

      {isShowCreateBtn && (
        <Button onClick={handleCreate} type="button">
          <AiOutlinePlusCircle size={30} color="var(--white)" />
          <span>Добавить</span>
        </Button>
      )}
      {isShowExitBtn && (
        <Button onClick={handleLogout} type="button">
          <IoMdExit size={32} color="var(--white)" />
          <span>Выйти</span>
        </Button>
      )}
    </Wrapper>
  );
};

export default PageHeader;
