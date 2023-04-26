import { useNavigate } from 'react-router-dom';
import { Group, Stack } from '@mantine/core';
import { BsFillHouseFill, BsArrowLeft } from 'react-icons/bs';

import { Paths } from '../../constants/paths';
import SEO from '../../components/SEO';
import AdditionalInformation from '../../components/Project/AdditionalInformation';
import {
  Container,
  UnstyledButton,
  WrapperGradientGreen,
} from '../../components/styles';

const ProjectDetails = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="TRAE | Детали проекта"
        description="Дополнительное информация о проекте."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <Stack spacing={99}>
            <Group spacing={40}>
              <UnstyledButton
                onClick={() => navigate(Paths.PROJECTS)}
                type="button"
              >
                <BsArrowLeft size={50} color="var(--orange)" />
              </UnstyledButton>
              <UnstyledButton
                onClick={() => navigate(Paths.DASHBOARD)}
                type="button"
              >
                <BsFillHouseFill size={44} color="var(--orange)" />
              </UnstyledButton>
            </Group>

            <AdditionalInformation />
          </Stack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default ProjectDetails;
