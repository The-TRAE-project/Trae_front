import SEO from '../../components/SEO';
import { Container, WrapperGradientGreen } from '../../components/styles';
import UpdateEndDateForm from '../../components/Project/UpdateEndDateForm';

const ProjectUpdateEndDate = () => {
  return (
    <>
      <SEO
        title="TRAE | Обновление дата окончания проекта"
        description="Страница обновление даты окончания проекта."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <UpdateEndDateForm />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default ProjectUpdateEndDate;
