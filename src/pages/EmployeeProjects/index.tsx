import SEO from '../../components/SEO';
import { Container, WrapperBgGreen } from '../../components/styles';
import ProjectsListItem from '../../components/Employees/ProjectsListItem';

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
          <ProjectsListItem />
        </Container>
      </WrapperBgGreen>
    </>
  );
};

export default EmployeeProjects;
