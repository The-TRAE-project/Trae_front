import { Project } from '../../../../store/apis/project/types';
import DetailsCard from '../../DetailsCard';
import { Grid } from '../../styles';
import Dates from './Dates';
import GeneralInformation from './GeneralInformation';
import Operations from './Operations';

interface Props {
  project: Project;
}

const DetailsBody = ({ project }: Props) => {
  return (
    <DetailsCard projectNumber={project.number}>
      <Grid>
        <GeneralInformation project={project} />
        <Dates project={project} />
        <Operations
          projectOperations={project.operations}
          isEnded={!project.isEnded}
        />
      </Grid>
    </DetailsCard>
  );
};

export default DetailsBody;
