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
  filterProducts: IProduct[];
  setSearchProduct: React.Dispatch<React.SetStateAction<string>>;
  searchProduct: string;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext({} as INewproviderModal);

export function UserProvider({ children }: INewProviderProps) {
  const [searchProduct, setSearchProduct] = useState("");
  const [listProducts, setListProducts] = useState<IProduct[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const filterProducts = listProducts.filter(
    (currentP) =>
      currentP.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
      currentP.category.toLowerCase().includes(searchProduct.toLowerCase())
  );
  console.log(filterProducts);

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
        filterProducts,
        setSearchProduct,
        searchProduct,
        searchInput,
        setSearchInput,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
