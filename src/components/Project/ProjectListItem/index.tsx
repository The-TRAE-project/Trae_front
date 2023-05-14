import { useLocalStorage } from '@mantine/hooks';

import { useGetProjectsQuery } from '../../../store/apis/project';
import { LocalStorage } from '../../../constants/localStorage';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import Loader from '../../Loader';
import SliderButtons from '../../SliderButtons';
import ProjectItem from './ProjectItem';
import { Grid, Wrapper } from './styles';

interface Props {
  paramIsEnded: any;
  paramIsOnlyFirstOpWithoutAcceptance: any;
  paramIsOnlyLastOpInWork: any;
  paramIsOverdueCurrentOpInProject: any;
}

const ProjectListItem = ({
  paramIsEnded,
  paramIsOnlyFirstOpWithoutAcceptance,
  paramIsOnlyLastOpInWork,
  paramIsOverdueCurrentOpInProject,
}: Props) => {
  const [page, setPage] = useLocalStorage<number>({
    key: LocalStorage.USER_PAGE,
    defaultValue: 0,
  });

  const {
    data: projects,
    error,
    isError,
    isLoading,
  } = useGetProjectsQuery({
    elementPerPage: `&elementPerPage=${10}`,
    page: `&page=${page}`,
    isEnded: paramIsEnded ? `&isEnded=${paramIsEnded}` : '',
    isOnlyFirstOpWithoutAcceptance: paramIsOnlyFirstOpWithoutAcceptance
      ? `&isOnlyFirstOpWithoutAcceptance=${paramIsOnlyFirstOpWithoutAcceptance}`
      : '',
    isOnlyLastOpInWork: paramIsOnlyLastOpInWork
      ? `&isOnlyLastOpInWork=${paramIsOnlyLastOpInWork}`
      : '',
    isOverdueCurrentOpInProject: paramIsOverdueCurrentOpInProject
      ? `&isOverdueCurrentOpInProject=${paramIsOverdueCurrentOpInProject}`
      : '',
  });

  useDisplayError(error, isError);

  const prevSlide = () => {
    if (page !== 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const nextSlide = () => {
    if (page + 1 !== projects?.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <Wrapper>
      {!isLoading && !!projects ? (
        <>
          <Grid>
            {projects.content.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </Grid>

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
