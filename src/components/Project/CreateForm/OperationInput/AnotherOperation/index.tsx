import { Dispatch, SetStateAction } from 'react';
import { Group, Select, SelectItem, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IoIosArrowUp } from 'react-icons/io';

import {
  CreateOperationFormValues,
  Operation,
  OperationCreateSchema,
} from '../../../../../store/apis/project/types';
import { useGetActiveWorkTypesQuery } from '../../../../../store/apis/workTypes';
import { UnstyledButton } from '../../../../styles';
import { AnotherButton, Plus, useInputStyles } from './styles';
import { AdditionalOperation } from '..';

interface Props {
  additionalOperation: AdditionalOperation;
  handleSelectOperation: (workType: Operation, index: number) => void;
  checkIsOperationSelected: (idx: number) => JSX.Element;
  ids: number[];
  setAdditionalOperations: Dispatch<SetStateAction<AdditionalOperation[]>>;
}

const AnotherOperation = ({
  additionalOperation,
  handleSelectOperation,
  checkIsOperationSelected,
  ids,
  setAdditionalOperations,
}: Props) => {
  const { data: workTypes } = useGetActiveWorkTypesQuery();
  const {
    classes: { label, input, error, rightSection },
  } = useInputStyles();

  const form = useForm<CreateOperationFormValues>({
    initialValues: {
      name: '',
      typeWorkId: '',
    },
    validate: (values) => {
      const resolver = zodResolver(OperationCreateSchema);
      const errors = resolver(values);
      return errors;
    },
  });

  const workTypesSelectItems: SelectItem[] = workTypes
    ? workTypes.map<SelectItem>((workType) => ({
        value: String(workType.id),
        label: workType.name,
      }))
    : [];

  const handleSubmit = () => {
    form.validate();
    if (!form.isValid()) return;

    handleSelectOperation(
      { name: form.values.name, typeWorkId: Number(form.values.typeWorkId) },
      additionalOperation.idx
    );
  };

  const addNewOperation = () => {
    const newAdditionalOperation = {
      idx: Math.floor(Number(form.values.typeWorkId) + Math.random() * 1000),
      isVisible: true,
    };

    setAdditionalOperations((prevState) => [
      ...prevState,
      newAdditionalOperation,
    ]);
  };

  return (
    <Stack spacing={16}>
      <Group position="apart" spacing={0}>
        <AnotherButton onClick={handleSubmit} type="button">
          {checkIsOperationSelected(additionalOperation.idx)}
          <span>Другое</span>
        </AnotherButton>
        {ids.includes(additionalOperation.idx) && (
          <UnstyledButton
            onClick={addNewOperation}
            type="button"
            disabled={!ids.includes(additionalOperation.idx)}
          >
            <Plus size={30} />
          </UnstyledButton>
        )}
      </Group>

      <Group spacing={14} position="apart">
        <TextInput
          {...form.getInputProps('name')}
          label="Название этапа"
          placeholder="Название этапа"
          classNames={{ label, input, error }}
        />
        <Select
          {...form.getInputProps('typeWorkId')}
          data={workTypesSelectItems}
          label="Типы работ"
          placeholder="Типы работ"
          rightSection={<IoIosArrowUp size={24} />}
          classNames={{
            label,
            input,
            error,
            rightSection,
          }}
        />
      </Group>
    </Stack>
  );
};

export default AnotherOperation;
