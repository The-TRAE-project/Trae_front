import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { divisorByChunk } from '../../helpers/divisorByChunk';
import { useSlider } from '../../helpers/hooks/useSlider';
import { useGetProjectStagesQuery } from '../../store/apis/employee';
import { ProjectStage } from '../../store/apis/employee/types';
import ControlButtons from '../ControlButtons';
import StageCard from './StageCard';
import { FlexContainer, Stack, Wrapper } from './styles';

const ProjectStagesListItem = () => {
  const { id } = useParams();
  const [projectStages, setProjectStages] = useState<ProjectStage[][] | null>(
    null
  );
  const { quantity, current, slideIndex, prevSlide, nextSlide } =
    useSlider(projectStages);

  const { data } = useGetProjectStagesQuery(id as unknown as number);
  console.log(data);
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

  return (
    <Wrapper>
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
      <ControlButtons
        current={current}
        quantity={quantity}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        color="--white-black"
      />
    </Wrapper>
  );
};

export default ProjectStagesListItem;
