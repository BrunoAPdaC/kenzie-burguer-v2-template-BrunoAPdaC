import { MdSearch } from "react-icons/md";
import { StyledSearchForm } from "./style";
import { StyledButton } from "../../../styles/button";
import { useContext, useState } from "react";
import { UserContext } from "../../../Providers/UserContext";

const SearchForm = () => {
  const { setSearchProduct, searchInput, setSearchInput, searchProduct } =
    useContext(UserContext);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setSearchProduct(searchInput);
    setSearchInput("");
  }

  return (
    <StyledSearchForm onSubmit={submit}>
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
