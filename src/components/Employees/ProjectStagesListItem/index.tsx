import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProjectStage } from '../../../store/apis/employee/types';
import { divisorByChunk } from '../../../helpers/divisorByChunk';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { useGetProjectStagesQuery } from '../../../store/apis/employee';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { useSlider } from '../../../helpers/hooks/useSlider';
import SliderButtons from '../../SliderButtons';
import Loader from '../../Loader';
import StageCard from './StageCard';
import { FlexContainer, FooterWrapper, ProjectNumber, Wrapper } from './styles';

const ProjectStagesListItem = () => {
  const { id } = useParams();
  const [projectStages, setProjectStages] = useState<ProjectStage[][] | null>(
    null
  );
  const { quantity, current, slideIndex, prevSlide, nextSlide } =
    useSlider(projectStages);
  const { projectNumber } = useAppSelector((store) => store.employee);

  const { data, isLoading, isError, error } = useGetProjectStagesQuery(
    id as unknown as number
  );

  const getLastStage = () => projectStages?.flat().at(-1);

  useEffect(() => {
    const dividedProjectStages = async () => {
      if (data) {
        const dividedBy7 = divisorByChunk(data, 7);
        setProjectStages(dividedBy7);
      }
    };

    dividedProjectStages();
  }, [data]);

  useDisplayError(error, isError);

  return (
    <Wrapper>
      {!isLoading ? (
        <>
          {projectStages ? (
            <FlexContainer>
              {projectStages[slideIndex].map((stage, index) => (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  index={index}
                  lastStage={getLastStage()}
                />
              ))}
            </FlexContainer>
          ) : null}
          <FooterWrapper>
            <SliderButtons
              current={current}
              quantity={quantity}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              color="--white-black"
            />
            {projectNumber && <ProjectNumber>{projectNumber}</ProjectNumber>}
          </FooterWrapper>
        </>
      ) : (
        <Loader size={80} color="--white-black" isAbsoluteCentered />
      )}
    </Wrapper>
  );
};

export default ProjectStagesListItem;
