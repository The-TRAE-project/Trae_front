import { useNavigate } from 'react-router-dom';
import { Group, Stack } from '@mantine/core';
import { BsArrowLeft, BsFillPencilFill, BsFillHouseFill } from 'react-icons/bs';
import dayjs from 'dayjs';

import { Paths } from '../../../../constants/paths';
import { UserUpdateReturnType } from '../../../../store/apis/user/types';
import { InformModalText, OrangeButton, UnstyledButton } from '../../../styles';
import Loader from '../../../Loader';
import InformModal from '../../../InformModal';

interface Props {
  isLoading: boolean;
  isUpdate: boolean;
  onUpdate: () => void;
  isOpen: boolean;
  onClose: () => void;
  user: UserUpdateReturnType | undefined;
  isSubmitBtnDisabled: boolean;
}

const FormHeader = ({
  isLoading,
  isUpdate,
  onUpdate,
  isOpen,
  onClose,
  user,
  isSubmitBtnDisabled,
}: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={onClose}
        title={
          user ? `${user.firstName} ${user.lastName} изменения сохранены` : ''
        }
        backPath={Paths.CONSTRUCTORS}
      >
        <Stack spacing={20}>
          {!!user && (
            <>
              <InformModalText>
                Роль: <strong>{user.role}</strong>
              </InformModalText>
              <InformModalText>
                Статус:&nbsp;
                <strong>
                  {user.accountStatus ? 'Активный' : ' заблокированный'}
                </strong>
              </InformModalText>
              {!!user.dateOfDismissal && (
                <InformModalText>
                  Дата увольнения:&nbsp;
                  <strong>
                    {dayjs(user?.dateOfDismissal.join('-')).format(
                      'DD.MM.YYYY'
                    )}
                  </strong>
                </InformModalText>
              )}
            </>
          )}
        </Stack>
      </InformModal>
      <Group position="apart" spacing={100}>
        <Group spacing={42}>
          <UnstyledButton
            onClick={() => navigate(Paths.CONSTRUCTORS)}
            type="button"
          >
            <BsArrowLeft size={50} color="var(--orange)" />
          </UnstyledButton>
          <UnstyledButton
            onClick={() => navigate(Paths.PROJECTS)}
            type="button"
          >
            <BsFillHouseFill size={44} color="var(--orange)" />
          </UnstyledButton>
        </Group>

        {isUpdate && (
          <OrangeButton
            disabled={isLoading || isSubmitBtnDisabled}
            $width={171}
            type="submit"
          >
            {isLoading ? <Loader size={35} /> : <span>Сохранить</span>}
          </OrangeButton>
        )}
        {!isUpdate && (
          <OrangeButton onClick={onUpdate} disabled={isLoading} type="button">
            <BsFillPencilFill />
            <span>Редактировать</span>
          </OrangeButton>
        )}
      </Group>
    </>
  );
};

export default FormHeader;
