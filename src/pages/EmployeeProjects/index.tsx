import SEO from '../../components/SEO';
import { Container, WrapperBgGreen } from '../../components/styles';
import EmployeeProjectListItem from '../../components/EmployeeProjectListItem';

const EmployeeProjects = () => {
  return (
    <>
      <SEO
        title="TRAE | Проекты сотрудника"
        description="Страница проектов сотрудника."
        name="TRAE"
        type="application"
      />
      <WrapperBgGreen>
        <Container>
          <EmployeeProjectListItem />
        </Container>
      </WrapperBgGreen>
    </>
  );
};

export default EmployeeProjects;
