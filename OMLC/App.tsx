import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import LawyerDetailPage from './pages/LawyerDetailPage';
import AuthPage from './pages/AuthPage'; // Added
import ManageProfilePage from './pages/ManageProfilePage'; // Added
import ProtectedRoute from './components/auth/ProtectedRoute'; // Added
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/auth" element={<AuthPage />} /> {/* Auth page */}
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/manage-profile" element={<ManageProfilePage />} />
                {/* Add other protected routes here if needed */}
              </Route>

              {/* ID for lawyers will be their UID from Firestore */}
              <Route path="/lawyer/:id" element={<LawyerDetailPage profileType="lawyer" />} />
              <Route path="/firm/:id" element={<LawyerDetailPage profileType="firm" />} /> {/* Firms are still mock for now */}
              
              <Route path="*" element={<Navigate to="/" replace />} /> {/* Fallback route */}
            </Routes>
          </Layout>
        </HashRouter>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
