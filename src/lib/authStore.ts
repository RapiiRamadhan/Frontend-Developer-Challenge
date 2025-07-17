import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState, LoginCredentials, RegisterData } from '@/types/auth';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  clearError: () => void;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'dosen@udinus.ac.id',
    name: 'Dr. Ahmad Wijaya, M.Kom',
    role: 'dosen',
    department: 'Teknik Informatika',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    email: 'admin@udinus.ac.id',
    name: 'Siti Nurhaliza, S.Kom',
    role: 'admin',
    department: 'BTIK',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    createdAt: '2024-01-01',
  },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === credentials.email);
        
        if (user && credentials.password === 'password123') {
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
          return true;
        } else {
          set({ 
            error: 'Email atau password salah', 
            isLoading: false 
          });
          return false;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (data.password !== data.confirmPassword) {
          set({ 
            error: 'Password tidak cocok', 
            isLoading: false 
          });
          return false;
        }
        
        const existingUser = mockUsers.find(u => u.email === data.email);
        if (existingUser) {
          set({ 
            error: 'Email sudah terdaftar', 
            isLoading: false 
          });
          return false;
        }
        
        const newUser: User = {
          id: Date.now().toString(),
          email: data.email,
          name: data.name,
          role: 'dosen',
          department: data.department,
          createdAt: new Date().toISOString(),
        };
        
        mockUsers.push(newUser);
        
        set({ 
          user: newUser, 
          isAuthenticated: true, 
          isLoading: false,
          error: null 
        });
        return true;
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null 
        });
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === email);
        if (user) {
          set({ isLoading: false });
          return true;
        } else {
          set({ 
            error: 'Email tidak ditemukan', 
            isLoading: false 
          });
          return false;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);