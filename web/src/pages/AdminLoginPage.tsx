import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { Card } from '../components/Card';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// Use the VITE_GOOGLE_CLIENT_ID from environment variables
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse.credential) {
      toast.error('Google login failed. No credential received.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.adminGoogleLogin(credentialResponse.credential);
      if (response.success && response.token && response.user) {
        login(response.token, response.user);
        toast.success('Admin login successful!');
        navigate('/admin');
      } else {
        toast.error(response.message || 'Admin login failed');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Admin login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="min-h-screen bg-dark flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <KeyRound size={32} className="text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">🔐 Admin Console</h1>
            <p className="text-grey-light"><span className="brand-text text-sm">HYVORA Property Management</span> • Administration</p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Quick Demo Access Card */}
            <div className="w-full bg-gradient-to-r from-primary/15 via-primary/5 to-transparent border border-primary/30 p-4 rounded-xl text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Demo Evaluation Mode</span>
                <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-semibold">HYVORA DEMO</span>
              </div>
              <p className="text-xs text-gray-300 mb-3">
                Evaluating the PMS software? Click below for instant one-click access to the Property Administrator dashboard.
              </p>
              <button
                type="button"
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    const response = await authService.adminLogin({ username: 'admin@hyvora.in', password: 'demo123' });
                    if (response.success && response.token && response.user) {
                      login(response.token, response.user);
                      toast.success('Signed in as Property Administrator');
                      navigate('/admin');
                      return;
                    }
                  } catch (err) {
                    // Fallback to local demo session if backend offline
                  }
                  const demoUser: any = {
                    id: 'hyvora-admin-demo',
                    name: 'Property Administrator',
                    phone: '8217512581',
                    role: 'admin',
                    email: 'admin@hyvora.in',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  };
                  login('hyvora-demo-admin-token', demoUser);
                  toast.success('Signed in as Property Administrator (Demo)');
                  navigate('/admin');
                }}
                className="w-full bg-primary hover:bg-primary-light text-dark font-bold py-2.5 px-4 rounded-lg text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>⚡ Instant Admin Demo Access</span>
              </button>
            </div>

            <div className="relative flex py-1 items-center w-full">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase tracking-wider">or sign in with google</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <p className="text-grey-light text-center text-xs">
              Sign in with your authorized HYVORA administrator Google account.
            </p>
            
            {isLoading ? (
              <div className="text-primary font-bold">Verifying Admin Access...</div>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  toast.error('Google Login Failed');
                }}
                theme="filled_black"
                shape="pill"
                size="large"
              />
            )}
          </div>
        </Card>
      </div>
    </GoogleOAuthProvider>
  );
};
