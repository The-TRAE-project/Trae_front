import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, Stack } from '@mantine/core';
import { useLocalStorage, useDebouncedValue } from '@mantine/hooks';
import { BsFillHouseFill } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';

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
import {
  Container,
  OrangeButton,
  UnstyledButton,
  WrapperGradientGreen,
} from '../../components/styles';

const Projects = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debounced] = useDebouncedValue(searchValue, 200);
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
  const [paramIsCurrentOverdue, setParamIsCurrentOverdue] =
    useLocalStorage<boolean>({
      key: LocalStorage.PROJECT_FILTER_IS_CURRENT_OVERDUE,
      defaultValue: false,
    });

  const { data: findProjectsBySearch, isLoading: isSearchLoading } =
    useSearchProjectsQuery(
      {
        elementPerPage: `&elementPerPage=${10}`,
        page: `&page=${searchPage}`,
        projectNumberOrCustomer: `&projectNumberOrCustomer=${debounced}`,
      },
      {
        skip: !debounced,
      }
    );

  const { data: findProjectsByFilter, isLoading: isFilterLoading } =
    useGetProjectsQuery({
      elementPerPage: `&elementPerPage=${10}`,
      page: `&page=${searchPage}`,
      isEnded: paramIsEnded ? `&isEnded=${paramIsEnded}` : '',
      isOnlyFirstOpWithoutAcceptance: paramIsFirstNoAcceptance
        ? `&isOnlyFirstOpWithoutAcceptance=${paramIsFirstNoAcceptance}`
        : '',
      isOnlyLastOpInWork: paramIsLastInWork
        ? `&isOnlyLastOpInWork=${paramIsLastInWork}`
        : '',
      isOverdueCurrentOpInProject: paramIsCurrentOverdue
        ? `&isOverdueCurrentOpInProject=${paramIsCurrentOverdue}`
        : '',
    });
  // TODO:
  const resetFilterParams = () => {
    setParamIsEnded(false);
    setParamIsFirstNoAcceptance(false);
    setParamIsLastInWork(false);
    setParamIsCurrentOverdue(false);
  };
  // TODO:
  const handleSetIsEnded = () => {
    setParamIsEnded(true);
    setParamIsFirstNoAcceptance(false);
    setParamIsLastInWork(false);
    setParamIsCurrentOverdue(false);
  };
  // TODO:
  const handleSetIsFirstNoAcceptance = () => {
    setParamIsFirstNoAcceptance(true);
    setParamIsEnded(false);
    setParamIsLastInWork(false);
    setParamIsCurrentOverdue(false);
  };
  // TODO:
  const handleSetIsLastInWork = () => {
    setParamIsLastInWork(true);
    setParamIsFirstNoAcceptance(false);
    setParamIsEnded(false);
    setParamIsCurrentOverdue(false);
  };
  // TODO:
  const handleSetIsCurrentOverdue = () => {
    setParamIsLastInWork(false);
    setParamIsFirstNoAcceptance(false);
    setParamIsEnded(false);
    setParamIsCurrentOverdue(true);
  };

  const navigateToHome = () => navigate(Paths.DASHBOARD);
  const navigateToCreateProjectPage = () => navigate(Paths.PROJECT_CREATE);

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
            <Group position="apart" spacing={100}>
              <Group spacing={40}>
                <ProjectFilterMenu
                  isEnded={paramIsEnded}
                  setIsEnded={handleSetIsEnded}
                  isFirstNoAcceptance={paramIsFirstNoAcceptance}
                  setIsFirstNoAcceptance={handleSetIsFirstNoAcceptance}
                  isLastInWork={paramIsLastInWork}
                  setIsLastInWork={handleSetIsLastInWork}
                  isCurrentOverdue={paramIsCurrentOverdue}
                  setParamIsCurrentOverdue={handleSetIsCurrentOverdue}
                  reset={resetFilterParams}
                />
                <UnstyledButton onClick={navigateToHome} type="button">
                  <BsFillHouseFill size={44} color="var(--orange)" />
                </UnstyledButton>
              </Group>

              <ProjectSearchInput
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />

              <OrangeButton onClick={navigateToCreateProjectPage} type="button">
                <AiOutlinePlusCircle size={30} color="var(--white)" />
                <span>Добавить</span>
              </OrangeButton>
            </Group>

            {debounced ? (
              <ProjectListItem
                page={searchPage}
                setPage={setSearchPage}
                isLoading={isSearchLoading}
                projects={findProjectsBySearch}
              />
            ) : (
              <ProjectListItem
                page={filterPage}
                setPage={setFilterPage}
                isLoading={isFilterLoading}
                projects={findProjectsByFilter}
              />
            )}
          </Stack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default Projects;
