import { UseFormReturnType } from '@mantine/form';

import { UpdateProjectFormValues } from '../../../../store/apis/project/types';
import NumberInput from '../../../NumberInput';
import Textarea from '../../../Textarea';
import TextInput from '../../../TextInput';
import { TwoColumnGrid } from '../../../styles';

type ProjectWithoutId = Omit<UpdateProjectFormValues, 'projectId'>;

interface Props {
  form: UseFormReturnType<
    ProjectWithoutId,
    (values: ProjectWithoutId) => ProjectWithoutId
  >;
}

const FormBody = ({ form }: Props) => {
  return (
    <TwoColumnGrid>
      <NumberInput
        {...form.getInputProps('projectNumber')}
        label="Номер проекта"
        placeholder="Номер проекта"
        min={0}
        max={999}
        minLength={1}
        maxLength={3}
      />
      <TextInput
        {...form.getInputProps('projectName')}
        label="Наименование изделия"
        placeholder="Наименование изделия"
        minLength={2}
        maxLength={30}
      />
      <TextInput
        {...form.getInputProps('customer')}
        label="Клиент"
        placeholder="Клиент"
        minLength={2}
        maxLength={30}
      />
      <Textarea
        {...form.getInputProps('commentary')}
        label="Комментарий"
        placeholder="Комментарий"
        maxLength={1000}
      />
    </TwoColumnGrid>
  );
};

export default FormBody;
