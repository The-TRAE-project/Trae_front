import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { useGetProjectByIdQuery } from '../../../store/apis/project';
import Loader from '../../Loader';
import DetailsCard from '../DetailsCard';
import Dates from './Dates';
import { Grid } from '../styles';
import GeneralInformation from './GeneralInformation';
import Operations from './Operations';

const AdditionalInformation = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { projectId } = useAppSelector((store) => store.project);

  const {
    data: project,
    isLoading,
    error,
    isError,
  } = useGetProjectByIdQuery(3);

  useDisplayError(error, isError);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!isLoading && !!project ? (
        <DetailsCard projectNumber={project.number}>
          <Grid>
            <GeneralInformation project={project} />
            <Dates project={project} />
            <Operations projectOperations={project.operations} />
          </Grid>
        </DetailsCard>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </>
  );
};

export default AdditionalInformation;
