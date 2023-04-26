import { MdDelete } from "react-icons/md";

import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";
import { useContext } from "react";
import { CartContext, IProduct } from "../../../../Providers/CartContext";

interface IPropsCart {
  product: IProduct;
}

const CartProductCard = ({ product }: IPropsCart) => {
  const { cartProducts, setCartProducts, removeProductCart } =
    useContext(CartContext);

  return (
    <StyledCartProductCard key={product.id}>
      <div className="imageBox">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="contentBox">
        <StyledTitle tag="h3" $fontSize="three">
          {product.name}
        </StyledTitle>
        <button
          type="button"
          aria-label="Remover"
          onClick={() => removeProductCart(product.id)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
