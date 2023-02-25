import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import { Paths } from './constants/paths';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeMain from './pages/EmployeeMain';
import EmployeeSelection from './pages/EmployeeSelection';
import EmployeeProjects from './pages/EmployeeProjects';
import EmployeeProjectStages from './pages/EmployeeProjectStages';
import ProtectedRoute from './components/ProtectedRoute';

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
            path={Paths.EMPLOYEE_SELECTION}
            element={<EmployeeSelection />}
          />
          <Route
            path={Paths.EMPLOYEE_PROJECTS}
            element={<EmployeeProjects />}
          />
          <Route
            path={Paths.EMPLOYEE_PROJECT_STAGES}
            element={<EmployeeProjectStages />}
          />
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
