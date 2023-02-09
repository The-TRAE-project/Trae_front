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
  const navigateToStagesInWork = () => navigate(Paths.STAGES_IN_WORK);

  return (
    <>
      <SEO
        title="Главная"
        description="Главная страница."
        name="TRAE"
        type="application"
      />
      <WrapperWithBgImage>
        <ApartContainer>
          <TraeLogoImageWrapper>
            <Image src={traeLogo} alt="logo" />
          </TraeLogoImageWrapper>

          <Stack spacing={68}>
            <Button title="Сотрудники" onClick={navigateToEmployees} disabled />
            <Button title="Проекты" onClick={navigateToSelection} />
            <Button
              title="Этапы в работе"
              onClick={navigateToStagesInWork}
              disabled
            />
          </Stack>
        </ApartContainer>
      </WrapperWithBgImage>
    </>
  );
};

export default Main;
