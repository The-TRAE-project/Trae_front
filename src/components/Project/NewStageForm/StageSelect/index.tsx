import { useState } from 'react';
import {
  Group,
  Select,
  SelectItem,
  Stack,
  Menu,
  TextInput,
} from '@mantine/core';
import { useForm, UseFormReturnType, zodResolver } from '@mantine/form';
import { IoIosArrowUp } from 'react-icons/io';

import { useGetActiveWorkTypesQuery } from '../../../../store/apis/workTypes';
import {
  CreateOperationFormValues,
  NewOperationFormValues,
  OperationCreateSchema,
} from '../../../../store/apis/project/types';
import { WorkTypeStatuses } from '../../../../store/apis/workTypes/types';
import {
  ErrorMessage,
  SelectArrow,
  SelectDisplayInput,
  SelectLabel,
  SelectWrapper,
} from '../../../styles';
import {
  ExtraStageButton,
  SelectGrid,
  useSelectMenuStyles,
  useExtraStageInputStyles,
} from '../../styles';
import SelectButton from './SelectButton';
import { SelectCircleIcon } from './styles';

type StageWithoutProjectId = Omit<NewOperationFormValues, 'projectId'>;

interface Props {
  form: UseFormReturnType<
    StageWithoutProjectId,
    (values: StageWithoutProjectId) => StageWithoutProjectId
  >;
}

const StageSelect = ({ form }: Props) => {
  const [opened, setOpened] = useState<boolean>(false);

  const { data: workTypes } = useGetActiveWorkTypesQuery();

  const extraStageForm = useForm<CreateOperationFormValues>({
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
      dropdown: dropdownWrapper,
      dropdownItem,
      itemsWrapper,
    },
  } = useExtraStageInputStyles();
  const {
    classes: { dropdown, divider, item, itemLabel },
  } = useSelectMenuStyles();

  const workTypesWithoutShipment = workTypes
    ? workTypes.filter(
        (workType) => workType.name !== WorkTypeStatuses.SHIPMENT
      )
    : [];
  const workTypesSelectItems: SelectItem[] = workTypesWithoutShipment
    ? workTypesWithoutShipment.map<SelectItem>((workType) => ({
        value: String(workType.id),
        label: workType.name,
      }))
    : [];

  const chooseTypeWork = (name: string, typeWorkId: number) => {
    form.setFieldValue('name', name);
    form.setFieldValue('typeWorkId', typeWorkId);
  };

  const handleSetExtraStage = () => {
    extraStageForm.validate();
    if (!extraStageForm.isValid()) return;

    const { name, typeWorkId } = extraStageForm.values;
    chooseTypeWork(name, Number(typeWorkId));
  };

  const isExtraStageSelected = form.values.name
    ? form.values.name === extraStageForm.values.name
    : false;

  return (
    <SelectWrapper>
      <SelectLabel>Этап</SelectLabel>
      <Menu
        opened={opened}
        onChange={setOpened}
        classNames={{ dropdown, divider, item, itemLabel }}
      >
        <Menu.Target>
          <SelectDisplayInput $isFs28>
            <input type="text" {...form.getInputProps('name')} />
            {form.values.name && <p>{form.values.name}</p>}
            <SelectArrow $isOpen={opened} size={34} />
          </SelectDisplayInput>
        </Menu.Target>
        {form.errors && form.errors.name && (
          <ErrorMessage>{form.errors.name}</ErrorMessage>
        )}

        <Menu.Dropdown>
          <SelectGrid>
            {!!workTypesWithoutShipment &&
              workTypesWithoutShipment.map((workType) => (
                <SelectButton
                  key={workType.id}
                  workType={workType}
                  selectedStage={form.values.name}
                  chooseTypeWork={chooseTypeWork}
                />
              ))}
          </SelectGrid>
          <Menu.Divider />

          <Stack spacing={16}>
            <ExtraStageButton onClick={handleSetExtraStage} type="button">
              <SelectCircleIcon $isActive={isExtraStageSelected} />
              <span>Другое</span>
            </ExtraStageButton>

            <Group spacing={0} position="apart" align="flex-start">
              <TextInput
                {...extraStageForm.getInputProps('name')}
                label="Название этапа"
                placeholder="Название этапа"
                classNames={{ label, input, error }}
              />
              <Select
                {...extraStageForm.getInputProps('typeWorkId')}
                data={workTypesSelectItems}
                label="Типы работ"
                placeholder="Типы работ"
                rightSection={<IoIosArrowUp size={24} />}
                classNames={{
                  label,
                  input,
                  error,
                  rightSection,
                  dropdown: dropdownWrapper,
                  itemsWrapper,
                  item: dropdownItem,
                }}
              />
            </Group>
          </Stack>
        </Menu.Dropdown>
      </Menu>
    </SelectWrapper>
  );
};

export default StageSelect;
