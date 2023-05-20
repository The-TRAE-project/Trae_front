import SEO from '../../components/SEO';
import NewStage from '../../components/Project/NewStage';
import { Container, WrapperGradientGreen } from '../../components/styles';

const ProjectNewStage = () => {
  return (
    <>
      <SEO
        title="TRAE | Новая операция проекта"
        description="Страница новой операции проекта."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <NewStage />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default ProjectNewStage;
