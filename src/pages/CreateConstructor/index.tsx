import CreateForm from '../../components/Constructor/CreateForm';
import SEO from '../../components/SEO';
import { Container, WrapperGradientGreen } from '../../components/styles';

const CreateConstructor = () => {
  return (
    <>
      <SEO
        title="TRAE | Создать конструктора"
        description="Страница создание конструктора."
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

export default CreateConstructor;
