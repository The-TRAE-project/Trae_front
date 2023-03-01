import { useEffect, useState } from 'react';
import { divisorByChunk } from '../../helpers/divisorByChunk';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { useSlider } from '../../helpers/hooks/useSlider';
import { useGetStagesInWorkByEmployeeIdQuery } from '../../store/apis/employee';
import { StageInWork } from '../../store/apis/employee/types';
import StageInWorkCard from './StageInWorkCard';
import { FlexContainer } from './styles';

const StagesInWorkListItem = () => {
  const [stagesInWork, setStagesInWork] = useState<StageInWork[][] | null>(
    null
  );

  const { employee } = useAppSelector((store) => store.employee);
  const { quantity, current, slideIndex, prevSlide, nextSlide } =
    useSlider(stagesInWork);

  const { data } = useGetStagesInWorkByEmployeeIdQuery(employee?.id as number);

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
    <FlexContainer>
      {stagesInWork
        ? stagesInWork[slideIndex]?.map((stage) => (
            <StageInWorkCard key={stage.operationId} stage={stage} />
          ))
        : null}
    </FlexContainer>
  );
};

export default StagesInWorkListItem;
