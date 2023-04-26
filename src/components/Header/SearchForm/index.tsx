import { MdSearch } from "react-icons/md";
import { StyledSearchForm } from "./style";
import { StyledButton } from "../../../styles/button";
import { useContext, useState } from "react";

import { CartContext } from "../../../Providers/CartContext";

const SearchForm = () => {
  const { searchInput, searchProduct, submitSearchProduct, setSearchInput } =
    useContext(CartContext);

  return (
    <StyledSearchForm onSubmit={submitSearchProduct}>
      <input
        type="text"
        placeholder="Digitar pesquisa"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <StyledButton type="submit" $buttonSize="medium" $buttonStyle="green">
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
