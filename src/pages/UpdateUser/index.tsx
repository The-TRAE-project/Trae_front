import UpdateForm from '../../components/Users/UpdateForm';
import SEO from '../../components/SEO';
import { Container, WrapperGradientGreen } from '../../components/styles';

const UpdateUser = () => {
  return (
    <>
      <SEO
        title="TRAE | Обновление пользователя"
        description="Страница обновление пользователя."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <UpdateForm />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default UpdateUser;
