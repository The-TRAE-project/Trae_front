import SEO from '../../components/SEO';
import CreateForm from '../../components/Project/CreateForm';
import { Container, WrapperGradientGreen } from '../../components/styles';

const CreateProject = () => {
  return (
    <>
      <SEO
        title="TRAE | Создать проекта"
        description="Страница создание проекта."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <CreateForm />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default CreateProject;
