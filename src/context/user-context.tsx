"use client";
import { IUser } from "@/types/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  user: IUser | null;
  setUserToLocalStorage: (user: IUser | null) => void;
  getUserFromLocalStorage: () => IUser | null;
}
export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const setUserToLocalStorage = (user: IUser | null) => {
    if (!user) {
      localStorage.removeItem("user");
      setUser(null);
      return;
    }
    window.localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    if (!user) return null;
    return JSON.parse(user);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUserToLocalStorage,
        getUserFromLocalStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
