import SEO from '../../components/SEO';
import { Container, WrapperGradientGreen } from '../../components/styles';
import UpdateGeneralInfoForm from '../../components/Project/UpdateGeneralInfoForm';

const ProjectUpdateGeneralInfo = () => {
  return (
    <>
      <SEO
        title="TRAE | Обновление общей информации проекта"
        description="Страница обновление общей информации проекта."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <UpdateGeneralInfoForm />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default ProjectUpdateGeneralInfo;
