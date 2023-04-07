import { useNavigate } from 'react-router-dom';
import { Group, Stack } from '@mantine/core';
import { BsFillPencilFill } from 'react-icons/bs';
import dayjs from 'dayjs';

import { Paths } from '../../../../constants/paths';
import { Employee } from '../../../../store/apis/employee/types';
import { InformModalText, OrangeButton, UnstyledButton } from '../../../styles';
import ArrowLeft from '../../../svgs/ArrowLeft';
import Home from '../../../svgs/Home';
import Loader from '../../../Loader';
import InformModal from '../../../InformModal';

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
              <InformModalText>
                Статус:&nbsp;
                <strong>
                  {employee.isActive ? 'Активный' : ' заблокированный'}
                </strong>
              </InformModalText>
              {/* {!!employee.dateOfEmployment && (
                <InformModalText>
                  Дата увольнения:&nbsp;
                  <strong>
                    {dayjs(employee?.dateOfDismissal.join('-')).format(
                      'DD.MM.YYYY'
                    )}
                  </strong>
                </InformModalText>
              )} */}
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
            <ArrowLeft />
          </UnstyledButton>
          <UnstyledButton
            onClick={() => navigate(Paths.PROJECTS)}
            type="button"
          >
            <Home />
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
