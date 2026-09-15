import { create } from 'zustand';

interface User {
  id?: string;
  name?: string;
  phone?: string;
  role?: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  admin: User | null;
  userToken: string | null;
  adminToken: string | null;
  setUserAuth: (user: User, token: string) => void;
  setAdminAuth: (admin: User, token: string) => void;
  logoutUser: () => void;
  logoutAdmin: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('hyvora_user') || 'null'),
  admin: JSON.parse(localStorage.getItem('hyvora_admin') || 'null'),
  userToken: localStorage.getItem('hyvora_user_token'),
  adminToken: localStorage.getItem('hyvora_admin_token'),

  setUserAuth: (user, token) => {
    localStorage.setItem('hyvora_user', JSON.stringify(user));
    localStorage.setItem('hyvora_user_token', token);
    set({ user, userToken: token });
  },

  setAdminAuth: (admin, token) => {
    localStorage.setItem('hyvora_admin', JSON.stringify(admin));
    localStorage.setItem('hyvora_admin_token', token);
    set({ admin, adminToken: token });
  },

  logoutUser: () => {
    localStorage.removeItem('hyvora_user');
    localStorage.removeItem('hyvora_user_token');
    set({ user: null, userToken: null });
  },

  logoutAdmin: () => {
    localStorage.removeItem('hyvora_admin');
    localStorage.removeItem('hyvora_admin_token');
    set({ admin: null, adminToken: null });
  },
}));
