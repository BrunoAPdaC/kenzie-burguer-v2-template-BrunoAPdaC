import React, { createContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface INewProviderProps {
  children: React.ReactNode;
}

interface INewproviderModal {
  setOpenModalCart: React.Dispatch<React.SetStateAction<boolean>>;

  openModalCart: boolean;
  navigate: NavigateFunction;
  token?: string | null;
  logoutUser: () => void;
}

export const UserContext = createContext({} as INewproviderModal);

export function UserProvider({ children }: INewProviderProps) {
  const [openModalCart, setOpenModalCart] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("@TokenUser");
  useEffect(() => {
    if (token) {
      navigate("/shop");
    } else {
      navigate("/");
    }
  }, []);
  function logoutUser() {
    localStorage.removeItem("@TokenUser");
    navigate("/");
  }

  return (
    <UserContext.Provider
      value={{
        setOpenModalCart,
        openModalCart,
        navigate,
        token,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
