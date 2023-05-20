import { useState } from 'react';
import { Menu, Stack } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import {
  CreateProjectFormValues,
  Operation,
} from '../../../../store/apis/project/types';
import { ErrorMessage } from '../../../styles';
import {
  SelectArrow,
  SelectDisplayInput,
  SelectGrid,
  SelectLabel,
  SelectWrapper,
  useSelectMenuStyles,
} from '../../styles';
import {
  ModifiedWorkType,
  useModifyWorkTypes,
} from './helpers/useModifyWorkTypes';
import { useSetOperations } from './helpers/useSetOperations';
import { useSetShipmentOperation } from './helpers/useSetShipmentOperation';
import {
  AdditionalOperation,
  setAdditionalOperation,
} from './helpers/setAdditionalOperation';
import { useClearStates } from './helpers/useClearStates';
import ExtraStages from './ExtraStages';
import SelectButton from './SelectButton';
import SelectedStage from './SelectedStage';
import { ActiveCircle, NotActiveCircle } from './styles';

interface Props {
  form: UseFormReturnType<CreateProjectFormValues>;
  isSuccess: boolean;
}

const StageSelect = ({ form, isSuccess }: Props) => {
  const [ids, setIds] = useState<number[]>([]);
  const [opened, setOpened] = useState<boolean>(false);
  const [selectedOperations, setSelectedOperations] = useState<
    ModifiedWorkType[]
  >([]);
  const [additionalOperations, setAdditionalOperations] = useState<
    AdditionalOperation[]
  >([setAdditionalOperation()]);

  const {
    classes: { dropdown, divider, item, itemLabel },
  } = useSelectMenuStyles();

  const { modifiedWorkTypes, shipmentOnly } = useModifyWorkTypes();

  useSetOperations(form, selectedOperations);
  useSetShipmentOperation(
    opened,
    shipmentOnly,
    selectedOperations,
    setSelectedOperations,
    ids,
    setIds
  );

  const handleSelectOperation = (workType: Operation, idx: number) => {
    if (!ids.includes(idx)) {
      setSelectedOperations((prevState) => [
        ...prevState,
        {
          ...workType,
          idx,
        },
      ]);
      setIds((prevState) => [...prevState, idx]);
    } else if (ids.includes(idx)) {
      const filteredOperations =
        selectedOperations?.filter((it) => it.idx !== idx) || [];
      setSelectedOperations(filteredOperations);
      const filteredIds = ids?.filter((it) => it !== idx) || [];
      setIds(filteredIds);
    }
  };

  const checkIsOperationSelected = (idx: number) =>
    ids.includes(idx) ? (
      <ActiveCircle>{ids.indexOf(idx) + 1}</ActiveCircle>
    ) : (
      <NotActiveCircle />
    );

  const handleClearStates = () => {
    setIds([]);
    setSelectedOperations([]);
    setAdditionalOperations([setAdditionalOperation()]);
  };

  useClearStates(isSuccess, handleClearStates);

  return (
    <SelectWrapper>
      <SelectLabel>Этапы</SelectLabel>
      <Menu
        opened={opened}
        onChange={setOpened}
        closeOnItemClick={false}
        classNames={{ dropdown, divider, item, itemLabel }}
      >
        <Menu.Target>
          <SelectDisplayInput>
            <input type="text" {...form.getInputProps('operations')} />
            {selectedOperations &&
              selectedOperations.map((selectedOperation) => (
                <SelectedStage
                  key={selectedOperation.idx}
                  selectedOperation={selectedOperation}
                  checkIsOperationSelected={checkIsOperationSelected}
                />
              ))}
            <SelectArrow $isOpen={opened} size={34} />
          </SelectDisplayInput>
        </Menu.Target>
        {form.errors && form.errors.operations && (
          <ErrorMessage>{form.errors.operations}</ErrorMessage>
        )}

        <Menu.Dropdown>
          <SelectGrid>
            {modifiedWorkTypes &&
              modifiedWorkTypes.map((modifiedWorkType) => (
                <SelectButton
                  key={modifiedWorkType.idx}
                  workType={modifiedWorkType}
                  handleSelectOperation={handleSelectOperation}
                  checkIsOperationSelected={checkIsOperationSelected}
                />
              ))}
          </SelectGrid>
          <Menu.Divider />
          <Stack spacing={20}>
            {additionalOperations &&
              additionalOperations.map((additionalOperation) => (
                <ExtraStages
                  key={additionalOperation.idx}
                  additionalOperation={additionalOperation}
                  handleSelectOperation={handleSelectOperation}
                  checkIsOperationSelected={checkIsOperationSelected}
                  ids={ids}
                  additionalOperations={additionalOperations}
                  setAdditionalOperations={setAdditionalOperations}
                />
              ))}
          </Stack>
        </Menu.Dropdown>
      </Menu>
    </SelectWrapper>
  );
};

export default StageSelect;
