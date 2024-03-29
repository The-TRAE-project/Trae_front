import { Dispatch, SetStateAction } from 'react';

import { FilteredResponse } from '../../../store/apis/types';
import { ProjectShortInfo } from '../../../store/apis/project/types';
import Loader from '../../Loader';
import SliderButtons from '../../SliderButtons';
import ProjectItem from './ProjectItem';
import { Grid, NotFoundTitle, Wrapper } from './styles';

interface Props {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  projects: FilteredResponse<ProjectShortInfo[]> | undefined;
  isNotFoundBySearch?: boolean;
}

const ProjectListItem = ({
  page,
  setPage,
  isLoading,
  projects,
  isNotFoundBySearch,
}: Props) => {
  const prevSlide = () => {
    if (page !== 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const nextSlide = () => {
    if (projects !== undefined && page < projects.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (projects !== undefined && projects.content.length === 0) {
    setPage(0);
  }

  return (
    <Wrapper>
      {!isLoading && !!projects ? (
        <>
          {!isNotFoundBySearch ? (
            <Grid>
              {projects.content.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  isOpOverdue={project.isOverdueByCurrentOperation}
                  isPrOverdue={project.isOverdueByContractDate}
                />
              ))}
            </Grid>
          ) : (
            <NotFoundTitle>Совпадений не найдено!</NotFoundTitle>
          )}

          {projects.totalElements > 10 && (
            <SliderButtons
              current={projects.currentNumberPage + 1}
              quantity={projects.totalPages}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              color="--white"
            />
          )}
        </>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </Wrapper>
  );
};

export default ProjectListItem;
