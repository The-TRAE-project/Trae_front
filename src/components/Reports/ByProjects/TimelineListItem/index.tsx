import { ProjectInfo } from '../../../../store/apis/reports/types';
import InfoTable from './InfoTable';
import TimelineCalendar from './TimelineCalendar';
import { Wrapper } from './styles';

interface Props {
  defaultTimeStart: Date;
  defaultTimeEnd: Date;
  projects: ProjectInfo[];
}

const TimelineListItem = ({
  defaultTimeStart,
  defaultTimeEnd,
  projects,
}: Props) => {
  return (
    <Wrapper>
      {projects && (
        <>
          <InfoTable projects={projects} />
          <TimelineCalendar
            defaultTimeStart={defaultTimeStart}
            defaultTimeEnd={defaultTimeEnd}
            projects={projects}
          />
        </>
      )}
    </Wrapper>
  );
};

export default TimelineListItem;
