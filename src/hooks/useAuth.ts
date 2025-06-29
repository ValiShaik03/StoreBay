import { useState, useEffect, createContext, useContext } from 'react';
import { User, AuthState } from '../types';

const AUTH_KEY = 'storebay_auth';
const USERS_KEY = 'storebay_users';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = (): AuthContextType => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Load auth state from localStorage on mount
  useEffect(() => {
    const loadAuthState = () => {
      try {
        const savedAuth = localStorage.getItem(AUTH_KEY);
        if (savedAuth) {
          const parsedAuth = JSON.parse(savedAuth);
          if (parsedAuth && parsedAuth.user) {
            setAuthState({
              user: parsedAuth.user,
              isAuthenticated: true,
              isLoading: false
            });
            return;
          }
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      }
      
      setAuthState(prev => ({ ...prev, isLoading: false }));
    };

    loadAuthState();
  }, []);

  // Save auth state to localStorage
  const saveAuthState = (user: User | null) => {
    try {
      if (user) {
        localStorage.setItem(AUTH_KEY, JSON.stringify({ user }));
      } else {
        localStorage.removeItem(AUTH_KEY);
      }
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  };

  // Get users from localStorage
  const getUsers = (): User[] => {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error loading users:', error);
      return [];
    }
  };

  // Save users to localStorage
  const saveUsers = (users: User[]) => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const users = getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        return { success: false, error: 'User not found. Please check your email or register.' };
      }

      // In a real app, you'd verify the password hash
      // For demo purposes, we'll assume the password is correct
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      
      saveAuthState(user);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const users = getUsers();
      
      // Check if user already exists
      const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
        return { success: false, error: 'An account with this email already exists.' };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        created_at: new Date().toISOString()
      };

      // Save user
      users.push(newUser);
      saveUsers(users);

      // Auto-login after registration
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });
      
      saveAuthState(newUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    saveAuthState(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!authState.user) return;

    try {
      const users = getUsers();
      const userIndex = users.findIndex(u => u.id === authState.user!.id);
      
      if (userIndex !== -1) {
        const updatedUser = { ...authState.user, ...updates };
        users[userIndex] = updatedUser;
        saveUsers(users);
        
        setAuthState(prev => ({
          ...prev,
          user: updatedUser
        }));
        
        saveAuthState(updatedUser);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return {
    ...authState,
    login,
    register,
    logout,
    updateProfile
  };
};

export { AuthContext };