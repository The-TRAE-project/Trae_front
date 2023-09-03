import SEO from '../../components/SEO';
import StageDetails from '../../components/Project/StageDetails';
import { Container, WrapperGradientGreen } from '../../components/styles';

const ProjectStage = () => {
  return (
    <>
      <SEO
        title="TRAE | Этапы проекта"
        description="Страница этапов проекта."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <StageDetails />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default ProjectStage;
