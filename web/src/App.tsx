import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ScrollToTop } from './components/ScrollToTop';
import { Loading } from './components/Loading';

// Layouts
import { MainLayout } from './components/layouts/MainLayout';
import { AdminLayout } from './components/layouts/AdminLayout';

// Static Pages (Always required on entry)
import { HomePage } from './pages/HomePage';

// Lazy Loaded Pages
const ProjectPropertiesPage = React.lazy(() => import('./pages/ProjectPropertiesPage').then(module => ({ default: module.ProjectPropertiesPage })));
const LoginPage = React.lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const AdminLoginPage = React.lazy(() => import('./pages/AdminLoginPage').then(module => ({ default: module.AdminLoginPage })));
const PropertyDetailsPage = React.lazy(() => import('./pages/PropertyDetailsPage').then(module => ({ default: module.PropertyDetailsPage })));
const BookingPage = React.lazy(() => import('./pages/BookingPage').then(module => ({ default: module.BookingPage })));
const UserDashboard = React.lazy(() => import('./pages/UserDashboard').then(module => ({ default: module.UserDashboard })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));
const TermsConditionsPage = React.lazy(() => import('./pages/TermsConditionsPage').then(module => ({ default: module.TermsConditionsPage })));
const FounderPage = React.lazy(() => import('./pages/FounderPage').then(module => ({ default: module.FounderPage })));
const SEOLandingPage = React.lazy(() => import('./pages/SEOLandingPage').then(module => ({ default: module.SEOLandingPage })));

// Lazy Loaded Admin Pages
const AdminOverview = React.lazy(() => import('./pages/admin/AdminOverview').then(module => ({ default: module.AdminOverview })));
const AdminProjects = React.lazy(() => import('./pages/admin/AdminProjects').then(module => ({ default: module.AdminProjects })));
const AdminProperties = React.lazy(() => import('./pages/admin/AdminProperties').then(module => ({ default: module.AdminProperties })));
const AdminPricingRules = React.lazy(() => import('./pages/admin/AdminPricingRules').then(module => ({ default: module.AdminPricingRules })));
const AdminBookings = React.lazy(() => import('./pages/admin/AdminBookings').then(module => ({ default: module.AdminBookings })));
const AdminTenants = React.lazy(() => import('./pages/admin/AdminTenants').then(module => ({ default: module.AdminTenants })));
const AdminReports = React.lazy(() => import('./pages/admin/AdminReports').then(module => ({ default: module.AdminReports })));
const AdminSettings = React.lazy(() => import('./pages/admin/AdminSettings').then(module => ({ default: module.AdminSettings })));
const AdminAbout = React.lazy(() => import('./pages/admin/AdminAbout').then(module => ({ default: module.AdminAbout })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Loading fullScreen={false} size="lg" />}>
          <Routes>
            {/* Main Tenant / Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/founder" element={<FounderPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-conditions" element={<TermsConditionsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/properties" element={<HomePage />} />
              <Route path="/projects/:projectName/:type" element={<ProjectPropertiesPage />} />
              
              {/* SEO Landing Pages */}
              <Route path="/flats-for-rent-whitefield" element={<SEOLandingPage />} />
              <Route path="/1bhk-whitefield" element={<SEOLandingPage />} />
              <Route path="/commercial-shops-whitefield" element={<SEOLandingPage />} />
              <Route path="/rental-properties-bangalore" element={<SEOLandingPage />} />
              
              {/* Public Property Details */}
              <Route path="/properties/:id" element={<PropertyDetailsPage />} />

              {/* Protected User Routes */}
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminLayout />}>
              <Route path="/login/admin" element={<AdminLoginPage />} />
              
              {/* Protected Admin Routes Wrapper */}
              <Route element={<ProtectedRoute requireAdmin><Outlet /></ProtectedRoute>}>
                <Route path="/admin" element={<AdminOverview />} />
                <Route path="/admin/projects" element={<AdminProjects />} />
                <Route path="/admin/properties" element={<AdminProperties />} />
                <Route path="/admin/pricing-rules" element={<AdminPricingRules />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/tenants" element={<AdminTenants />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/about" element={<AdminAbout />} />
              </Route>
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #d4af37',
            },
            success: {
              iconTheme: {
                primary: '#d4af37',
                secondary: '#000',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
