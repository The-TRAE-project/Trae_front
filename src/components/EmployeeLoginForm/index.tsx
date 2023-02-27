import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import MaskedInput from 'react-text-mask';

import { Paths } from '../../constants/paths';
import { useAppDispatch } from '../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { login, loginEmployee, toggleModal } from '../../store/slices/employee';
import { Employee } from '../../store/slices/employee/types';
import instance from '../../config/axiosConfig';
import Loader from '../Loader';
import ConfirmModal from '../ConfirmModal';
import { Button, GroupForm } from './styles';
import { LoginFormValues } from './types';

const EmployeeLoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee>();

  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((store) => store.employee);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      pinCode: '',
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { data } = await instance.get(`/employee/login/${values.pinCode}`);
      setEmployee(data);
      setIsLoading(false);
      if (!data.onShift) {
        dispatch(toggleModal(true));
      } else {
        dispatch(login(data));
        navigate(Paths.EMPLOYEE_MAIN);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleAgreementClick = () => {
    if (!employee) return;
    dispatch(loginEmployee(employee.id));
  };

  const handleCloseModal = () => dispatch(toggleModal(false));

  const disabled = /^\d{3}$/i.test(form.values.pinCode);

  return (
    <>
      <GroupForm onSubmit={form.onSubmit(handleSubmit)}>
        <MaskedInput
          mask={[/\d/, /\d/, /\d/]}
          className="maskedInput"
          placeholder="Пароль"
          {...form.getInputProps('pinCode')}
        />
        <Button type="submit" disabled={!disabled}>
          {isLoading ? <Loader size={40} /> : 'Подтвердить'}
        </Button>
      </GroupForm>

      <ConfirmModal
        isOpen={isModalOpen}
        handleAgreementClick={handleAgreementClick}
        onClose={handleCloseModal}
        questionTitle={`${employee?.firstName} ${employee?.lastName} начинает рабочую смену?`}
        informTitle={`
            ${employee?.firstName} ${employee?.lastName}, 
            добро пожаловать в Trae \n Хорошего рабочего дня
        `}
      />
    </>
  );
};

export default EmployeeLoginForm;
