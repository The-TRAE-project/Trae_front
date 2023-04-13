import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import dayjs from 'dayjs';

import { useEditEmployeeMutation } from '../../../store/apis/employee';
import {
  EmployeeUpdateFormSchema,
  EmployeeUpdateFormValues,
} from '../../../store/apis/employee/types';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { compareValues } from './helpers/compareValues';
import { useSetUpdatedValues } from './helpers/useSetUpdatedValues';
import FormHeader from './FormHeader';
import FormBody from './FormBody';
import { Form } from './styles';

const EmployeeUpdateForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const { employeeToEdit } = useAppSelector((store) => store.employee);

  const workTypesSelectItems: string[] = employeeToEdit?.types
    ? employeeToEdit.types.map<string>((workType) => workType.name)
    : [];

  const form = useForm<Omit<EmployeeUpdateFormValues, 'employeeId'>>({
    initialValues: {
      firstName: employeeToEdit?.firstName || null,
      lastName: employeeToEdit?.lastName || null,
      middleName: employeeToEdit?.middleName || null,
      phone: employeeToEdit?.phone || null,
      changedTypesId: workTypesSelectItems || null,
      pinCode: employeeToEdit?.pinCode || null,
      isActive: employeeToEdit?.isActive ? 'Активный' : 'Заблокированный',
      dateOfDismissal: employeeToEdit?.dateOfDismissal
        ? dayjs(employeeToEdit?.dateOfDismissal).toDate()
        : null,
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

  const handleSubmit = async (
    values: Omit<EmployeeUpdateFormValues, 'employeeId'>
  ) => {
    try {
      if (employeeToEdit) {
        const comparedValues = compareValues(values, employeeToEdit);
        console.log(comparedValues);
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

  return (
    <Form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        isLoading={isLoading}
        isUpdate={isUpdate}
        onUpdate={() => setIsUpdate(true)}
        isOpen={isOpen}
        onClose={handleCloseModal}
        employee={updatedEmployee}
      />

      <FormBody employee={employeeToEdit} form={form} isUpdate={isUpdate} />
    </Form>
  );
};

export default EmployeeUpdateForm;
