import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { Paths } from './constants/paths';

import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeMain from './pages/EmployeeMain';
import EmployeeProjects from './pages/EmployeeProjects';
import EmployeeProjectStages from './pages/EmployeeProjectStages';
import EmployeeStagesInWork from './pages/EmployeeStagesInWork';

import { useAppSelector } from './helpers/hooks/useAppSelector';

const App = () => {
  const { isLoggedIn } = useAppSelector((store) => store.employee);

  return (
    <Layout>
      <Routes>
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
      </Routes>
    </Layout>
  );
};

export default App;
