import CartProductCard from "./CartProductCard";

import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { useContext } from "react";
import { UserContext } from "../../../Providers/UserContext";
import { toast } from "react-toastify";

interface ICartProduct {
  category: string;
  id: string;
  img: string;
  name: string;
  price: number;
}

const CartProductList = () => {
  const { cartProducts, setCartProducts } = useContext(UserContext);
  const totalPrice = cartProducts.reduce(
    (accumulator: number, currentvalue) => {
      return accumulator + currentvalue.price;
    },
    0
  );

  function removeAllCart() {
    if (cartProducts.length >= 1) {
      setCartProducts([]);
      toast.success("Todos itens removidos do carrinho");
    }
  }

  return (
    <StyledCartProductList>
      {cartProducts.length === 0 ? null : (
        <ul>
          {cartProducts.map((current) => {
            return <CartProductCard key={current.id} product={current} />;
          })}
        </ul>
      )}
      {cartProducts.length === 0 ? null : (
        <>
          <div className="totalBox">
            <StyledParagraph>
              <strong>Total</strong>
            </StyledParagraph>
            <StyledParagraph className="total">
              {totalPrice.toFixed(2)}
            </StyledParagraph>
          </div>
          <StyledButton
            $buttonSize="default"
            $buttonStyle="gray"
            onClick={removeAllCart}
          >
            Remover todos
          </StyledButton>
        </>
      )}
    </StyledCartProductList>
  );
};

export default CartProductList;
