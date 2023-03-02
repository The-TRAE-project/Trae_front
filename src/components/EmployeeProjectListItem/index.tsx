import { useEffect, useState } from 'react';

import { useGetAvailableProjectsByEmployeeIdQuery } from '../../store/apis/employee';
import { Project } from '../../store/apis/employee/types';
import { useSlider } from '../../helpers/hooks/useSlider';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
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

  useEffect(() => {
    const dividedProjects = async () => {
      if (data) {
        const dividedBy10 = divisorByChunk(data, 10);
        setProjects(dividedBy10);
      }
    };

    dividedProjects();
  }, [data]);

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
        color="--white"
      />
    </Wrapper>
  );
};

export default EmployeeProjectListItem;
