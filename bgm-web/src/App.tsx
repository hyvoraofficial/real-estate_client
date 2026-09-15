import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from './components/layouts/MainLayout';
import { AdminLayout } from './components/layouts/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { CategoryPropertiesPage } from './pages/CategoryPropertiesPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TermsConditionsPage } from './pages/TermsConditionsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { FloatingActions } from './components/FloatingActions';

// Admin Pages
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProperties } from './pages/admin/AdminProperties';
import { AdminPropertyForm } from './pages/admin/AdminPropertyForm';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminSettings } from './pages/admin/AdminSettings';
import { useSettingsStore } from './store/useSettingsStore';

export const App: React.FC = () => {
  const { loadSettings } = useSettingsStore();

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#4a0b12',
            color: '#FAF9F6',
            fontSize: '13px',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
          },
        }}
      />
      
      {/* Global Floating Action Buttons for Call and WhatsApp */}
      <FloatingActions />

      <Routes>
        {/* Public Routes wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          
          {/* Explicit Category Routes */}
          <Route path="/properties/category/:category" element={<CategoryPropertiesPage />} />
          <Route path="/properties/buildings" element={<CategoryPropertiesPage />} />
          <Route path="/properties/commercial" element={<CategoryPropertiesPage />} />
          <Route path="/properties/residential" element={<CategoryPropertiesPage />} />
          <Route path="/properties/sites" element={<CategoryPropertiesPage />} />
          <Route path="/properties/land" element={<CategoryPropertiesPage />} />
          <Route path="/properties/other" element={<CategoryPropertiesPage />} />
          
          {/* Property Detail Routes */}
          <Route path="/properties/:slug" element={<PropertyDetailsPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsConditionsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
        </Route>

        {/* Admin Authentication */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin Management System (Protected) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="properties/new" element={<AdminPropertyForm />} />
          <Route path="properties/:id/edit" element={<AdminPropertyForm />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Fallback Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

