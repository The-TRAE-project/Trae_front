import SEO from '../../components/SEO';
import { Container, WrapperGradientGreen } from '../../components/styles';
import CreateWorkTypeForm from '../../components/WorkTypes/CreateWorkTypeForm';

const CreateWorkType = () => {
  return (
    <>
      <SEO
        title="TRAE | Создание типов работ"
        description="Страница создание типа работ."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <CreateWorkTypeForm />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default CreateWorkType;
