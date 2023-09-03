import SEO from '../../components/SEO';
import UserUpdateForm from '../../components/Users/UserUpdateForm';
import { Container, WrapperGradientGreen } from '../../components/styles';

const PersonalCabinetEditing = () => {
  return (
    <>
      <SEO
        title="TRAE | Редактирвание данных"
        description="Редактирвание данных пользователя."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <UserUpdateForm />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default PersonalCabinetEditing;
