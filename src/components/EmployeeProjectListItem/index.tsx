import { useEffect, useState } from 'react';

// import { useGetAvailableProjectsByEmployeeIdQuery } from '../../store/apis/employee';
import { Project } from '../../store/apis/employee/types';
import { useSlider } from '../../helpers/hooks/useSlider';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { divisorByChunk } from '../../helpers/divisorByChunk';
import instance from '../../config/axiosConfig';
import ControlButtons from '../ControlButtons';
import Loader from '../Loader';
import ProjectCard from './ProjectCard';
import { Grid, Wrapper } from './styles';

const EmployeeProjectListItem = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[][] | undefined>([]);

  const { employee } = useAppSelector((store) => store.employee);
  const { quantity, current, slideIndex, prevSlide, nextSlide } =
    useSlider(projects);

  // const { data, isLoading, error, isError } = useGetAvailableProjectsByEmployeeIdQuery(
  //   employee?.id as number
  // );
  // console.log(data, employee?.id, isLoading, error, isError);
  useEffect(() => {
    const dividedProjects = async () => {
      setIsLoading(true);
      const response = await instance.get(
        `/project/employee/available-projects/${employee?.id}`
      );
      // console.log(response);
      if (response.data) {
        const dividedBy10 = divisorByChunk(response.data, 10);
        setProjects(dividedBy10);
        setIsLoading(false);
      }
    };

    dividedProjects();
  }, [employee?.id]);

  return (
    <Wrapper>
      {!isLoading ? (
        <>
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
        </>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </Wrapper>
  );
};

export default EmployeeProjectListItem;
