import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import dayjs from 'dayjs';

import { useEditEmployeeMutation } from '../../../store/apis/employee';
import {
  EmployeeUpdateFormSchema,
  EmployeeUpdateFormValues,
} from '../../../store/apis/employee/types';
import { Status } from '../../../store/types';
import { Paths } from '../../../constants/paths';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { showInformNotification } from '../../../helpers/showInformNotification';
import { FormWrapper } from '../../styles';
import {
  checkValues,
  compareValues,
  convertToDate,
  convertToNumberArray,
  isObjectsEqual,
} from './helpers/compareValues';
import { useSetUpdatedValues } from './helpers/useSetUpdatedValues';
import { useSetMultiSelectDefaultValues } from './helpers/useSetMultiSelectDefaultValues';
import FormHeader from './FormHeader';
import FormBody from './FormBody';
import { useSetDefaultValues } from './helpers/useSetDefaultValues';

const EmployeeUpdateForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const navigate = useNavigate();
  const { employeeToEdit } = useAppSelector((store) => store.employee);

  const form = useForm<Omit<EmployeeUpdateFormValues, 'employeeId'>>({
    initialValues: {
      firstName: employeeToEdit?.firstName || null,
      lastName: employeeToEdit?.lastName || null,
      middleName: employeeToEdit?.middleName || null,
      phone: employeeToEdit?.phone || null,
      changedTypesId: null,
      pinCode: employeeToEdit?.pinCode || null,
      isActive: employeeToEdit?.isActive ? 'Активный' : 'Заблокированный',
      dateOfDismissal:
        (employeeToEdit?.dateOfDismissal &&
          dayjs(employeeToEdit?.dateOfDismissal).toDate()) ||
        null,
      dateOfEmployment:
        dayjs(employeeToEdit?.dateOfEmployment).toDate() || null,
    },
    validate: (values) => {
      const resolver = zodResolver(
        EmployeeUpdateFormSchema.omit({ employeeId: true })
      );
      const errors = resolver(values);
      return errors;
    },
  });

  const [editEmployee, { data: updatedEmployee, isLoading }] =
    useEditEmployeeMutation();
  // TODO:
  const handleSubmit = async (
    values: Omit<EmployeeUpdateFormValues, 'employeeId'>
  ) => {
    try {
      if (employeeToEdit) {
        const {
          firstName,
          lastName,
          middleName,
          phone,
          pinCode,
          dateOfEmployment,
          isActive,
        } = values;

        const isEmployeeActive = employeeToEdit.isActive
          ? 'Активный'
          : 'Заблокированный';

        if (
          checkValues(firstName, employeeToEdit.firstName) &&
          checkValues(lastName, employeeToEdit.lastName) &&
          checkValues(middleName, employeeToEdit.middleName) &&
          checkValues(phone, employeeToEdit.phone) &&
          checkValues(pinCode, employeeToEdit.pinCode) &&
          checkValues(isActive, isEmployeeActive) &&
          isObjectsEqual(
            convertToNumberArray(employeeToEdit.types),
            convertToNumberArray(values.changedTypesId)
          ) &&
          checkValues(
            dateOfEmployment?.getTime(),
            convertToDate(employeeToEdit?.dateOfEmployment)
          )
        ) {
          showInformNotification(
            'Мы уведомляем вас, что',
            'вы не сделали никаких изменений.'
          );
          navigate(Paths.EMPLOYEES);
          return;
        }

        if (
          values.isActive === Status.BLOCKED &&
          !form.values.dateOfDismissal
        ) {
          form.setFieldError(
            'dateOfDismissal',
            'Пожалуйста, выберите дату увольнения'
          );
          return;
        }
        const comparedValues = compareValues(values, employeeToEdit);
        await editEmployee(comparedValues).unwrap();
        setIsOpen(true);
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showErrorNotification(error?.data?.status, error?.data?.error);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsUpdate(false);
  };

  useSetUpdatedValues(updatedEmployee, isUpdate);

  useSetDefaultValues(form, employeeToEdit);

  useSetMultiSelectDefaultValues(form);

  return (
    <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        isLoading={isLoading}
        isUpdate={isUpdate}
        onUpdate={() => setIsUpdate(true)}
        isOpen={isOpen}
        onClose={handleCloseModal}
        employee={updatedEmployee}
      />

      <FormBody employee={employeeToEdit} form={form} isUpdate={isUpdate} />
    </FormWrapper>
  );
};

export default EmployeeUpdateForm;
