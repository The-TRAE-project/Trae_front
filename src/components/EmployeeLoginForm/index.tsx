import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { Paths } from '../../constants/paths';
import { Button, GroupForm, Input } from './styles';

const EmployeeLoginForm = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      password: '',
    },
  });

  const handleSubmit = (data: any) => {
    navigate(Paths.EMPLOYEE_MAIN);
    console.log(data);
  };

  return (
    <GroupForm onSubmit={form.onSubmit(handleSubmit)}>
      <Input
        mask="999"
        placeholder="Пароль"
        {...form.getInputProps('password')}
      />
      <Button type="submit">Подтвердить</Button>
    </GroupForm>
  );
};

export default EmployeeLoginForm;
