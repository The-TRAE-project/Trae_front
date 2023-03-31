import ProjectListItem from '../../components/ProjectsListItem';
import SEO from '../../components/SEO';
import { Container, WrapperGradientGreen } from '../../components/styles';

const Projects = () => {
  return (
    <>
      <SEO
        title="TRAE | Проекты"
        description="Страница проектов."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <ProjectListItem />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default Projects;
