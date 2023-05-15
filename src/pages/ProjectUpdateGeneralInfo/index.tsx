import SEO from '../../components/SEO';
import { Container, WrapperGradientGreen } from '../../components/styles';
import UpdateGeneralInfo from '../../components/Project/UpdateGeneralInfo';

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
          <UpdateGeneralInfo />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default ProjectUpdateGeneralInfo;
