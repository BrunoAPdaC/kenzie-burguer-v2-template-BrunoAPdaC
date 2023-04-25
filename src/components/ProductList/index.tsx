import { useContext, useState } from "react";
import ProductCard, { IProduct } from "./ProductCard";
import { StyledProductList } from "./style";
import { UserContext } from "../../Providers/UserContext";

const ProductList = () => {
  const { listProducts, setListProducts } = useContext(UserContext);
  return (
    <StyledProductList>
      {listProducts.map((current) => {
        return (
          <ProductCard product={current} setListProducts={setListProducts} />
        );
      })}
    </StyledProductList>
  );
};

export default ProductList;
