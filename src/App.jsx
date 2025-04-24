// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ModelPage from './pages/ModelPage';
import ARPage from './pages/ARPage';
import FactsPage from './pages/FactsPage';
import ToolsPage from './pages/ToolsPage';
import WayOfLifePage from './pages/WayOfLifePage';
import NavBar from './components/NavBar';

const isProduction = import.meta.env.MODE === 'production';
const repoName = 'project-3d-reconstructie-van-een-mesolithische-vrouw-mohamadmatar7';

function App() {
  return (
    <Router basename={isProduction ? `/${repoName}` : '/'}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/model" element={<ModelPage />} />
        <Route path="/ar" element={<ARPage />} />
        <Route path="/facts" element={<FactsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/way-of-life" element={<WayOfLifePage />} />
      </Routes>
    </Router>
  );
}

export default App;
