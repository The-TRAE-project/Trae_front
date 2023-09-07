import { Image, Stack } from '@mantine/core';

import { useNavigate } from 'react-router-dom';
import traeLogo from '../../assets/traeLogo.svg';
import SEO from '../../components/SEO';
import {
  TopContainer,
  TraeLogoImageWrapper,
  WrapperWithBgImage,
} from '../../components/styles';
import Button from '../../components/Button';

const ConstructorMainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="TRAE | Коснтруктор главная страница"
        description="Главная страница конструктора."
        name="TRAE"
        type="application"
      />
      <WrapperWithBgImage>
        <TopContainer>
          <TraeLogoImageWrapper>
            <Image src={traeLogo} alt="logo" />
          </TraeLogoImageWrapper>

          <Stack spacing={40}>
            <Button
              title="Добавить проект"
              onClick={() => navigate('/construcor/create-project')}
              width={410}
            />
          </Stack>
        </TopContainer>
      </WrapperWithBgImage>
    </>
  );
};

export default ConstructorMainPage;
