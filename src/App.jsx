import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ModelPage from './pages/ModelPage';
import ARPage from './pages/ARPage';
import FactsPage from './pages/FactsPage';
import ToolsPage from './pages/ToolsPage';
import WayOfLifePage from './pages/WayOfLifePage';
import NavBar from './components/NavBar';

function AppContent() {
  const location = useLocation();

  const backgroundImage = location.pathname === '/model'
    ? `${import.meta.env.BASE_URL}images/background2.png`
    : `${import.meta.env.BASE_URL}images/background.png`;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/model" element={<ModelPage />} />
        <Route path="/ar" element={<ARPage />} />
        <Route path="/facts" element={<FactsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/way-of-life" element={<WayOfLifePage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
