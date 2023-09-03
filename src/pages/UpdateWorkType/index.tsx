import SEO from '../../components/SEO';
import { Container, WrapperGradientGreen } from '../../components/styles';
import UpdateWorkTypeForm from '../../components/WorkTypes/UpdateWorkTypeForm';

const UpdateWorkType = () => {
  return (
    <>
      <SEO
        title="TRAE | Обновление типов работ"
        description="Страница обновление типа работ."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <UpdateWorkTypeForm />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default UpdateWorkType;
