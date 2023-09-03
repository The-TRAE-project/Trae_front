import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useLocalStorage } from '@mantine/hooks';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { useGetProjectByIdQuery } from '../../../store/apis/project';
import { ProjectOperation } from '../../../store/apis/project/types';
import FormHeader from '../../FormHeader';
import Loader from '../../Loader';
import { FormStack } from '../../styles';
import { useFilterStages } from '../helpers/useFilterStages';
import ListItem from './ListItem';
import { LocalStorage } from '../../../constants/localStorage';

const NewStage = () => {
  const [stages, setStages] = useState<ProjectOperation[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const [fromReports] = useLocalStorage<boolean>({
    key: LocalStorage.PROJECT_DETAILS_FROM_REPORTS,
  });

  const {
    data: project,
    isLoading,
    error,
    isError,
  } = useGetProjectByIdQuery(Number(id as string));

  useDisplayError(error, isError);

  useFilterStages(project?.operations, setStages);

  const getLastStage = () => stages.at(-1);

  const navigateBack = () =>
    navigate(
      fromReports
        ? `/reports/by-projects/project/${id}/details`
        : `/project/${id}/details`
    );
  const navigateToInsertNewStage = () =>
    navigate(
      fromReports
        ? `/reports/by-projects/project/${id}/insert-new-stage`
        : `/project/${id}/insert-new-stage`
    );

  return (
    <FormStack>
      {!isLoading && !!project ? (
        <>
          <FormHeader
            isShowSubmitBtn={false}
            isShowClickBtn
            onClick={navigateToInsertNewStage}
            clickBtnText="Добавить этап"
            onBack={navigateBack}
          />
          {!!stages && (
            <ListItem
              list={stages}
              lastItem={getLastStage()}
              onBack={navigateBack}
            />
          )}

          {/* <ThreeColumnGrid>
            <DashedOrangeButton
              onClick={navigateToInsertNewStage}
              type="button"
            >
              Добавить этап
            </DashedOrangeButton>
          </ThreeColumnGrid> */}
        </>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </FormStack>
  );
};

export default NewStage;
