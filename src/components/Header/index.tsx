import { MdShoppingCart, MdLogout } from "react-icons/md";
import SearchForm from "./SearchForm";
import { StyledHeader } from "./style";
import LogoKenzieBurguer from "../../assets/LogoKenzieBurguer.svg";
import { StyledContainer } from "../../styles/grid";
import { useContext } from "react";
import { UserContext } from "../../Providers/UserContext";
import { CartContext } from "../../Providers/CartContext";

const Header = () => {
  const { setOpenModalCart, logoutUser } = useContext(UserContext);
  const { searchProduct, clearSearch } = useContext(CartContext);

  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className="flexGrid">
          <img
            src={LogoKenzieBurguer}
            alt="Kenzie Burguer Logo"
            className="logo"
          />
          <nav className="nav" role="navigation">
            <SearchForm />
            <div className="buttons">
              <button
                type="button"
                onClick={() => {
                  setOpenModalCart(true);
                }}
              >
                <MdShoppingCart size={28} />
              </button>
              <button type="button" onClick={logoutUser}>
                <MdLogout size={28} />
              </button>
              {searchProduct !== "" ? (
                <button onClick={clearSearch}>Limpar Busca</button>
              ) : null}
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
