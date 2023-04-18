import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, SelectItem, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

import { Paths } from '../../../constants/paths';
import { Status } from '../../../store/types';
import { useEditWorkTypeMutation } from '../../../store/apis/workTypes';
import {
  EditWorkTypeFormValues,
  EditWorkTypeSchema,
} from '../../../store/apis/workTypes/types';
import { setWorkType } from '../../../store/slices/workType';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { useAppDispatch } from '../../../helpers/hooks/useAppDispatch';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { showInformNotification } from '../../../helpers/showInformNotification';
import Loader from '../../Loader';
import Select from '../../Select';
import TextInput from '../../TextInput';
import InformModal from '../../InformModal';
import {
  FormWrapper,
  InformModalText,
  OrangeButton,
  UnstyledButton,
} from '../../styles';
import { useSetDefaultValues } from './helpers/useSetDefaultValues';
import { checkValues, compareValues } from './helpers/compareValues';
import { FormFlexContainer } from '../styles';

const UpdateWorkTypeForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const { workType } = useAppSelector((store) => store.workType);
  const dispatch = useAppDispatch();

  const form = useForm<Omit<EditWorkTypeFormValues, 'typeWorkId'>>({
    initialValues: {
      newName: workType?.name || null,
      isActive: workType?.isActive ? 'Активный' : 'Заблокированный' || null,
    },
    validate: (values) => {
      const resolver = zodResolver(
        EditWorkTypeSchema.omit({ typeWorkId: true })
      );
      const errors = resolver(values);
      return errors;
    },
  });

  const [editWorkType, { isLoading: isEditLoading, data: editedTypeWork }] =
    useEditWorkTypeMutation();

  useSetDefaultValues(form, workType);

  const handleSubmit = async (
    values: Omit<EditWorkTypeFormValues, 'typeWorkId'>
  ) => {
    try {
      if (workType?.id) {
        const { newName, isActive } = values;
        const isWorkTypeActive = workType.isActive
          ? 'Активный'
          : 'Заблокированный';

        if (
          checkValues(newName, workType.name) &&
          checkValues(isActive, isWorkTypeActive)
        ) {
          showInformNotification(
            'Мы уведомляем вас, что',
            'вы не сделали никаких изменений.'
          );
          navigate(Paths.WORK_TYPES);
          return;
        }

        const comparedValues = compareValues(values, workType);
        const response = await editWorkType({
          typeWorkId: workType.id,
          ...comparedValues,
        }).unwrap();
        setIsOpen(true);
        form.reset();
        dispatch(setWorkType(response));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err.data.status, err.data.error);
    }
  };

  const statusesSelectItems: SelectItem[] = [
    {
      value: Status.ACTIVE,
      label: Status.ACTIVE,
    },
    {
      value: Status.BLOCKED,
      label: Status.BLOCKED,
    },
  ];

  const isDisabled = !form.values.newName && !form.values.isActive;

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Изменения сохранены"
        backPath={Paths.WORK_TYPES}
      >
        <Stack spacing={20}>
          {!!editedTypeWork && (
            <>
              <InformModalText>
                Название: <strong>{editedTypeWork.name}</strong>
              </InformModalText>
              <InformModalText>
                Статус:&nbsp;
                <strong>
                  {editedTypeWork.isActive ? 'Активный' : 'Заблокированный'}
                </strong>
              </InformModalText>
            </>
          )}
        </Stack>
      </InformModal>

      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <Group position="apart" spacing={100}>
          <Group spacing={42}>
            <UnstyledButton
              onClick={() => navigate(Paths.WORK_TYPES)}
              type="button"
            >
              <BsArrowLeft size={50} color="var(--orange)" />
            </UnstyledButton>
            <UnstyledButton
              onClick={() => navigate(Paths.PROJECTS)}
              type="button"
            >
              <BsFillHouseFill size={44} color="var(--orange)" />
            </UnstyledButton>
          </Group>

          <OrangeButton
            disabled={isDisabled || !workType || isEditLoading}
            $width={171}
            type="submit"
          >
            {isEditLoading ? <Loader size={35} /> : <span>Сохранить</span>}
          </OrangeButton>
        </Group>

        <FormFlexContainer>
          <TextInput
            {...form.getInputProps('newName')}
            label="Название"
            placeholder="Название"
            maxLength={30}
          />
          <Select
            {...form.getInputProps('isActive')}
            title="Статус"
            placeholder="Статус"
            data={statusesSelectItems}
          />
        </FormFlexContainer>
      </FormWrapper>
    </>
  );
};

export default UpdateWorkTypeForm;
