import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import { Paths } from './constants/paths';
import Main from './pages/Main';
import Selection from './pages/Selection';
import Projects from './pages/Projects';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={Paths.MAIN} element={<Main />} />
        <Route path={Paths.SELECTION} element={<Selection />} />
        <Route path={Paths.PROJECTS} element={<Projects />} />
        <Route path="*" element={<Navigate to={Paths.MAIN} />} />
      </Routes>
    </Layout>
  );
};

export default App;
