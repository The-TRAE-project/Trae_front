import { Image } from '@mantine/core';

import traeLogo from '../../assets/traeLogo.svg';
import LoginForm from '../../components/LoginForm';
import SEO from '../../components/SEO';
import {
  ApartContainer,
  TraeLogoImageWrapper,
  WrapperWithBgImage,
} from '../../components/styles';

const Login = () => {
  return (
    <>
      <SEO
        title="TRAE | Вход"
        description="Страница входа."
        name="TRAE"
        type="application"
      />
      <WrapperWithBgImage>
        <ApartContainer>
          <TraeLogoImageWrapper>
            <Image src={traeLogo} alt="logo" />
          </TraeLogoImageWrapper>

          <LoginForm />
        </ApartContainer>
      </WrapperWithBgImage>
    </>
  );
};

export default Login;
