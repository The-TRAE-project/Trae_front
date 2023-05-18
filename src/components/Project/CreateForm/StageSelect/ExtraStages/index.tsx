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
import { WorkTypeStatuses } from '../../../../../store/apis/workTypes/types';
import { UnstyledButton } from '../../../../styles';
import { ExtraStageButton, useExtraStageInputStyles } from '../../../styles';
import {
  AdditionalOperation,
  setAdditionalOperation,
} from '../helpers/setAdditionalOperation';
import { Plus } from './styles';

interface Props {
  additionalOperation: AdditionalOperation;
  handleSelectOperation: (workType: Operation, index: number) => void;
  checkIsOperationSelected: (idx: number) => JSX.Element;
  ids: number[];
  additionalOperations: AdditionalOperation[];
  setAdditionalOperations: Dispatch<SetStateAction<AdditionalOperation[]>>;
}

const ExtraStages = ({
  additionalOperation,
  handleSelectOperation,
  checkIsOperationSelected,
  ids,
  additionalOperations,
  setAdditionalOperations,
}: Props) => {
  const { data: workTypes } = useGetActiveWorkTypesQuery();

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

  const {
    classes: {
      label,
      input,
      error,
      rightSection,
      dropdown,
      dropdownItem,
      itemsWrapper,
    },
  } = useExtraStageInputStyles();

  const workTypesSelectItems: SelectItem[] = workTypes
    ? workTypes
        .filter((workType) => workType.name !== WorkTypeStatuses.SHIPMENT)
        .map<SelectItem>((workType) => ({
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
        <ExtraStageButton onClick={handleSubmit} type="button">
          {checkIsOperationSelected(additionalOperation.idx)}
          <span>Другое</span>
        </ExtraStageButton>
        {ids.includes(additionalOperation.idx) &&
          additionalOperation.isVisible && (
            <UnstyledButton onClick={addNewOperation} type="button">
              <Plus size={30} />
            </UnstyledButton>
          )}
      </Group>

      <Group spacing={0} position="apart" align="flex-start">
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
            dropdown,
            itemsWrapper,
            item: dropdownItem,
          }}
        />
      </Group>
    </Stack>
  );
};

export default ExtraStages;
