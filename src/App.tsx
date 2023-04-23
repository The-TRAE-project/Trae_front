import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { Paths } from './constants/paths';

import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeMain from './pages/EmployeeMain';
import EmployeeProjects from './pages/EmployeeProjects';
import EmployeeProjectStages from './pages/EmployeeProjectStages';
import EmployeeStagesInWork from './pages/EmployeeStagesInWork';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Constructors from './pages/Constructors';
import CreateConstructor from './pages/CreateConstructor';
import UpdateUser from './pages/UpdateUser';
import Employees from './pages/Employees';
import CreateEmployee from './pages/CreateEmployee';
import WorkTypes from './pages/WorkTypes';
import UpdateWorkType from './pages/UpdateWorkType';
import CreateWorkType from './pages/CreateWorkType';
import UpdateEmployee from './pages/UpdateEmployee';
import PersonalCabinet from './pages/PersonalCabinet';
import PersonalCabinetEditing from './pages/PersonalCabinetEditing';
import PersonalCabinetChangePassword from './pages/PersonalCabinetChangePassword';
import CreateProject from './pages/CreateProject';

import { useAppSelector } from './helpers/hooks/useAppSelector';
import { Roles } from './store/slices/auth/types';

const App = () => {
  const { isLoggedIn } = useAppSelector((store) => store.employee);
  const { permission } = useAppSelector((store) => store.auth);

  return (
    <Layout>
      <Routes>
        <Route path={Paths.LOGIN} element={<Login />} />
        <Route path="*" element={<Navigate to={Paths.LOGIN} replace />} />

        {/* All users */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={
                permission === Roles.ADMIN ||
                permission === Roles.CONSTRUCTOR ||
                permission === Roles.EMPLOYEE
              }
              redirectPath={Paths.LOGIN}
            />
          }
        >
          <Route path={Paths.PERSONAL_CABINET} element={<PersonalCabinet />} />
          <Route
            path={Paths.PERSONAL_CABINET_EDITING}
            element={<PersonalCabinetEditing />}
          />
          <Route
            path={Paths.PERSONAL_CABINET_CHANGE_PASSWORD}
            element={<PersonalCabinetChangePassword />}
          />
        </Route>

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
          <Route path={Paths.PROJECTS} element={<Projects />} />
          <Route path={Paths.PROJECTS_CREATE} element={<CreateProject />} />
          <Route path={Paths.CONSTRUCTORS} element={<Constructors />} />
          <Route
            path={Paths.CONSTRUCTORS_CREATE}
            element={<CreateConstructor />}
          />
          <Route path={Paths.CONSTRUCTORS_EDITING} element={<UpdateUser />} />
          <Route path={Paths.EMPLOYEES} element={<Employees />} />
          <Route path={Paths.EMPLOYEES_CREATE} element={<CreateEmployee />} />
          <Route path={Paths.EMPLOYEES_EDITING} element={<UpdateEmployee />} />
          <Route path={Paths.WORK_TYPES} element={<WorkTypes />} />
          <Route path={Paths.WORK_TYPES_EDITING} element={<UpdateWorkType />} />
          <Route path={Paths.WORK_TYPES_CREATE} element={<CreateWorkType />} />
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
      </Routes>
    </Layout>
  );
};

export default App;
