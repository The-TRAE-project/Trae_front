import UpdateForm from '../../components/Constructor/UpdateForm';
import SEO from '../../components/SEO';
import { Container, WrapperGradientGreen } from '../../components/styles';

const UpdateUser = () => {
  return (
    <>
      <SEO
        title="TRAE | Обновление конструктора"
        description="Страница обновление конструктора."
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
