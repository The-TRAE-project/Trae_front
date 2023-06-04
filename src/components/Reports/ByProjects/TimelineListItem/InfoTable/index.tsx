import { convertToDate } from '../../../../../helpers/convertToDate';
import { getDayDiff } from '../../../../../helpers/getDayDiff';
import { ProjectInfo } from '../../../../../store/apis/reports/types';
import {
  ProjectCustomer,
  ProjectComment,
  ProjectDeviation,
  ProjectNumber,
  ProjectName,
  Group,
  HeaderTitle,
  Wrapper,
} from './styles';

interface Props {
  projects: ProjectInfo[];
}

const InfoTable = ({ projects }: Props) => {
  const headers = (
    <>
      <HeaderTitle>№</HeaderTitle>
      <HeaderTitle>Клиент</HeaderTitle>
      <HeaderTitle>Изделие</HeaderTitle>
      <HeaderTitle>Отклонение</HeaderTitle>
      <HeaderTitle>Комментарий</HeaderTitle>
    </>
  );

  return (
    <Wrapper>
      <Group>{headers}</Group>
      {projects.map((project) => {
        const today = new Date();
        const projectEndDateByContract = convertToDate(
          project.endDateInContract
        );

        const projectEndDateByPlan = convertToDate(project.plannedEndDate);

        const isProjectOverdue =
          projectEndDateByContract.getTime() < today.getTime();

        const isProjectOpOverdue = project.operations.some(
          (op) => convertToDate(op.plannedEndDate).getTime() < today.getTime()
        );

        return (
          <Group key={project.id}>
            <ProjectNumber
              $isProjectOverdue={isProjectOverdue}
              $isProjectOpOverdue={isProjectOpOverdue}
            >
              {project.number}
            </ProjectNumber>
            <ProjectCustomer>{project.customer}</ProjectCustomer>
            <ProjectName>{project.name}</ProjectName>
            <ProjectDeviation>
              {projectEndDateByPlan.getTime() < today.getTime() &&
                `-${getDayDiff(today, projectEndDateByPlan)}`}
            </ProjectDeviation>
            <ProjectComment>{project.comment}</ProjectComment>
          </Group>
        );
      })}
    </Wrapper>
  );
};

export default InfoTable;
