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
import { DashedButton } from './styles';

const EmployeeMain = () => {
  const navigate = useNavigate();

  const navigateToSelection = () => navigate(Paths.EMPLOYEE_SELECTION);
  const navigateToStagesInWork = () => navigate(Paths.EMPLOYEE_STAGES_IN_WORK);

  return (
    <>
      <SEO
        title="TRAE | Главная Сотрудника"
        description="Главная страница сотрудника."
        name="TRAE"
        type="application"
      />
      <WrapperWithBgImage>
        <ApartContainer>
          <TraeLogoImageWrapper>
            <Image src={traeLogo} alt="logo" />
          </TraeLogoImageWrapper>

          <Stack spacing={40}>
            <Button title="Проекты" onClick={navigateToSelection} width={410} />
            <Button
              title="Этапы в работе"
              onClick={navigateToStagesInWork}
              disabled
              width={410}
            />
            <DashedButton>Завершить смену</DashedButton>
          </Stack>
        </ApartContainer>
      </WrapperWithBgImage>
    </>
  );
};

export default EmployeeMain;
