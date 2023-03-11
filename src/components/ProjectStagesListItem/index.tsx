import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { divisorByChunk } from '../../helpers/divisorByChunk';
import { useSlider } from '../../helpers/hooks/useSlider';
import { showErrorNotification } from '../../helpers/showErrorNotification';
import { useGetProjectStagesQuery } from '../../store/apis/employee';
import { ProjectStage } from '../../store/apis/employee/types';
import ControlButtons from '../ControlButtons';
import Loader from '../Loader';
import StageCard from './StageCard';
import {
  FlexContainer,
  FooterWrapper,
  ProjectNumber,
  Stack,
  Wrapper,
} from './styles';
// TODO:
interface Error {
  data: any;
}

const ProjectStagesListItem = () => {
  const { id } = useParams();
  const location = useLocation();
  const [projectStages, setProjectStages] = useState<ProjectStage[][] | null>(
    null
  );
  const { quantity, current, slideIndex, prevSlide, nextSlide } =
    useSlider(projectStages);

  const { data, isLoading, isError, error } = useGetProjectStagesQuery(
    id as unknown as number
  );

  const dividerByEven = (stagesArr: ProjectStage[]) =>
    stagesArr?.filter((_: ProjectStage, index: number) => index % 2 === 0);

  const dividerByOdd = (stagesArr: ProjectStage[]) =>
    stagesArr?.filter((_: ProjectStage, index: number) => !(index % 2 === 0));

  useEffect(() => {
    const dividedProjectStages = async () => {
      if (data) {
        const dividedBy7 = divisorByChunk(data, 7);
        setProjectStages(dividedBy7);
      }
    };

    dividedProjectStages();
  }, [data]);

  // TODO:
  useEffect(() => {
    const showError = () => {
      const err = error as Error;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isError && showErrorNotification(err?.data?.status, err?.data?.error);
    };

    showError();
  }, [isError, error]);

  return (
    <Wrapper>
      {!isLoading ? (
        <>
          {projectStages ? (
            <Stack>
              <FlexContainer>
                {dividerByEven(projectStages[slideIndex]).map(
                  (stage: ProjectStage) => (
                    <StageCard key={stage.id} stage={stage} down />
                  )
                )}
              </FlexContainer>
              <FlexContainer>
                {dividerByOdd(projectStages[slideIndex]).map(
                  (stage: ProjectStage) => (
                    <StageCard key={stage.id} stage={stage} />
                  )
                )}
              </FlexContainer>
            </Stack>
          ) : null}
          <FooterWrapper>
            <ControlButtons
              current={current}
              quantity={quantity}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              color="--white-black"
            />
            {location.state.projectNumber && (
              <ProjectNumber>{location.state.projectNumber}</ProjectNumber>
            )}
          </FooterWrapper>
        </>
      ) : (
        <Loader size={80} color="--white-black" isAbsoluteCentered />
      )}
    </Wrapper>
  );
};

export default ProjectStagesListItem;
