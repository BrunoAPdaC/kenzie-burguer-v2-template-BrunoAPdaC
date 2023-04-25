import { useContext, useEffect, useState } from "react";
import ProductCard, { IProduct } from "./ProductCard";
import { StyledProductList } from "./style";
import { UserContext } from "../../Providers/UserContext";
import { api } from "../../services/api";

const ProductList = () => {
  const {
    listProducts,
    setListProducts,
    token,
    searchProduct,
    filterProducts,
  } = useContext(UserContext);
  const newList = searchProduct !== "" ? filterProducts : listProducts;
  async function loadProduct() {
    try {
      const response = await api.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListProducts(response.data);
    } catch (error) {}
  }
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
