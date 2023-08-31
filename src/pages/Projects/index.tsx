import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import {
  useGetProjectsQuery,
  useSearchProjectsQuery,
} from '../../store/apis/project';
import { Paths } from '../../constants/paths';
import { LocalStorage } from '../../constants/localStorage';
import SEO from '../../components/SEO';
import ProjectFilterMenu from '../../components/Project/ProjectFilterMenu';
import ProjectSearchInput from '../../components/Project/ProjectSearchInput';
import ProjectListItem from '../../components/Project/ProjectListItem';
import PageHeader from '../../components/PageHeader';
import { Container, WrapperGradientGreen } from '../../components/styles';

const Projects = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const navigate = useNavigate();

  const [searchPage, setSearchPage] = useLocalStorage<number>({
    key: LocalStorage.PROJECT_SEARCH_PAGE,
    defaultValue: 0,
  });

  const [filterPage, setFilterPage] = useLocalStorage<number>({
    key: LocalStorage.PROJECT_FILTER_PAGE,
    defaultValue: 0,
  });
  const [paramIsEnded, setParamIsEnded] = useLocalStorage<boolean>({
    key: LocalStorage.PROJECT_FILTER_IS_ENDED,
    defaultValue: false,
  });
  const [paramIsFirstNoAcceptance, setParamIsFirstNoAcceptance] =
    useLocalStorage<boolean>({
      key: LocalStorage.PROJECT_FILTER_IS_NOT_ACCEPTANCE,
      defaultValue: false,
    });
  const [paramIsLastInWork, setParamIsLastInWork] = useLocalStorage<boolean>({
    key: LocalStorage.PROJECT_FILTER_IS_LAST_IN_WORK,
    defaultValue: false,
  });
  const [paramIsCurrentOpOverdue, setParamIsCurrentOpOverdue] =
    useLocalStorage<boolean>({
      key: LocalStorage.PROJECT_FILTER_IS_CURRENT_OP_OVERDUE,
      defaultValue: false,
    });
  const [paramIsCurrentPrOverdue, setParamIsCurrentPrOverdue] =
    useLocalStorage<boolean>({
      key: LocalStorage.PROJECT_FILTER_IS_CURRENT_PR_OVERDUE,
      defaultValue: false,
    });
  const [paramIsCurrentInWork, setParamIsCurrentInWork] =
    useLocalStorage<boolean>({
      key: LocalStorage.PROJECT_FILTER_IS_CURRENT_IN_WORK,
      defaultValue: false,
    });
  const [paramInWorkAll, setParamInWorkAll] = useLocalStorage<boolean>({
    key: LocalStorage.PROJECT_FILTER_IN_WORK_ALL,
    defaultValue: true,
  });

  const { data: findProjectsBySearch, isLoading: isSearchLoading } =
    useSearchProjectsQuery(
      {
        elementPerPage: `&elementPerPage=${10}`,
        page: `&page=${searchPage}`,
        projectNumberOrCustomer: `&projectNumberOrCustomer=${searchValue}`,
      },
      {
        skip: !searchValue,
      }
    );

  const isDisabledEndedParam =
    paramIsCurrentOpOverdue ||
    paramIsFirstNoAcceptance ||
    paramIsCurrentPrOverdue ||
    paramIsCurrentInWork ||
    paramIsLastInWork ||
    paramIsEnded;

  const pageQueryParam = searchValue === '' ? filterPage : searchPage;
  const { data: findProjectsByFilter, isLoading: isFilterLoading } =
    useGetProjectsQuery({
      elementPerPage: `&elementPerPage=${10}`,
      page: `&page=${pageQueryParam}`,
      isEnded:
        isDisabledEndedParam || paramInWorkAll
          ? `&isEnded=${paramIsEnded}`
          : '',
      isOverdueCurrentOpInProject: paramIsCurrentOpOverdue
        ? `&isOverdueCurrentOpInProject=${paramIsCurrentOpOverdue}`
        : '',
      isOnlyFirstOpReadyToAcceptance: paramIsFirstNoAcceptance // TODO wrong name
        ? `&isOnlyFirstOpReadyToAcceptance=${paramIsFirstNoAcceptance}`
        : '',
      isOnlyLastOpReadyToAcceptance: paramIsLastInWork // TODO wrong name
        ? `&isOnlyLastOpReadyToAcceptance=${paramIsLastInWork}`
        : '',
      isOverdueProject: paramIsCurrentPrOverdue
        ? `&isOverdueProject=${paramIsCurrentPrOverdue}`
        : '',
      isCurrentOpInWorkOrReadyToAcceptance: paramIsCurrentInWork
        ? `&isCurrentOpInWorkOrReadyToAcceptance=${paramIsCurrentInWork}`
        : '',
    });
  // TODO:
  const resetFilterParams = () => {
    setParamInWorkAll(false);
    setParamIsEnded(false);
    setParamIsFirstNoAcceptance(false);
    setParamIsLastInWork(false);
    setParamIsCurrentOpOverdue(false);
    setParamIsCurrentPrOverdue(false);
    setParamIsCurrentInWork(false);
  };
  // TODO:
  const handleSetIsEnded = () => {
    setParamIsEnded(true);
    setParamIsFirstNoAcceptance(false);
    setParamIsLastInWork(false);
    setParamIsCurrentOpOverdue(false);
    setParamIsCurrentPrOverdue(false);
    setParamIsCurrentInWork(false);
    setParamInWorkAll(false);
  };
  // TODO:
  const handleSetIsFirstNoAcceptance = () => {
    setParamIsFirstNoAcceptance(true);
    setParamIsEnded(false);
    setParamIsLastInWork(false);
    setParamIsCurrentOpOverdue(false);
    setParamIsCurrentPrOverdue(false);
    setParamIsCurrentInWork(false);
    setParamInWorkAll(false);
  };
  // TODO:
  const handleSetIsLastInWork = () => {
    setParamIsLastInWork(true);
    setParamIsFirstNoAcceptance(false);
    setParamIsEnded(false);
    setParamIsCurrentOpOverdue(false);
    setParamIsCurrentPrOverdue(false);
    setParamIsCurrentInWork(false);
    setParamInWorkAll(false);
  };
  // TODO:
  const handleSetIsCurrentOpOverdue = () => {
    setParamIsCurrentOpOverdue(true);
    setParamIsLastInWork(false);
    setParamIsFirstNoAcceptance(false);
    setParamIsEnded(false);
    setParamIsCurrentPrOverdue(false);
    setParamIsCurrentInWork(false);
    setParamInWorkAll(false);
  };
  // TODO:
  const handleSetIsCurrentPrOverdue = () => {
    setParamIsCurrentPrOverdue(true);
    setParamIsCurrentOpOverdue(false);
    setParamIsLastInWork(false);
    setParamIsFirstNoAcceptance(false);
    setParamIsEnded(false);
    setParamIsCurrentInWork(false);
    setParamInWorkAll(false);
  };
  // TODO:
  const handleSetIsCurrentInWork = () => {
    setParamIsCurrentInWork(true);
    setParamIsCurrentPrOverdue(false);
    setParamIsCurrentOpOverdue(false);
    setParamIsLastInWork(false);
    setParamIsFirstNoAcceptance(false);
    setParamIsEnded(false);
    setParamInWorkAll(false);
  };

  const selectAllInWork = () => {
    setParamInWorkAll(true);
    setParamIsCurrentInWork(false);
    setParamIsCurrentPrOverdue(false);
    setParamIsCurrentOpOverdue(false);
    setParamIsLastInWork(false);
    setParamIsFirstNoAcceptance(false);
    setParamIsEnded(false);
  };

  const clearSearchInput = () => {
    if (searchValue) {
      setSearchValue('');
    }
  };

  const clearFilterParams = () => {
    if (
      paramIsFirstNoAcceptance ||
      paramIsEnded ||
      paramIsCurrentOpOverdue ||
      paramIsLastInWork ||
      paramIsCurrentPrOverdue ||
      paramIsCurrentInWork ||
      filterPage ||
      paramInWorkAll
    ) {
      resetFilterParams();
    }
  };

  const navigateToCreateProjectPage = () => navigate(Paths.PROJECT_CREATE);

  const isNotFoundBySearch = !(
    (findProjectsBySearch?.content.length as number) > 0
  );

  return (
    <>
      <SEO
        title="TRAE | Проекты"
        description="Страница проектов."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <Stack spacing={87}>
            <PageHeader
              filter={
                <ProjectFilterMenu
                  onClearInput={clearSearchInput}
                  isEnded={paramIsEnded}
                  setIsEnded={handleSetIsEnded}
                  isFirstNoAcceptance={paramIsFirstNoAcceptance}
                  setIsFirstNoAcceptance={handleSetIsFirstNoAcceptance}
                  isLastInWork={paramIsLastInWork}
                  setIsLastInWork={handleSetIsLastInWork}
                  isCurrentOpOverdue={paramIsCurrentOpOverdue}
                  setIsCurrentOpOverdue={handleSetIsCurrentOpOverdue}
                  isCurrentPrOverdue={paramIsCurrentPrOverdue}
                  setIsCurrentPrOverdue={handleSetIsCurrentPrOverdue}
                  isCurrentInWork={paramIsCurrentInWork}
                  setIsCurrentInWork={handleSetIsCurrentInWork}
                  reset={resetFilterParams}
                  onEnded={selectAllInWork}
                  isAllInWork={paramInWorkAll}
                />
              }
              input={
                <ProjectSearchInput
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onClearFilter={clearFilterParams}
                />
              }
              onCreate={navigateToCreateProjectPage}
            />

            {searchValue ? (
              <ProjectListItem
                page={searchPage}
                setPage={setSearchPage}
                isLoading={isSearchLoading}
                projects={findProjectsBySearch}
                isNotFoundBySearch={isNotFoundBySearch}
              />
            ) : (
              <ProjectListItem
                page={filterPage}
                setPage={setFilterPage}
                isLoading={isFilterLoading}
                projects={findProjectsByFilter}
                isOpOverdue={paramIsCurrentOpOverdue}
                isPrOverdue={paramIsCurrentPrOverdue}
              />
            )}
          </Stack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default Projects;
