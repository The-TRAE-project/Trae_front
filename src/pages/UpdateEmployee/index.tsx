import SEO from '../../components/SEO';
import EmployeeUpdateForm from '../../components/Employees/EmployeeUpdateForm';
import { Container, WrapperGradientGreen } from '../../components/styles';

const UpdateEmployee = () => {
  return (
    <>
      <SEO
        title="TRAE | Обновление сотрудника"
        description="Страница обновление сотрудника."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <EmployeeUpdateForm />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default UpdateEmployee;
