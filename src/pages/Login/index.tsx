import { Image } from '@mantine/core';

import traeLogo from '../../assets/traeLogo.svg';
import LoginForm from '../../components/Users/LoginForm';
import SEO from '../../components/SEO';
import {
  TopContainer,
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
        <TopContainer>
          <TraeLogoImageWrapper>
            <Image src={traeLogo} alt="logo" />
          </TraeLogoImageWrapper>

          <LoginForm />
        </TopContainer>
      </WrapperWithBgImage>
    </>
  );
};

export default Login;
