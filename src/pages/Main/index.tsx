import { Image, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import traeLogo from '../../assets/traeLogo.svg';
import { Paths } from '../../constants/paths';
import Button from '../../components/Button';
import SEO from '../../components/SEO';
import {
  ApartContainer,
  TraeLogoImageWrapper,
  WrapperWithBgImage,
} from '../../components/styles';

const Main = () => {
  const navigate = useNavigate();

  const navigateToSelection = () => navigate(Paths.SELECTION);
  const navigateToEmployees = () => navigate(Paths.EMPLOYEES);

  return (
    <>
      <SEO
        title="Main"
        description="Main page."
        name="TRAE"
        type="application"
      />
      <WrapperWithBgImage>
        <ApartContainer>
          <TraeLogoImageWrapper>
            <Image src={traeLogo} alt="logo" />
          </TraeLogoImageWrapper>

          <Stack spacing={50}>
            <Button title="Сотрудники" onClick={navigateToEmployees} />
            <Button title="Проекты" onClick={navigateToSelection} />
          </Stack>
        </ApartContainer>
      </WrapperWithBgImage>
    </>
  );
};

export default Main;
