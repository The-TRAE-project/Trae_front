import { useState } from 'react';
import { Menu, Stack } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import {
  CreateProjectFormValues,
  Operation,
} from '../../../../store/apis/project/types';
import { ErrorMessage } from '../../../styles';
import {
  ModifiedWorkType,
  useModifyWorkTypes,
} from './helpers/useModifyWorkTypes';
import { useClearStates } from './helpers/useClearStates';
import { useSetOperations } from './helpers/useSetOperations';
import {
  AdditionalOperation,
  setAdditionalOperation,
} from './helpers/setAdditionalOperation';
import ExtraOperation from './ExtraOperation';
import SelectButton from './SelectButton';
import SelectedOperation from './SelectedOperation';
import {
  ActiveCircle,
  Arrow,
  DisplayInput,
  Grid,
  Label,
  NotActiveCircle,
  useMenuStyles,
  Wrapper,
} from './styles';

interface Props {
  form: UseFormReturnType<CreateProjectFormValues>;
  isSuccess: boolean;
}

const OperationsInput = ({ form, isSuccess }: Props) => {
  const [ids, setIds] = useState<number[]>([]);
  const [opened, setOpened] = useState<boolean>(false);
  const [selectedOperations, setSelectedOperations] = useState<
    ModifiedWorkType[]
  >([]);
  const [additionalOperations, setAdditionalOperations] = useState<
    AdditionalOperation[]
  >([setAdditionalOperation()]);

  const {
    classes: { dropdown, divider },
  } = useMenuStyles();
  const modifiedWorkTypes = useModifyWorkTypes();

  useSetOperations(form, selectedOperations);

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
        selectedOperations?.filter((item) => item.idx !== idx) || [];
      setSelectedOperations(filteredOperations);
      const filteredIds = ids?.filter((item) => item !== idx) || [];
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
    <Wrapper>
      <Label>Этапы</Label>
      <Menu
        opened={opened}
        onChange={setOpened}
        classNames={{ dropdown, divider }}
      >
        <Menu.Target>
          <DisplayInput>
            <input type="text" {...form.getInputProps('operations')} />
            {selectedOperations &&
              selectedOperations.map((selectedOperation) => (
                <SelectedOperation
                  key={selectedOperation.idx}
                  selectedOperation={selectedOperation}
                  checkIsOperationSelected={checkIsOperationSelected}
                />
              ))}
            <Arrow $isOpen={opened} size={34} />
          </DisplayInput>
        </Menu.Target>
        {form.errors && form.errors.operations && (
          <ErrorMessage>{form.errors.operations}</ErrorMessage>
        )}

        <Menu.Dropdown>
          <Grid>
            {modifiedWorkTypes &&
              modifiedWorkTypes.map((modifiedWorkType) => (
                <SelectButton
                  key={modifiedWorkType.idx}
                  workType={modifiedWorkType}
                  handleSelectOperation={handleSelectOperation}
                  checkIsOperationSelected={checkIsOperationSelected}
                />
              ))}
          </Grid>
          <Menu.Divider />
          <Stack spacing={20}>
            {additionalOperations &&
              additionalOperations.map((additionalOperation) => (
                <ExtraOperation
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
    </Wrapper>
  );
};

export default OperationsInput;
