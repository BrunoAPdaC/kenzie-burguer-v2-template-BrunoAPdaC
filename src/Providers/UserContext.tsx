import React, { createContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IProduct } from "../components/ProductList/ProductCard/index";

interface INewProviderProps {
  children: React.ReactNode;
}

interface INewproviderModal {
  setOpenModalCart: React.Dispatch<React.SetStateAction<boolean>>;
  setCartProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  cartProducts: IProduct[];
  openModalCart: boolean;
  navigate: NavigateFunction;
  token?: string | null;
  listProducts: IProduct[];

  setListProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export const UserContext = createContext({} as INewproviderModal);

export function UserProvider({ children }: INewProviderProps) {
  const [listProducts, setListProducts] = useState<IProduct[]>([]);
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
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

  return (
    <UserContext.Provider
      value={{
        setOpenModalCart,
        openModalCart,
        navigate,
        token,
        setCartProducts,
        cartProducts,
        setListProducts,
        listProducts,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
