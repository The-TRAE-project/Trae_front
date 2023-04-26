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
import {
  AdditionalOperation,
  setAdditionalOperation,
} from '../helpers/setAdditionalOperation';
import { ExtraOperationButton, Plus, useInputStyles } from './styles';

interface Props {
  additionalOperation: AdditionalOperation;
  handleSelectOperation: (workType: Operation, index: number) => void;
  checkIsOperationSelected: (idx: number) => JSX.Element;
  ids: number[];
  additionalOperations: AdditionalOperation[];
  setAdditionalOperations: Dispatch<SetStateAction<AdditionalOperation[]>>;
}

const ExtraOperation = ({
  additionalOperation,
  handleSelectOperation,
  checkIsOperationSelected,
  ids,
  additionalOperations,
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

    const { name, typeWorkId } = form.values;
    handleSelectOperation(
      { name, typeWorkId: Number(typeWorkId) },
      additionalOperation.idx
    );
  };

  const addNewOperation = () => {
    const changeVisibility = additionalOperations.map((item) =>
      item.idx === additionalOperation.idx
        ? { ...item, isVisible: false }
        : item
    );

    setAdditionalOperations([...changeVisibility, setAdditionalOperation()]);
  };

  return (
    <Stack spacing={16}>
      <Group position="apart" spacing={0}>
        <ExtraOperationButton onClick={handleSubmit} type="button">
          {checkIsOperationSelected(additionalOperation.idx)}
          <span>Другое</span>
        </ExtraOperationButton>
        {ids.includes(additionalOperation.idx) &&
          additionalOperation.isVisible && (
            <UnstyledButton onClick={addNewOperation} type="button">
              <Plus size={30} />
            </UnstyledButton>
          )}
      </Group>

      <Group spacing={0} position="apart">
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

export default ExtraOperation;
