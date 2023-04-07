import SEO from '../../components/SEO';
import EmployeeCreateForm from '../../components/Employees/EmployeeCreateForm';
import { Container, WrapperGradientGreen } from '../../components/styles';

const CreateEmployee = () => {
  return (
    <>
      <SEO
        title="TRAE | Создание сотрудника"
        description="Страница создание сотрудника."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <EmployeeCreateForm />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default CreateEmployee;
