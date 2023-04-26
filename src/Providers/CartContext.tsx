import { createContext, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

interface INewChildren {
  children: React.ReactNode;
}
export interface IProduct {
  img: string;
  name: string;
  category: string;
  price: number;
  id: string;
}
export interface ICartProduct {
  category: string;
  id: string;
  img: string;
  name: string;
  price: number;
}
// interface IILoad {
//   (response: string): string;
// }

interface IICart {
  listProducts: IProduct[];
  filterProducts: IProduct[];
  setSearchProduct: React.Dispatch<React.SetStateAction<string>>;
  searchProduct: string;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setListProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setCartProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  cartProducts: IProduct[];
  loadProduct: () => Promise<void>;
  submitSearchProduct: (event: React.FormEvent) => void;
  removeAllCart: () => void;
  clearSearch: () => void;
  removeProductCart: (currentId: string) => void;
}

export const CartContext = createContext({} as IICart);

export function CartProvider({ children }: INewChildren) {
  const token = localStorage.getItem("@TokenUser");
  const [searchProduct, setSearchProduct] = useState("");
  const [listProducts, setListProducts] = useState<IProduct[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);

  const filterProducts = listProducts.filter(
    (currentP) =>
      currentP.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
      currentP.category.toLowerCase().includes(searchProduct.toLowerCase())
  );
  function removeAllCart() {
    if (cartProducts.length >= 1) {
      setCartProducts([]);
      toast.success("Todos itens removidos do carrinho");
    }
  }

  async function loadProduct() {
    try {
      const response = await api.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListProducts(response.data);
    } catch (error) {}
  }

  function submitSearchProduct(event: React.FormEvent) {
    event.preventDefault();
    setSearchProduct(searchInput);
    setSearchInput("");
  }
  function clearSearch() {
    setSearchProduct("");
  }
  function removeProductCart(currentId: string) {
    const newCard = cartProducts.filter((data) => data.id !== currentId);
    setCartProducts(newCard);
    toast.success("Item removido do carrinho");
  }

  return (
    <CartContext.Provider
      value={{
        searchProduct,
        setSearchProduct,
        listProducts,
        setListProducts,
        searchInput,
        setSearchInput,
        filterProducts,
        cartProducts,
        setCartProducts,
        loadProduct,
        submitSearchProduct,
        removeAllCart,
        clearSearch,
        removeProductCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
