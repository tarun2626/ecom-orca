import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Overview } from './components/dashboard/Overview';
import { Login } from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout><Outlet /></Layout>}>
              <Route path="/" element={<Overview />} />
              <Route path="/platforms" element={<div className="text-center text-blade-400 mt-20">PLATFORM MONITORING MODULE // COMING SOON</div>} />
              <Route path="/performance" element={<div className="text-center text-blade-400 mt-20">PERFORMANCE METRICS // COMING SOON</div>} />
              <Route path="/cost-ai" element={<div className="text-center text-blade-400 mt-20">AI COST OPTIMIZER // COMING SOON</div>} />
              <Route path="/settings" element={<div className="text-center text-blade-400 mt-20">SYSTEM SETTINGS // COMING SOON</div>} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
