import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  hostel: string;
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithPhone: (phone: string) => Promise<void>;
  loginWithOAuth: (provider: string) => Promise<void>;
  signup: (name: string, email: string, password: string, hostel: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  logout: () => void;
  pendingPhone: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('campusHubUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      hostel: 'Hostel A',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    };
    setUser(mockUser);
    localStorage.setItem('campusHubUser', JSON.stringify(mockUser));
  };

  const loginWithPhone = async (phone: string) => {
    // Mock phone login - store phone and redirect to OTP
    setPendingPhone(phone);
  };

  const loginWithOAuth = async (provider: string) => {
    // Mock OAuth login
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: `user@${provider}.com`,
      hostel: 'Hostel A',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    };
    setUser(mockUser);
    localStorage.setItem('campusHubUser', JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, password: string, hostel: string) => {
    // Mock signup
    const mockUser: User = {
      id: '1',
      name,
      email,
      hostel,
      profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
    };
    setUser(mockUser);
    localStorage.setItem('campusHubUser', JSON.stringify(mockUser));
  };

  const verifyOTP = async (otp: string) => {
    // Mock OTP verification
    if (otp.length === 6 && pendingPhone) {
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        phone: pendingPhone,
        hostel: 'Hostel A',
        profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Phone'
      };
      setUser(mockUser);
      localStorage.setItem('campusHubUser', JSON.stringify(mockUser));
      setPendingPhone(null);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusHubUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      loginWithPhone, 
      loginWithOAuth, 
      signup, 
      verifyOTP,
      logout,
      pendingPhone 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
