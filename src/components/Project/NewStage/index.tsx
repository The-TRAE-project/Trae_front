import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { useGetProjectByIdQuery } from '../../../store/apis/project';
import { ProjectOperation } from '../../../store/apis/project/types';
import FormHeader from '../../FormHeader';
import Loader from '../../Loader';
import { FormStack, DashedOrangeButton, ThreeColumnGrid } from '../../styles';
import { useFilterStages } from '../helpers/useFilterStages';
import ListItem from './ListItem';

const NewStage = () => {
  const [stages, setStages] = useState<ProjectOperation[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: project,
    isLoading,
    error,
    isError,
  } = useGetProjectByIdQuery(Number(id as string));

  useDisplayError(error, isError);

  useFilterStages(project?.operations, setStages);

  const getLastStage = () => stages.at(-1);

  const navigateBack = () => navigate(`/project/${id}/details`);
  const navigateToInsertNewStage = () =>
    navigate(`/project/${id}/insert-new-stage`);

  return (
    <FormStack>
      {!isLoading && !!project ? (
        <>
          <FormHeader isShowSubmitBtn={false} onBack={navigateBack} />
          {!!stages && <ListItem list={stages} lastItem={getLastStage()} />}

          <ThreeColumnGrid>
            <DashedOrangeButton
              onClick={navigateToInsertNewStage}
              type="button"
            >
              Добавить этап
            </DashedOrangeButton>
          </ThreeColumnGrid>
        </>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </FormStack>
  );
};

export default NewStage;
