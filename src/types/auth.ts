export interface User {
  id: string;
  email: string;
  name: string;
  role: 'dosen' | 'admin';
  avatar?: string;
  department: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
}

export interface ResetPasswordData {
  email: string;
}