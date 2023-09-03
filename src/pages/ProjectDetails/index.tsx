import SEO from '../../components/SEO';
import Details from '../../components/Project/Details';
import { Container, WrapperGradientGreen } from '../../components/styles';

const ProjectDetails = () => {
  return (
    <>
      <SEO
        title="TRAE | Детали проекта"
        description="Дополнительное информация о проекте."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <Details />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default ProjectDetails;
