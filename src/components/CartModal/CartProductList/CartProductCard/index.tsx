import { MdDelete } from "react-icons/md";

import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";
import { useContext } from "react";
import { UserContext } from "../../../../Providers/UserContext";
import { toast } from "react-toastify";

const CartProductCard = ({ product }: any) => {
  const { cartProducts, setCartProducts } = useContext(UserContext);

  function removeProductCart(currentId: string) {
    const newCard = cartProducts.filter((data) => data.id !== currentId);
    setCartProducts(newCard);
    toast.success("Item removido do carrinho");
  }

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
