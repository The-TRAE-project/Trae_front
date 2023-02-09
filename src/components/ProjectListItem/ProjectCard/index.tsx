import {
  ProjectNumber,
  ProjectName,
  Wrapper,
  ProjectStatus,
  Employee,
} from './styles';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <Wrapper>
      <ProjectNumber>{project.projectNumber}</ProjectNumber>
      <Employee>{project.employee}</Employee>
      <ProjectName>{project.itemName}</ProjectName>
      <ProjectStatus>{project.status}</ProjectStatus>
    </Wrapper>
  );
};

export default ProjectCard;
