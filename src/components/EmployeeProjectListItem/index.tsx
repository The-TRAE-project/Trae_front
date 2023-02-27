import { useEffect, useState } from 'react';

import { useGetAvailableProjectsByEmployeeIdQuery } from '../../store/apis/employee';
import { useSlider } from '../../helpers/hooks/useSlider';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { ProjectServices } from '../../helpers/services/projectServices';
import { Project } from '../../helpers/services/types';
import { divisorByChunk } from '../../helpers/divisorByChunk';
import ControlButtons from '../ControlButtons';
import ProjectCard from './ProjectCard';
import { Grid, Wrapper } from './styles';

const EmployeeProjectListItem = () => {
  const [projects, setProjects] = useState<Project[][] | undefined>([]);

  const { employee } = useAppSelector((store) => store.employee);
  const { quantity, current, slideIndex, prevSlide, nextSlide } =
    useSlider(projects);

  const { data } = useGetAvailableProjectsByEmployeeIdQuery(
    employee?.id as number
  );
  console.log({ data });
  useEffect(() => {
    const getProjects = async () => {
      const response = await ProjectServices.getAll();
      const dividedBy10 = divisorByChunk(response, 10);
      setProjects(dividedBy10);
    };

    getProjects();
  }, []);

  return (
    <Wrapper>
      <Grid>
        {projects
          ? projects[slideIndex]?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          : null}
      </Grid>
      <ControlButtons
        current={current}
        quantity={quantity}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
      />
    </Wrapper>
  );
};

export default EmployeeProjectListItem;
