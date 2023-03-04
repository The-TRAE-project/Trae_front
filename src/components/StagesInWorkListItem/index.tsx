import { useEffect, useState } from 'react';

import { divisorByChunk } from '../../helpers/divisorByChunk';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { useSlider } from '../../helpers/hooks/useSlider';
import { useGetStagesInWorkByEmployeeIdQuery } from '../../store/apis/employee';
import { StageInWork } from '../../store/apis/employee/types';
import ControlButtons from '../ControlButtons';
import Loader from '../Loader';
import StageInWorkCard from './StageInWorkCard';
import { FlexContainer, Wrapper } from './styles';

const StagesInWorkListItem = () => {
  const [stagesInWork, setStagesInWork] = useState<StageInWork[][] | null>(
    null
  );

  const { employee } = useAppSelector((store) => store.employee);
  const { quantity, current, slideIndex, prevSlide, nextSlide } =
    useSlider(stagesInWork);

  const { data, isLoading } = useGetStagesInWorkByEmployeeIdQuery(
    employee?.id as number
  );

  useEffect(() => {
    const dividedStagesInWork = () => {
      if (data) {
        const divideBy5 = divisorByChunk(data, 5);
        setStagesInWork(divideBy5);
      }
    };

    dividedStagesInWork();
  }, [data]);

  return (
    <Wrapper>
      {!isLoading ? (
        <>
          <FlexContainer>
            {stagesInWork
              ? stagesInWork[slideIndex]?.map((stage) => (
                  <StageInWorkCard key={stage.operationId} stage={stage} />
                ))
              : null}
          </FlexContainer>

          <ControlButtons
            current={current}
            quantity={quantity}
            prevSlide={prevSlide}
            nextSlide={nextSlide}
            color="--white"
            isVertical
          />
        </>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </Wrapper>
  );
};

export default StagesInWorkListItem;
