import SEO from '../../components/SEO';
import NewStageForm from '../../components/Project/NewStageForm';
import { Container, WrapperGradientGreen } from '../../components/styles';

const ProjectNewStage = () => {
  return (
    <>
      <SEO
        title="TRAE | Добавление новай операция проекта"
        description="Страница добавление новой операции проекта."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <NewStageForm />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default ProjectNewStage;
