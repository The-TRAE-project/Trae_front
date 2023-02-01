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

const Selection = () => {
  const navigate = useNavigate();

  const navigateToProjects = () => navigate(Paths.PROJECTS);
  const navigateToEmployees = () => navigate(Paths.EMPLOYEES);

  return (
    <>
      <SEO
        title="Selection"
        description="Selection page."
        name="TRAE"
        type="application"
      />
      <WrapperWithBgImage>
        <ApartContainer>
          <TraeLogoImageWrapper>
            <Image src={traeLogo} alt="logo" />
          </TraeLogoImageWrapper>

          <Stack spacing={50}>
            <Button title="Проекты" onClick={navigateToEmployees} />
            <Button title="Этапы" onClick={navigateToProjects} />
          </Stack>
        </ApartContainer>
      </WrapperWithBgImage>
    </>
  );
};

export default Selection;
