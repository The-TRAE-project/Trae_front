import { Image } from '@mantine/core';

import traeLogo from '../../assets/traeLogo.svg';
import EmployeeLoginForm from '../../components/EmployeeLoginForm';
import SEO from '../../components/SEO';
import {
  ApartContainer,
  TraeLogoImageWrapper,
  WrapperWithBgImage,
} from '../../components/styles';

const EmployeeLogin = () => {
  return (
    <>
      <SEO
        title="TRAE | Вход Сотрудника"
        description="Страница входа сотрудника."
        name="TRAE"
        type="application"
      />
      <WrapperWithBgImage>
        <ApartContainer>
          <TraeLogoImageWrapper>
            <Image src={traeLogo} alt="logo" />
          </TraeLogoImageWrapper>

          <EmployeeLoginForm />
        </ApartContainer>
      </WrapperWithBgImage>
    </>
  );
};

export default EmployeeLogin;
