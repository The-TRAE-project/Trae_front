import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import { Paths } from './constants/paths';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeMain from './pages/EmployeeMain';
import EmployeeSelection from './pages/EmployeeSelection';
import EmployeeProjects from './pages/EmployeeProjects';
import EmployeeProjectStages from './pages/EmployeeProjectStages';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={Paths.EMPLOYEE_LOGIN} element={<EmployeeLogin />} />
        <Route path={Paths.EMPLOYEE_MAIN} element={<EmployeeMain />} />
        <Route
          path={Paths.EMPLOYEE_SELECTION}
          element={<EmployeeSelection />}
        />
        <Route path={Paths.EMPLOYEE_PROJECTS} element={<EmployeeProjects />} />
        <Route
          path={Paths.EMPLOYEE_PROJECT_STAGES}
          element={<EmployeeProjectStages />}
        />
        <Route path="*" element={<Navigate to={Paths.EMPLOYEE_LOGIN} />} />
      </Routes>
    </Layout>
  );
};

export default App;
