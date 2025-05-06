
import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // In a real app, you would validate credentials with a backend
    // For demo purposes, we'll just check if the email includes "test"
    if (email.includes("test") && password.length >= 6) {
      const newUser = { id: '1', email, name: email.split('@')[0] };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return Promise.resolve();
    }
    return Promise.reject(new Error("Invalid credentials"));
  };

  const signUp = async (email: string, password: string, name: string) => {
    // In a real app, you would register the user in a backend
    // For demo purposes, we'll just create a user object
    if (email && password.length >= 6 && name) {
      const newUser = { id: '1', email, name };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return Promise.resolve();
    }
    return Promise.reject(new Error("Invalid sign up details"));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        isLoading,
        signIn, 
        signUp, 
        signOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
