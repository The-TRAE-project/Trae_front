import { useEffect, useState } from 'react';

import { useSlider } from '../../helpers/hooks/useSlider';
import { ProjectServices } from '../../helpers/services/projectServices';
import { Project } from '../../helpers/services/types';
import { divisorByChunk } from '../../helpers/divisorByChunk';
import ControlButtons from '../ControlButtons';
import ProjectCard from '../ProjectListItem/ProjectCard';
import { Grid, Wrapper } from './styles';

const EmployeeProjectListItem = () => {
  const [projects, setProjects] = useState<Project[][] | undefined>([]);
  const { quantity, current, slideIndex, prevSlide, nextSlide } =
    useSlider(projects);

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
