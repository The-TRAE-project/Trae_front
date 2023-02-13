import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { divisorByChunk } from '../../helpers/divisorByChunk';
import { useSlider } from '../../helpers/hooks/useSlider';
import { ProjectServices } from '../../helpers/services/projectServices';
import { ProjectStage } from '../../helpers/services/types';
import ControlButtons from '../ControlButtons';
import StageCard from './StageCard';
import { FlexContainer, Stack, Wrapper } from './styles';

const ProjectStagesListItem = () => {
  const { id } = useParams();
  const [projectStages, setProjectStages] = useState<
    ProjectStage[] | undefined
  >([]);
  const { quantity, current, slideIndex, prevSlide, nextSlide } =
    useSlider(projectStages);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dividerByEven = (data: any, even: number) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.filter((_: any, index: number) => index % even === 0);

  useEffect(() => {
    const getProjectById = async () => {
      if (!id) return;
      const response = await ProjectServices.getByProjectId(id);
      if (response) {
        const dividedBy7 = divisorByChunk(response.stages, 7);
        setProjectStages(dividedBy7);
      }
    };

    getProjectById();
  }, [id]);

  return (
    <Wrapper>
      {projectStages ? (
        <Stack>
          <FlexContainer>
            {dividerByEven(projectStages[slideIndex], 2)?.map(
              (stage: ProjectStage) => (
                <StageCard key={stage.id} stage={stage} down />
              )
            )}
          </FlexContainer>
          <FlexContainer>
            {dividerByEven(projectStages[slideIndex], 3)?.map(
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
      />
    </Wrapper>
  );
};

export default ProjectStagesListItem;
