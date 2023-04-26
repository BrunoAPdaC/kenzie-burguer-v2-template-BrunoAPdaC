import { StyledProductCard } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph, StyledTitle } from "../../../styles/typography";
import { api } from "../../../services/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Providers/UserContext";
import { toast } from "react-toastify";
import { CartContext, IProduct } from "../../../Providers/CartContext";

interface IProps {
  product: IProduct;
  setListProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

const ProductCard = ({ setListProducts, product }: IProps) => {
  const { token } = useContext(UserContext);
  const { setCartProducts, cartProducts } = useContext(CartContext);

  const addProductList = (product: IProduct) => {
    if (!cartProducts.some((current) => current.id === product.id)) {
      const newProductsList = [...cartProducts, product];
      setCartProducts(newProductsList);
      toast.success("Item adicionado ao carrinho");
    } else {
      toast.error("Item já adicionado ao carrinho");
    }
  };

  return (
    <StyledProductCard key={product.id}>
      <div className="imageBox">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="content">
        <StyledTitle tag="h3" $fontSize="three">
          {product.name}
        </StyledTitle>
        <StyledParagraph className="category">
          {product.category}
        </StyledParagraph>
        <StyledParagraph className="price">
          {product.price.toFixed(2)}
        </StyledParagraph>
        <StyledButton
          $buttonSize="medium"
          $buttonStyle="green"
          onClick={() => addProductList(product)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
