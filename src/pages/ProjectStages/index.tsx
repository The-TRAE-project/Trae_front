import SEO from '../../components/SEO';
import ProjectStagesListItem from '../../components/ProjectStagesListItem';
import { Container, WrapperBgWhite } from '../../components/styles';

const ProjectStages = () => {
  return (
    <>
      <SEO
        title="Этапы проекта"
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

export default ProjectStages;
