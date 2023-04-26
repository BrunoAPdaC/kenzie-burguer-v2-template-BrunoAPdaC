import { useContext, useEffect } from "react";
import ProductCard from "./ProductCard";
import { StyledProductList } from "./style";
import { UserContext } from "../../Providers/UserContext";
import { api } from "../../services/api";
import { CartContext } from "../../Providers/CartContext";

const ProductList = () => {
  const {
    listProducts,
    setListProducts,
    loadProduct,
    searchProduct,
    filterProducts,
  } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const newList = searchProduct !== "" ? filterProducts : listProducts;

  useEffect(() => {
    loadProduct();
  }, []);
  return (
    <StyledProductList>
      {newList.map((current) => {
        return (
          <ProductCard
            product={current}
            setListProducts={setListProducts}
            key={current.id}
          />
        );
      })}
    </StyledProductList>
  );
};

export default ProductList;
