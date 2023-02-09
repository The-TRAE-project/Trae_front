import SEO from '../../components/SEO';
import { Container, WrapperBgGreen } from '../../components/styles';
import ProjectListItem from '../../components/ProjectListItem';

const Projects = () => {
  return (
    <>
      <SEO
        title="Проекты"
        description="Страница проектов."
        name="TRAE"
        type="application"
      />
      <WrapperBgGreen>
        <Container>
          <ProjectListItem />
        </Container>
      </WrapperBgGreen>
    </>
  );
};

export default Projects;
