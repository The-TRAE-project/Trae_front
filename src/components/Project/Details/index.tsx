import { Stack } from '@mantine/core';
import { useParams } from 'react-router-dom';

import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { useGetProjectByIdQuery } from '../../../store/apis/project';
import Loader from '../../Loader';
import DetailsBody from './DetailsBody';
import DetailsHeader from './DetailsHeader';

const Details = () => {
  const { id } = useParams();

  const {
    data: project,
    isLoading,
    error,
    isError,
  } = useGetProjectByIdQuery(Number(id as string));

  useDisplayError(error, isError);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!isLoading && !!project ? (
        <Stack spacing={99}>
          <DetailsHeader
            projectId={project.id}
            projectNumber={project.number}
            isEnded={project.isEnded}
          />
          <DetailsBody project={project} />
        </Stack>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </>
  );
};

export default Details;
