import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Paths } from './constants/paths';
import { useAppSelector } from './helpers/hooks/useAppSelector';
import { Roles } from './store/slices/auth/types';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import FullPageLoader from './components/FullPageLoader';

const EmployeeLogin = lazy(() => import('./pages/EmployeeLogin'));
const EmployeeMain = lazy(() => import('./pages/EmployeeMain'));
const EmployeeProjects = lazy(() => import('./pages/EmployeeProjects'));
const EmployeeProjectStages = lazy(
  () => import('./pages/EmployeeProjectStages')
);
const EmployeeStagesInWork = lazy(() => import('./pages/EmployeeStagesInWork'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const Users = lazy(() => import('./pages/Users'));
const CreateUser = lazy(() => import('./pages/CreateUser'));
const UpdateUser = lazy(() => import('./pages/UpdateUser'));
const Employees = lazy(() => import('./pages/Employees'));
const CreateEmployee = lazy(() => import('./pages/CreateEmployee'));
const WorkTypes = lazy(() => import('./pages/WorkTypes'));
const UpdateWorkType = lazy(() => import('./pages/UpdateWorkType'));
const CreateWorkType = lazy(() => import('./pages/CreateWorkType'));
const UpdateEmployee = lazy(() => import('./pages/UpdateEmployee'));
const PersonalCabinet = lazy(() => import('./pages/PersonalCabinet'));
const PersonalCabinetEditing = lazy(
  () => import('./pages/PersonalCabinetEditing')
);
const PersonalCabinetChangePassword = lazy(
  () => import('./pages/PersonalCabinetChangePassword')
);
const CreateProject = lazy(() => import('./pages/CreateProject'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const ProjectStage = lazy(() => import('./pages/ProjectStage'));
const ProjectUpdateGeneralInfo = lazy(
  () => import('./pages/ProjectUpdateGeneralInfo')
);
const ProjectUpdateEndDate = lazy(() => import('./pages/ProjectUpdateEndDate'));
const ProjectDelete = lazy(() => import('./pages/ProjectDelete'));
const ProjectInsertNewStage = lazy(
  () => import('./pages/ProjectInsertNewStage')
);
const ProjectNewStage = lazy(() => import('./pages/ProjectNewStage'));
const Reports = lazy(() => import('./pages/Reports'));
const ReportsByEmployees = lazy(() => import('./pages/ReportsByEmployees'));
const ReportsByProjects = lazy(() => import('./pages/ReportsByProjects'));
const ReportsByDeadlines = lazy(() => import('./pages/ReportsByDeadlines'));

const ConstructorMainPage = lazy(() => import('./pages/ConstructorMainPage'));

const App = () => {
  const { isLoggedIn } = useAppSelector((store) => store.employee);
  const { permission } = useAppSelector((store) => store.auth);

  return (
    <Layout>
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          <Route path={Paths.LOGIN} element={<Login />} />
          <Route path="*" element={<Navigate to={Paths.LOGIN} replace />} />

          {/* Admin routes */}
          <Route
            element={
              <ProtectedRoute
                isAllowed={permission === Roles.ADMIN}
                redirectPath={Paths.LOGIN}
              />
            }
          >
            <Route path={Paths.DASHBOARD} element={<Dashboard />} />
            {/* Reports routes */}
            <Route path={Paths.REPORTS} element={<Reports />} />
            <Route
              path={Paths.REPORTS_BY_EMPLOYEES}
              element={<ReportsByEmployees />}
            />
            <Route
              path={Paths.REPORTS_BY_PROJECTS}
              element={<ReportsByProjects />}
            />
            <Route
              path={Paths.REPORTS_BY_DEADLINES}
              element={<ReportsByDeadlines />}
            />

            <Route
              path={Paths.REPORTS_BY_PROJECTS_PROJECT_DETAILS}
              element={<ProjectDetails />}
            />
            <Route
              path={Paths.REPORTS_BY_PROJECTS_PROJECT_STAGE}
              element={<ProjectStage />}
            />
            <Route
              path={Paths.REPORTS_BY_PROJECTS_PROJECT_EDIT_GENERAL_INFO}
              element={<ProjectUpdateGeneralInfo />}
            />
            <Route
              path={Paths.REPORTS_BY_PROJECTS_PROJECT_EDIT_END_DATE}
              element={<ProjectUpdateEndDate />}
            />
            <Route
              path={Paths.REPORTS_BY_PROJECTS_PROJECT_DELETE}
              element={<ProjectDelete />}
            />
            <Route
              path={Paths.REPORTS_BY_PROJECTS_PROJECT_NEW_STAGE}
              element={<ProjectNewStage />}
            />
            <Route
              path={Paths.REPORTS_BY_PROJECTS_PROJECT_INSERT_NEW_STAGE}
              element={<ProjectInsertNewStage />}
            />

            {/* Project routes */}
            <Route path={Paths.PROJECTS} element={<Projects />} />
            <Route path={Paths.PROJECT_CREATE} element={<CreateProject />} />
            <Route path={Paths.PROJECT_DETAILS} element={<ProjectDetails />} />
            <Route path={Paths.PROJECT_STAGE} element={<ProjectStage />} />
            <Route
              path={Paths.PROJECT_EDIT_GENERAL_INFO}
              element={<ProjectUpdateGeneralInfo />}
            />
            <Route
              path={Paths.PROJECT_EDIT_END_DATE}
              element={<ProjectUpdateEndDate />}
            />
            <Route path={Paths.PROJECT_DELETE} element={<ProjectDelete />} />
            <Route
              path={Paths.PROJECT_NEW_STAGE}
              element={<ProjectNewStage />}
            />
            <Route
              path={Paths.PROJECT_INSERT_NEW_STAGE}
              element={<ProjectInsertNewStage />}
            />
            {/* Office routes */}
            <Route path={Paths.OFFICE} element={<Users />} />
            <Route path={Paths.OFFICE_CREATE} element={<CreateUser />} />
            <Route path={Paths.OFFICE_EDITING} element={<UpdateUser />} />
            {/* Employee routes */}
            <Route path={Paths.EMPLOYEES} element={<Employees />} />
            <Route path={Paths.EMPLOYEE_CREATE} element={<CreateEmployee />} />
            <Route path={Paths.EMPLOYEE_EDITING} element={<UpdateEmployee />} />
            {/* Work Type routes  */}
            <Route path={Paths.WORK_TYPES} element={<WorkTypes />} />
            <Route
              path={Paths.WORK_TYPE_EDITING}
              element={<UpdateWorkType />}
            />
            <Route path={Paths.WORK_TYPE_CREATE} element={<CreateWorkType />} />
            {/* Personal Cabinet routes */}
            <Route
              path={Paths.PERSONAL_CABINET}
              element={<PersonalCabinet />}
            />
            <Route
              path={Paths.PERSONAL_CABINET_EDITING}
              element={<PersonalCabinetEditing />}
            />
            <Route
              path={Paths.PERSONAL_CABINET_CHANGE_PASSWORD}
              element={<PersonalCabinetChangePassword />}
            />
          </Route>

          {/* Employee routes */}
          <Route
            element={
              <ProtectedRoute
                isAllowed={permission === Roles.EMPLOYEE}
                redirectPath={Paths.LOGIN}
              />
            }
          >
            <Route path={Paths.EMPLOYEE_LOGIN} element={<EmployeeLogin />} />
            <Route
              element={
                <ProtectedRoute
                  isAllowed={isLoggedIn}
                  redirectPath={Paths.EMPLOYEE_LOGIN}
                />
              }
            >
              <Route path={Paths.EMPLOYEE_MAIN} element={<EmployeeMain />} />
              <Route
                path={Paths.EMPLOYEE_PROJECTS}
                element={<EmployeeProjects />}
              />
              <Route
                path={Paths.EMPLOYEE_PROJECT_STAGES}
                element={<EmployeeProjectStages />}
              />
              <Route
                path={Paths.EMPLOYEE_STAGES_IN_WORK}
                element={<EmployeeStagesInWork />}
              />
            </Route>
          </Route>

          {/* Constructor routes */}
          <Route
            element={
              <ProtectedRoute
                isAllowed={permission === Roles.CONSTRUCTOR}
                redirectPath={Paths.LOGIN}
              />
            }
          >
            <Route
              path={Paths.CONSTRUCTOR_MAIN_PAGE}
              element={<ConstructorMainPage />}
            />
            <Route
              path={Paths.CONSTRUCTOR_CREATE_PROJECT}
              element={<CreateProject />}
            />

            <Route
              path={Paths.CONSTRUCTOR_PERSONAL_CABINET}
              element={<PersonalCabinet />}
            />
            <Route
              path={Paths.CONSTRUCTOR_PERSONAL_CABINET_EDITING}
              element={<PersonalCabinetEditing />}
            />
            <Route
              path={Paths.CONSTRUCTOR_PERSONAL_CABINET_CHANGE_PASSWORD}
              element={<PersonalCabinetChangePassword />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
