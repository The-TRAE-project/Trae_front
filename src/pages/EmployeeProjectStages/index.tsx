import SEO from '../../components/SEO';
import ProjectStagesListItem from '../../components/Employees/ProjectStagesListItem';
import { Container, WrapperBgWhite } from '../../components/styles';

const EmployeeProjectStages = () => {
  return (
    <>
      <SEO
        title="TRAE | Этапы проекта"
        description="Страница этапов проекта."
        name="TRAE"
        type="application"
      />
      <WrapperBgWhite>
        <Container>
          <ProjectStagesListItem />
        </Container>
      </WrapperBgWhite>
    </>
  );
};

export default EmployeeProjectStages;
