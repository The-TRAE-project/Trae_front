import SEO from '../../components/SEO';
import { Container, WrapperGradientGreen } from '../../components/styles';
import UserChangePasswordForm from '../../components/Users/UserChangePasswordForm';

const PersonalCabinetChangePassword = () => {
  return (
    <>
      <SEO
        title="TRAE | Изменение пароля"
        description="Изменение пароля пользователя."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <UserChangePasswordForm />
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default PersonalCabinetChangePassword;
