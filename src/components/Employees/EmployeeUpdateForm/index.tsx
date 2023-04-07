/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { SelectItem } from '@mantine/core';

import { useEditEmployeeMutation } from '../../../store/apis/employee';
import {
  EmployeeUpdateFormSchema,
  EmployeeUpdateFormValues,
} from '../../../store/apis/employee/types';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import FormHeader from './FormHeader';
import FormBody from './FormBody';
import { Form } from './styles';

const EmployeeUpdateForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const { employeeToEdit } = useAppSelector((store) => store.employee);

  const workTypesSelectItems: SelectItem[] = employeeToEdit?.types
    ? employeeToEdit.types.map<SelectItem>((workType) => ({
        value: String(workType.id),
        label: workType.name,
      }))
    : [];

  const form = useForm<Omit<EmployeeUpdateFormValues, 'employeeId'>>({
    initialValues: {
      firstName: employeeToEdit?.firstName || null,
      lastName: employeeToEdit?.lastName || null,
      middleName: employeeToEdit?.middleName || null,
      phone: employeeToEdit?.phone || null,
      changedTypesId: workTypesSelectItems || null,
      pinCode: employeeToEdit?.pinCode || null,
      isActive: employeeToEdit?.isActive || false,
      dateOfDismissal: null,
      dateOfEmployment: employeeToEdit?.dateOfEmployment || null,
    },
    validate: (values) => {
      const resolver = zodResolver(
        EmployeeUpdateFormSchema.omit({ employeeId: true })
      );
      const errors = resolver(values);
      console.log(errors);
      return errors;
    },
  });
  console.log(form.values.isActive);
  const [editEmployee, { data: updatedEmployee, isLoading }] =
    useEditEmployeeMutation();

  const handleSubmit = async (
    values: Omit<EmployeeUpdateFormValues, 'employeeId'>
  ) => {
    console.log(values);
    try {
      if (employeeToEdit) {
        await editEmployee({
          ...values,
          changedTypesId:
            values.changedTypesId?.map((typeId) => +typeId) || null,
          employeeId: employeeToEdit.id,
        }).unwrap();
        setIsOpen(true);
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showErrorNotification(error.status, error.error);
    }
  };

  return (
    <Form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        isLoading={isLoading}
        isUpdate={isUpdate}
        onUpdate={() => setIsUpdate(true)}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        employee={updatedEmployee}
      />

      <FormBody employee={employeeToEdit} form={form} isUpdate={isUpdate} />
    </Form>
  );
};

export default EmployeeUpdateForm;
