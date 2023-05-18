import SEO from '../../components/SEO';
import { Container, WrapperGradientGreen } from '../../components/styles';
import DeleteForm from '../../components/Project/DeleteForm';

const ProjectDelete = () => {
  return (
    <>
      <SEO
        title="TRAE | Удаления проекта"
        description="Страница удаления проекта."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <DeleteForm />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default ProjectDelete;
