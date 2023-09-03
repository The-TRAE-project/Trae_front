import SEO from '../../components/SEO';
import CreateForm from '../../components/Users/CreateForm';
import { Container, WrapperGradientGreen } from '../../components/styles';

const CreateUser = () => {
  return (
    <>
      <SEO
        title="TRAE | Создать пользователя"
        description="Страница создание пользователя."
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

export default CreateUser;
