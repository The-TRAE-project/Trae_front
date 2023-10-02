import { Project } from '../../../../store/apis/project/types';
import { TwoColumnGrid } from '../../../styles';
import DetailsCard from '../../DetailsCard';
import Dates from './Dates';
import GeneralInformation from './GeneralInformation';
import Operations from './Operations';

interface Props {
  project: Project;
}

const DetailsBody = ({ project }: Props) => {
  return (
    <DetailsCard projectNumber={project.number}>
      <TwoColumnGrid>
        <GeneralInformation project={project} />
        <Dates project={project} />
        <Operations
          projectId={project.id}
          projectOperations={project.operations}
          isEnded={!project.isEnded}
        />
      </TwoColumnGrid>
    </DetailsCard>
  );
};

export default DetailsBody;
