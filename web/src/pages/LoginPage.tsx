import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, KeyRound, User, Mail } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import { validatePhone } from '../utils/helpers';

export const LoginPage: React.FC = () => {
  const [step, setStep] = useState<'phone' | 'otp' | 'register'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  
  const from = location.state?.from?.pathname || '/';

  const handleSendOTP = async () => {
    if (!validatePhone(phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.sendOTP(phone);
      toast.success(response.message || 'OTP sent successfully');
      setStep('otp');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Failed to send OTP';
      toast.error(errorMsg);
      
      // If user doesn't exist, move to registration
      if (errorMsg.includes('not found') || errorMsg.includes('not registered')) {
        setIsNewUser(true);
        setStep('register');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.verifyOTP(phone, otp);
      if (response.success && response.token && response.user) {
        login(response.token, response.user);
        toast.success('Login successful!');
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.register({ name, phone, email, otp });
      if (response.success && response.token && response.user) {
        login(response.token, response.user);
        toast.success('Registration successful!');
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">👤</div>
          <h1 className="text-3xl font-bold text-primary mb-2">Tenant Login</h1>
          <p className="text-grey-light">
            {step === 'phone' && 'Enter your phone number to continue'}
            {step === 'otp' && 'Enter the OTP sent to your phone'}
            {step === 'register' && 'Complete your registration'}
          </p>
        </div>

        {/* Phone Number Step */}
        {step === 'phone' && (
          <div className="space-y-4">
            {/* Demo Quick Access */}
            <div className="bg-primary/10 border border-primary/20 p-3.5 rounded-xl text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Demo Tenant Account</span>
                <span className="text-[9px] bg-primary/20 text-primary px-2 py-0.5 rounded font-semibold">HYVORA DEMO</span>
              </div>
              <p className="text-xs text-gray-300">
                Test the tenant portal experience (view demo lease, rent receipts, maintenance tickets).
              </p>
              <button
                type="button"
                onClick={() => {
                  const demoTenant: any = {
                    id: 'demo-tenant-rahul',
                    name: 'Rahul Sharma',
                    phone: '9876543210',
                    email: 'rahul.sharma@demo.hyvora.in',
                    role: 'tenant',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  };
                  login('hyvora-demo-tenant-token', demoTenant);
                  toast.success('Logged in as Rahul Sharma (Demo Tenant)');
                  navigate('/dashboard');
                }}
                className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 font-semibold py-2 px-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>⚡ Instant Tenant Demo Access (Rahul Sharma)</span>
              </button>
            </div>

            <div className="relative flex py-1 items-center w-full">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="flex-shrink mx-3 text-gray-500 text-[11px] uppercase tracking-wider">or sign in with phone</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            <Input
              type="tel"
              placeholder="Enter 10-digit phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              icon={<Phone size={20} />}
              label="Phone Number"
              maxLength={10}
            />
            <Button
              onClick={handleSendOTP}
              isLoading={isLoading}
              className="w-full"
            >
              Send OTP
            </Button>
          </div>
        )}

        {/* OTP Verification Step */}
        {step === 'otp' && !isNewUser && (
          <div className="space-y-4">
            <div className="bg-dark-lighter p-3 rounded-lg text-center mb-4">
              <p className="text-grey-light text-sm">OTP sent to</p>
              <p className="text-white font-semibold">+91 {phone}</p>
            </div>
            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              icon={<KeyRound size={20} />}
              label="OTP"
              maxLength={6}
            />
            <Button
              onClick={handleVerifyOTP}
              isLoading={isLoading}
              className="w-full"
            >
              Verify & Login
            </Button>
            <button
              onClick={() => setStep('phone')}
              className="w-full text-grey-light hover:text-white text-sm transition-colors"
            >
              Change Phone Number
            </button>
          </div>
        )}

        {/* Registration Step */}
        {step === 'register' && (
          <div className="space-y-4">
            <div className="bg-dark-lighter p-3 rounded-lg text-center mb-4">
              <p className="text-grey-light text-sm">Register with</p>
              <p className="text-white font-semibold">+91 {phone}</p>
            </div>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User size={20} />}
              label="Full Name *"
            />
            <Input
              type="email"
              placeholder="Enter your email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={20} />}
              label="Email"
            />
            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              icon={<KeyRound size={20} />}
              label="OTP *"
              maxLength={6}
            />
            <Button
              onClick={handleRegister}
              isLoading={isLoading}
              className="w-full"
            >
              Complete Registration
            </Button>
            <button
              onClick={() => {
                setStep('phone');
                setIsNewUser(false);
              }}
              className="w-full text-grey-light hover:text-white text-sm transition-colors"
            >
              Change Phone Number
            </button>
          </div>
        )}

      </Card>
    </div>
  );
};
