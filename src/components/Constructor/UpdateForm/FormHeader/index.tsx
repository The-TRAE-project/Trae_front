import { useNavigate } from 'react-router-dom';
import { Group, Stack } from '@mantine/core';
import { BsArrowLeft, BsFillPencilFill, BsFillHouseFill } from 'react-icons/bs';
import dayjs from 'dayjs';

import { Paths } from '../../../../constants/paths';
import { User, UserUpdateReturnType } from '../../../../store/apis/user/types';
import { checkForEquality } from '../../../../helpers/checkForEquality';
import {
  DashedOrangeButton,
  InformModalText,
  OrangeButton,
  UnstyledButton,
} from '../../../styles';
import Loader from '../../../Loader';
import InformModal from '../../../InformModal';

interface Props {
  isLoading: boolean;
  isUpdate: boolean;
  onUpdate: () => void;
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | undefined;
  updatedUser: UserUpdateReturnType | undefined;
  isDisabled: boolean;
  onChangePassword: () => void;
  isChangePasswordLoading: boolean;
}

const FormHeader = ({
  isLoading,
  isUpdate,
  onUpdate,
  isOpen,
  onClose,
  currentUser,
  updatedUser,
  isDisabled,
  onChangePassword,
  isChangePasswordLoading,
}: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={onClose}
        title={
          updatedUser
            ? `${updatedUser.firstName} ${updatedUser.lastName} изменения сохранены`
            : ''
        }
        backPath={Paths.CONSTRUCTORS}
      >
        <Stack spacing={20}>
          {!!updatedUser && (
            <>
              {!checkForEquality(currentUser?.role, updatedUser.role) && (
                <InformModalText>
                  Роль: <strong>{updatedUser.role}</strong>
                </InformModalText>
              )}
              {!checkForEquality(
                currentUser?.status,
                updatedUser.accountStatus
              ) && (
                <InformModalText>
                  Статус:&nbsp;
                  <strong>
                    {updatedUser.accountStatus
                      ? 'Активный'
                      : ' заблокированный'}
                  </strong>
                </InformModalText>
              )}
              {!checkForEquality(currentUser?.status, updatedUser.accountStatus)
                ? !!updatedUser.dateOfDismissal && (
                    <InformModalText>
                      Дата увольнения:&nbsp;
                      <strong>
                        {dayjs(updatedUser?.dateOfDismissal.join('-')).format(
                          'DD.MM.YYYY'
                        )}
                      </strong>
                    </InformModalText>
                  )
                : null}
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
            onClick={() => navigate(Paths.DASHBOARD)}
            type="button"
          >
            <BsFillHouseFill size={44} color="var(--orange)" />
          </UnstyledButton>
        </Group>

        <Group spacing={40}>
          {isUpdate && (
            <>
              <DashedOrangeButton
                onClick={onChangePassword}
                disabled={isChangePasswordLoading}
                type="button"
                $width={266}
              >
                {isChangePasswordLoading ? (
                  <Loader size={35} />
                ) : (
                  <span>Сбросить пароль</span>
                )}
              </DashedOrangeButton>

              <OrangeButton
                disabled={isLoading || isDisabled}
                $width={171}
                type="submit"
              >
                {isLoading ? <Loader size={35} /> : <span>Сохранить</span>}
              </OrangeButton>
            </>
          )}
        </Group>

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
