import React, { createContext, useContext, useState } from "react";

interface User {
  name: string;
  isAuthenticated: boolean;
}

interface AuthContextProps {
  user: User;
  login: (username: string, password: string) => Promise<string>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({ name: "", isAuthenticated: false });

  const login = (username: string, token: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      if (token) {
        setUser({ name: username, isAuthenticated: true });
        resolve("success");
      } else {
        reject("Login failed");
      }
    });
  };
  

  const logout = (): void => {
    setUser({ name: "", isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



export default useAuth