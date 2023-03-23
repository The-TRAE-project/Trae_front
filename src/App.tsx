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

import { useAppSelector } from './helpers/hooks/useAppSelector';
import { Roles } from './store/slices/auth/types';

const App = () => {
  const { isLoggedIn } = useAppSelector((store) => store.employee);
  const { accessToken, permission } = useAppSelector((store) => store.auth);

  return (
    <Layout>
      <Routes>
        <Route path={Paths.LOGIN} element={<Login />} />
        <Route path="*" element={<Navigate to={Paths.LOGIN} />} />

        {/* Admin routes */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!accessToken && permission === Roles.admin}
              redirectPath={Paths.EMPLOYEE_LOGIN}
            />
          }
        >
          <Route path={Paths.DASHBOARD} element={<Dashboard />} />
        </Route>

        {/* Employee routes */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!accessToken && permission === Roles.employee}
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
