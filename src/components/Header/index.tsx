import { MdShoppingCart, MdLogout } from "react-icons/md";

import SearchForm from "./SearchForm";
import { StyledHeader } from "./style";
import LogoKenzieBurguer from "../../assets/LogoKenzieBurguer.svg";

import { StyledContainer } from "../../styles/grid";
import { useContext } from "react";
import { UserContext } from "../../Providers/UserContext";

const Header = () => {
  const { setOpenModalCart, navigate, searchProduct, setSearchProduct } =
    useContext(UserContext);

  function logoutUser() {
    localStorage.removeItem("@TokenUser");
    navigate("/");
  }
  function clearSearch() {
    setSearchProduct("");
  }
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
