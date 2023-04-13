import { useNavigate } from 'react-router-dom';
import { Group, Stack } from '@mantine/core';
import { BsFillPencilFill, BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';
import dayjs from 'dayjs';

import { Paths } from '../../../../constants/paths';
import { Employee } from '../../../../store/apis/employee/types';
import { InformModalText, OrangeButton, UnstyledButton } from '../../../styles';
import Loader from '../../../Loader';
import InformModal from '../../../InformModal';
import { useAppSelector } from '../../../../helpers/hooks/useAppSelector';

interface Props {
  isLoading: boolean;
  isUpdate: boolean;
  onUpdate: () => void;
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | undefined;
}

const FormHeader = ({
  isLoading,
  isUpdate,
  onUpdate,
  isOpen,
  onClose,
  employee,
}: Props) => {
  const navigate = useNavigate();
  const { employeeToEdit } = useAppSelector((store) => store.employee);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convertToNumberArray = (data: any) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.map((item: any) => ({ id: Number(item.id || item.value) }));

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={onClose}
        title={
          employee
            ? `${employee.firstName} ${employee.lastName} изменения сохранены`
            : ''
        }
        backPath={Paths.EMPLOYEES}
      >
        <Stack spacing={20}>
          {!!employee && (
            <>
              {employee.firstName === employeeToEdit?.firstName ? null : (
                <InformModalText>
                  Имя:&nbsp;
                  <strong>{employee.firstName}</strong>
                </InformModalText>
              )}
              {employee.lastName === employeeToEdit?.lastName ? null : (
                <InformModalText>
                  Фамилия:&nbsp;
                  <strong>{employee.lastName}</strong>
                </InformModalText>
              )}
              {employee.middleName === employeeToEdit?.middleName ? null : (
                <InformModalText>
                  Отчество:&nbsp;
                  <strong>{employee.middleName}</strong>
                </InformModalText>
              )}
              {employee.pinCode === employeeToEdit?.pinCode ? null : (
                <InformModalText>
                  Пароль:&nbsp;
                  <strong>{employee.pinCode}</strong>
                </InformModalText>
              )}
              {employee.phone === employeeToEdit?.phone ? null : (
                <InformModalText>
                  Номер телефона:&nbsp;
                  <strong>{employee.phone}</strong>
                </InformModalText>
              )}
              {employee.isActive === employeeToEdit?.isActive ? null : (
                <InformModalText>
                  Статус:&nbsp;
                  <strong>
                    {employee.isActive ? 'Активный' : ' заблокированный'}
                  </strong>
                </InformModalText>
              )}
              {dayjs(employee.dateOfEmployment).toDate().getTime() ===
              dayjs(employeeToEdit?.dateOfEmployment)
                .toDate()
                .getTime() ? null : (
                <InformModalText>
                  Дата регистрации:&nbsp;
                  <strong>
                    {dayjs(employee.dateOfEmployment).format('DD.MM.YYYY')}
                  </strong>
                </InformModalText>
              )}
              {employee?.dateOfDismissal ? (
                <InformModalText>
                  Дата увольнения:&nbsp;
                  <strong>
                    {dayjs(employee.dateOfDismissal).format('DD.MM.YYYY')}
                  </strong>
                </InformModalText>
              ) : null}
              {JSON.stringify(convertToNumberArray(employeeToEdit?.types)) ===
              JSON.stringify(convertToNumberArray(employee.types)) ? null : (
                <Group spacing={10} position="center">
                  <InformModalText>
                    Типы работ:&nbsp;
                    <strong>
                      {employee.types.map((type) => type.name).join(', ')}
                    </strong>
                  </InformModalText>
                </Group>
              )}
            </>
          )}
        </Stack>
      </InformModal>
      <Group position="apart" spacing={100}>
        <Group spacing={42}>
          <UnstyledButton
            onClick={() => navigate(Paths.EMPLOYEES)}
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
          <OrangeButton disabled={isLoading} $width={171} type="submit">
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
