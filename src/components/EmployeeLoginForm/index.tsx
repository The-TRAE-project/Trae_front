import { useState } from 'react';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';

import { useAppDispatch } from '../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../helpers/showErrorNotification';
import { login, loginEmployee, toggleModal } from '../../store/slices/employee';
import { Employee } from '../../store/slices/employee/types';
import { Paths } from '../../constants/paths';
import instance from '../../config/axiosConfig';
import Loader from '../Loader';
import ConfirmModal from '../ConfirmModal';
import { Button, GroupForm, Wrapper } from './styles';
import { LoginFormValues } from './types';
import NumericKeyboard from './NumericKeyboard';

const EmployeeLoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee>();
  const [isInputInFocus, setIsInputInFocus] = useState<boolean>(false);

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      form.reset();
      setIsLoading(false);
      showErrorNotification(err.response.data.status, err.response.data.error);
    }
  };

  const handleAgreementClick = async () => {
    try {
      if (!employee) return;
      await dispatch(loginEmployee(employee.id)).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      dispatch(toggleModal(false));
      showErrorNotification(err.status, err.error);
    }
  };

  const handleOnKeyboardChange = (pinCode: string) =>
    form.setFieldValue('pinCode', pinCode);

  const handleKeyboardReset = () => form.reset();

  const handleCloseModal = () => dispatch(toggleModal(false));
  const handleCloseInformModal = () => navigate(Paths.EMPLOYEE_MAIN);

  const disabled = /^\d{3}$/i.test(form.values.pinCode);

  return (
    <>
      <Wrapper>
        <GroupForm onSubmit={form.onSubmit(handleSubmit)}>
          <MaskedInput
            mask={[/\d/, /\d/, /\d/]}
            className="maskedInput"
            placeholder="Пароль"
            {...form.getInputProps('pinCode')}
            onFocus={() => setIsInputInFocus(true)}
          />
          <Button type="submit" disabled={!disabled}>
            {isLoading ? <Loader size={40} /> : 'Подтвердить'}
          </Button>
          <NumericKeyboard
            isOpen={isInputInFocus}
            onClose={() => setIsInputInFocus(false)}
            handleOnKeyboardChange={handleOnKeyboardChange}
            reset={handleKeyboardReset}
          />
        </GroupForm>
      </Wrapper>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCloseInformModal={handleCloseInformModal}
        handleAgreementClick={handleAgreementClick}
        isHideHomeBtn={false}
        questionTitle={`${employee?.firstName} ${employee?.lastName} начинает <br /> рабочую смену?`}
        informTitle={`${employee?.firstName} ${employee?.lastName}, <br /> добро пожаловать в Trae <br /> Хорошего рабочего дня
        `}
      />
    </>
  );
};

export default EmployeeLoginForm;
