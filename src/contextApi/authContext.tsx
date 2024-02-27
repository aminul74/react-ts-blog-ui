import React, { createContext, useState, SetStateAction } from "react";
import axios, { AxiosResponse } from "axios";

export interface UserType {
  length: number;
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  login: (newToken: string, newUser: UserType) => void;
  logout: () => void;
  user: UserType | null;
  getUser: (token: string) => Promise<AxiosResponse<UserType>>;
  setUser: React.Dispatch<SetStateAction<UserType | null>>;
  setToken: React.Dispatch<SetStateAction<string | null>>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );
  const [user, setUser] = useState<UserType | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const getUser = async (token: string): Promise<AxiosResponse<UserType>> => {
    return await axios.get<UserType>(
      "http://localhost:4001/api/v1/users/my-profile",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  const login = (newToken: string, newUser: UserType) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, user, getUser, setToken, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
