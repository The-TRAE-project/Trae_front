import { useEffect, useState } from 'react';

import { useGetAvailableProjectsByEmployeeIdQuery } from '../../store/apis/employee';
import { Project } from '../../store/apis/employee/types';
import { useSlider } from '../../helpers/hooks/useSlider';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { divisorByChunk } from '../../helpers/divisorByChunk';
import { showErrorNotification } from '../../helpers/showErrorNotification';
import ControlButtons from '../ControlButtons';
import Loader from '../Loader';
import ProjectCard from './ProjectCard';
import { Grid, Wrapper } from './styles';
// TODO:
interface Error {
  data: any;
}

const EmployeeProjectListItem = () => {
  const [projects, setProjects] = useState<Project[][] | undefined>([]);

  const { employee } = useAppSelector((store) => store.employee);
  const { quantity, current, slideIndex, prevSlide, nextSlide } =
    useSlider(projects);

  const { data, isLoading, error, isError } =
    useGetAvailableProjectsByEmployeeIdQuery(employee?.id as number);

  useEffect(() => {
    const dividedProjects = async () => {
      if (data) {
        const dividedBy10 = divisorByChunk(data, 10);
        setProjects(dividedBy10);
      }
    };

    dividedProjects();
  }, [data, employee?.id]);
  // TODO:
  useEffect(() => {
    const showError = () => {
      const err = error as Error;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isError && showErrorNotification(err?.data?.status, err?.data?.error);
    };

    showError();
  }, [isError, error]);

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
